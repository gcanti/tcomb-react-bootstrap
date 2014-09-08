/** @jsx React.DOM */
$(function () {
 
'use strict';

var t = require('tcomb');
var doc = require('tcomb-doc');
var React = require('react');
var bs = require('tcomb-react-bootstrap');

var Col = bs.Col;
var Row = bs.Row;
var CarouselItem = bs.CarouselItem;
var MenuItem = bs.MenuItem;
var NavItem = bs.NavItem;
var Panel = bs.Panel;
var PageItem = bs.PageItem;
var MenuItem = bs.MenuItem;
var TabPane = bs.TabPane;

var components = [
  "Alert",
  "Badge",
  "Button",
  "ButtonGroup",
  "ButtonToolbar",
  "Carousel",
  "DropdownButton",
  "Glyphicon",
  "Input",
  "Modal",
  "Nav",
  "Navbar",
  "PanelGroup",
  "Pager",
  "Popover",
  "ProgressBar",
  "SplitButton",
  "TabbedArea",
  "Table",
  "Tooltip",
  "Well"
];

//
// import all components
//
components.forEach(function (k) {
  window[k] = bs[k];
});
//
// import all examples
//
var examples = {};
var options = components.map(function (k) {
  return <option key={k} value={k}>{k}</option>;
});

components.forEach(function (k) {
  var $example = $('#' + k);
  if ($example.length) {
    examples[k] = $example.text();
  } else {
    console.warn('missing %s', k)
  }
});

// if true, open the debugger when a failure occurs
var isDebuggerEnabled = false;

// override default fail behaviour of tcomb https://github.com/gcanti/tcomb
t.options.onFail = function (message) {
  if (isDebuggerEnabled) {
    debugger;
  }
  throw new Error(message);
};

//
// utils
//

// return the HTML documentation of a component
function toMarkdown(componentName) {
  var domain = {};
  domain[componentName] = bs[componentName].type;
  // tcomb-doc
  var json = doc.parse(domain).toJSON();
  var markdown = doc.toMarkdown(json);
  return marked(markdown);
}

var Documentation = React.createClass({
  render: function () {
    return (
      <div className="docs">
        <p className="lead">Check out the documentation (auto generated from the underlying domain model):</p>
        <p className="text-right"><em className="text-muted"><code>maybe(Type)</code> means an optional instance of <code>Type</code></em></p>
        <div dangerouslySetInnerHTML={{__html: toMarkdown(this.props.componentName)}} />
      </div>
    );
  }
});

// display error and related documentation
function getErrorAlert(err, componentName){
  var isSyntaxError = !!err.lineNumber;
  var message = err.message;
  return (
    <div>
      <Alert bsStyle="danger">
        {message}
      </Alert>
      { isSyntaxError ? "" :
      <Documentation componentName={componentName}/>
      }
    </div>
  );
}

var JSX_PREAMBLE = '/** @jsx React.DOM */\n';

// handler for Button component
var onClick = function () {
  console.log('Click!');
};

// handler for the Modal component
function handleHide() {
  $('.modal').hide();
}

//
// UI components
//

var Header = React.createClass({
  render: function () {
    return (
      <Row className="header">
        <Col md={6}>
          <h1><a href="https://github.com/gcanti/tcomb-react-bootstrap">tcomb-react-bootstrap</a> Playground</h1>
          <p>Type checking for react-bootstrap</p>
        </Col>
        <Col md={6}>
          <div className="repo-link">
            <p>This library adds a <b>type checking</b> layer to
            the components of react-bootstrap. When a error occurs, say a bad value for an attribute,
            the <b>debugger kicks in</b> so you can inspect the stack and quickly find out what&apos;s wrong.
            </p>
            <p>My other <a href="https://gcanti.github.io">projects</a></p>
          </div>
        </Col>
      </Row>
    );
  }
});

var Code = React.createClass({
  render: function () {
    return (
      <div>
        <pre className="jsx-preamble">{JSX_PREAMBLE}</pre>
        <Input
          ref="code" 
          type="textarea" 
          value={this.props.value} 
          onChange={this.props.onChange}/>
      </div>
    );
  }
});

var Preview = React.createClass({
  render: function () {
    return (
      <div>{this.props.component}</div>
    );
  }
});

var defaultComponent = 'Alert';

var Example = React.createClass({
  render: function () {
    return (
      <Input ref="example" type="select" defaultValue={defaultComponent} onChange={this.props.onChange}>
        {options}
      </Input>
    );
  }
});

var Main = React.createClass({
  getInitialState: function () {
    return {
      code: examples[defaultComponent],
      name: defaultComponent
    };
  },
  eval: function (code) {
    try {
      var js = JSXTransformer.transform(code).code;
      return eval(js);
    } catch (e) {
      return getErrorAlert(e, this.state.name);
    }
  },
  onExampleChange: function (evt) {
    var value = evt.target.value;
    var code = examples[value];
    this.setState({code: code, name: value});
  },
  onCodeChange: function (evt) {
    var code = evt.target.value;
    this.setState({code: code, name: this.state.name});
  },
  onDebuggerChange: function (evt) {
    isDebuggerEnabled = evt.target.checked;
  },
  render: function () {
    var code = this.state.code;
    var component = this.eval(JSX_PREAMBLE + code);
    var debuggerLabel = <p><strong className="text-danger">Enable debugger</strong> <span className="text-muted">(remember to open up the console)</span></p>;
    return (
      <div>
        <Header/>
        <Row>
          <Col md={6}>
            <p className="lead">Choose an example</p>
            <Example onChange={this.onExampleChange}/>
            <p><b>Try to change the <code>bsStyle</code> attribute</b></p>
            <Code value={code} onChange={this.onCodeChange}/>
            <Input type="checkbox" label={debuggerLabel} onChange={this.onDebuggerChange}/>
          </Col>
          <Col md={6}>
            <p className="lead">Preview</p>
            <Preview component={component}/>
          </Col>
        </Row>
      </div>
    );
  }
});

//
// run
//
var main = <Main/>;
React.renderComponent(main, document.getElementById('app'));

});

