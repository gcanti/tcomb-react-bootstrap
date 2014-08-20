/** @jsx React.DOM */
'use strict';

var t = require('tcomb');
var React = require('react');
var bs = require('tcomb-react-bootstrap');

var Accordion = bs.Accordion;
var Affix = bs.Affix;
var Alert = bs.Alert;
var Badge = bs.Badge;
var Button = bs.Button;
var ButtonGroup = bs.ButtonGroup;
var ButtonToolbar = bs.ButtonToolbar;
var Carousel = bs.Carousel;
var CarouselItem = bs.CarouselItem;
var Col = bs.Col;
var DropdownButton = bs.DropdownButton;
var DropdownMenu = bs.DropdownMenu;
var Glyphicon = bs.Glyphicon;
var Grid = bs.Grid;
var Input = bs.Input;
var Jumbotron = bs.Jumbotron;
var Label = bs.Label;
var MenuItem = bs.MenuItem;
var Modal = bs.Modal;
var ModalTrigger = bs.ModalTrigger;
var Nav = bs.Nav;
var Navbar = bs.Navbar;
var NavItem = bs.NavItem;
var OverlayTrigger = bs.OverlayTrigger;
var PageHeader = bs.PageHeader;
var PageItem = bs.PageItem;
var Pager = bs.Pager;
var Panel = bs.Panel;
var PanelGroup = bs.PanelGroup;
var Popover = bs.Popover;
var ProgressBar = bs.ProgressBar;
var Row = bs.Row;
var SplitButton = bs.SplitButton;
var SubNav = bs.SubNav;
var TabbedArea = bs.TabbedArea;
var Table = bs.Table;
var TabPane = bs.TabPane;
var Tooltip = bs.Tooltip;
var Well = bs.Well;

var isDebuggerEnabled = false;

// override default fail behaviour of tcomb
t.options.onFail = function (message) {
  if (isDebuggerEnabled) {
    debugger;
  }
  throw new Error(message);
};

//
// utils
//

function getErrorAlert(message){
  return (
    Alert({bsStyle: "danger"}, 
      message
    )
  );
}

var examples = {
  Accordion: '<Accordion>\n  <Panel header="Collapsible Group Item #1" key={1}> Anim pariatur cliche reprehenderit </Panel>\n  <Panel header="Collapsible Group Item #2" key={2}> Anim pariatur cliche reprehenderit</Panel>\n  <Panel header="Collapsible Group Item #3" key={3}>Anim pariatur cliche reprehenderit\n</Panel>\n</Accordion>',
  Alert: '<Alert bsStyle="warning">\n  <strong>Holy guacamole!</strong>\n</Alert>',
  Badge: '<p>Badges <Badge>42</Badge></p>',
  Button: '<Button bsStyle="danger" bsSize="medium">Save</Button>',
  ButtonGroup: '<ButtonGroup>\n  <Button>Left</Button>\n  <Button>Middle</Button>\n  <Button>Right</Button>\n</ButtonGroup>',
  ButtonToolbar: '<ButtonToolbar>\n  <Button>Default</Button>\n  <Button bsStyle="primary">Primary</Button>\n  <Button bsStyle="success">Success</Button>\n  <Button bsStyle="info">Info</Button>\n  <Button bsStyle="warning">Warning</Button>\n  <Button bsStyle="danger">Danger</Button>\n  <Button bsStyle="link">Link</Button>\n</ButtonToolbar>',
  Carousel: '<Carousel>\n  <CarouselItem>\n  <img width={900} height={500} alt="900x500" src="carousel.png"/>\n  <div className="carousel-caption">\n  <h3>First slide label</h3> <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>\n  </div>\n  </CarouselItem>\n  <CarouselItem>\n  <img width={900} height={500} alt="900x500" src="carousel.png"/>\n  <div className="carousel-caption">\n  <h3>Second slide label</h3>\n  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>\n  </div>\n  </CarouselItem>\n  <CarouselItem>\n  <img width={900} height={500} alt="900x500" src="carousel.png"/>\n  <div className="carousel-caption">\n  <h3>Third slide label</h3>\n  <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>\n  </div>\n  </CarouselItem>\n  </Carousel>',
  DropdownButton: '<DropdownButton bsStyle={title.toLowerCase()} title={title}> <MenuItem key="1">Action</MenuItem> <MenuItem key="2">Another action</MenuItem> <MenuItem key="3">Something else here</MenuItem> <MenuItem divider /> <MenuItem key="4">Separated link</MenuItem> </DropdownButton>',
  Glyphicon: '<div> <ButtonToolbar> <ButtonGroup> <Button><Glyphicon glyph="align-left" /></Button> <Button><Glyphicon glyph="align-center" /></Button> <Button><Glyphicon glyph="align-right" /></Button> <Button><Glyphicon glyph="align-justify" /></Button> </ButtonGroup> </ButtonToolbar> <ButtonToolbar> <ButtonGroup> <Button bsSize="large"><Glyphicon glyph="star" /> Star</Button> <Button><Glyphicon glyph="star" /> Star</Button> <Button bsSize="small"><Glyphicon glyph="star" /> Star</Button> <Button bsSize="xsmall"><Glyphicon glyph="star" /> Star</Button> </ButtonGroup> </ButtonToolbar> </div>',
  Input: '<form> <Input type="text" defaultValue="text" /> <Input type="password" defaultValue="secret" /> <Input type="checkbox" checked readOnly label="checkbox"/> <Input type="radio" checked readOnly label="radio"/> <Input type="select" defaultValue="select"> <option value="select">select</option> <option value="other">...</option> </Input> <Input type="select" multiple> <option value="select">select (multiple)</option> <option value="other">...</option> </Input> <Input type="textarea" defaultValue="textarea" /> <Input type="static" value="static" /> </form>',
  Modal: '<Modal title="Modal title" backdrop={false} animation={false} onRequestHide={handleHide}> <div className="modal-body"> One fine body... </div> <div className="modal-footer"> <Button>Close</Button> <Button bsStyle="primary">Save changes</Button> </div> </Modal>',
  Nav: '<Nav bsStyle="pills" activeKey={1}>\n  <NavItem key={1} href="/home">NavItem 1 content</NavItem>\n  <NavItem key={2} title="Item">NavItem 2 content</NavItem>\n  <NavItem key={3} disabled={true}>NavItem 3 content</NavItem>\n</Nav>',
  Navbar: '<Navbar>\n  <Nav>\n  <NavItem key={1} href="#">Link</NavItem>\n  <NavItem key={2} href="#">Link</NavItem>\n  <DropdownButton key={3} title="Dropdown">\n  <MenuItem key="1">Action</MenuItem>\n  <MenuItem key="2">Another action</MenuItem>\n  <MenuItem key="3">Something else here</MenuItem>\n  <MenuItem divider />\n  <MenuItem key="4">Separated link</MenuItem>\n  </DropdownButton>\n  </Nav>\n</Navbar>',
  Pager: '<Pager>\n  <PageItem href="#">Previous</PageItem>\n  <PageItem href="#">Next</PageItem>\n</Pager>',
  PanelGroup: '<PanelGroup activeKey={1} onSelect={handlePanelGroupSelect.bind(this)} accordion>\n  <Panel header="Panel 1" key={1}>Panel 1 content</Panel>\n  <Panel header="Panel 2" key={2}>Panel 2 content</Panel>\n</PanelGroup>',
  Popover: '<div>\n  <Popover placement="right" positionLeft={200} positionTop={50} title="Popover right"> And here\'s some <strong>amazing</strong> content. It\'s very engaging. right? </Popover>\n</div>',
  ProgressBar: '<div>\n  <ProgressBar striped bsStyle="success" now={40} />\n  <ProgressBar striped bsStyle="info" now={20} />\n  <ProgressBar striped bsStyle="warning" now={60} />\n  <ProgressBar striped bsStyle="danger" now={80} />\n</div>',
  SplitButton: '<SplitButton bsStyle="success" title="success">\n  <MenuItem key="1">Action</MenuItem>\n  <MenuItem key="2">Another action</MenuItem>\n  <MenuItem key="3">Something else here</MenuItem>\n  <MenuItem divider />\n  <MenuItem key="4">Separated link</MenuItem>\n</SplitButton>',
  TabbedArea: '<TabbedArea defaultActiveKey={2}>\n  <TabPane key={1} tab="Tab 1"><p>TabPane 1 content</p></TabPane>\n  <TabPane key={2} tab="Tab 2"><p>TabPane 2 content</p></TabPane>\n</TabbedArea>',
  Table: '<Table striped bordered condensed hover>\n  <thead>\n  <tr>\n  <th>#</th>\n  <th>First Name</th>\n  <th>Last Name</th>\n  <th>Username</th>\n  </tr>\n  </thead>\n  <tbody>\n  <tr>\n  <td>1</td>\n  <td>Mark</td>\n  <td>Otto</td>\n  <td>@mdo</td>\n  </tr>\n  <tr>\n  <td>2</td>\n  <td>Jacob</td>\n  <td>Thornton</td>\n  <td>@fat</td>\n  </tr>\n  <tr>\n  <td>3</td>\n  <td colSpan="2">Larry the Bird</td>\n  <td>@twitter</td>\n  </tr>\n  </tbody>\n  </Table>',
  Tooltip: '<div>\n  <Tooltip placement="right" positionLeft={150} positionTop={50}><strong>Holy guacamole!</strong> Check this info. </Tooltip>\n</div>',
  Well: '<div>\n  <Well bsSize="large">Look I\'m in a large well!</Well>\n  <Well bsSize="small">Look I\'m in a small well!</Well>\n</div>'        
};

var options = Object.keys(examples).sort().map(function (k) {
  return React.DOM.option({key: k, value: k}, k);
});

var JSX_PREAMBLE = '/** @jsx React.DOM */\n';

function handleHide() {
  $('.modal').remove();
}

function handlePanelGroupSelect(selectedKey) {
}

//
// components
//

function projectLink(title) {
  return React.DOM.a({href: "https://github.com/gcanti/tcomb-react-bootstrap"}, title)
}

var Header = React.createClass({displayName: 'Header',
  render: function () {
    return (
      Row(null, 
        Col({md: 6}, 
          React.DOM.h1(null, "Playground")
        ), 
        Col({md: 6}
        )
      )
    );
  }
});

var Footer = React.createClass({displayName: 'Footer',
  render: function () {
    return (
      Row(null, 
        Col({md: 12}, 
          React.DOM.p({className: "text-muted"}, "Built with ", projectLink('tcomb-react-bootstrap'))
        )
      )
    );
  }
});

var Code = React.createClass({displayName: 'Code',
  render: function () {
    return (
      React.DOM.div(null, 
        React.DOM.label(null, "Code (Live reload)"), 
        React.DOM.pre({className: "jsx-preamble"}, JSX_PREAMBLE), 
        Input({
          ref: "code", 
          type: "textarea", 
          value: this.props.value, 
          rows: "10", 
          onChange: this.props.onChange})
      )
    );
  }
});

var Preview = React.createClass({displayName: 'Preview',
  render: function () {
    return (
      React.DOM.div(null, this.props.component)
    );
  }
});

var Example = React.createClass({displayName: 'Example',
  render: function () {
    return (
      Input({label: "Examples", ref: "example", type: "select", defaultValue: "Alert", onChange: this.props.onChange}, 
        options
      )
    );
  }
});

var Main = React.createClass({displayName: 'Main',
  getInitialState: function () {
    return {
      code: examples.Alert
    };
  },
  eval: function (code) {
    try {
      var js = JSXTransformer.transform(code).code;
      return eval(js);
    } catch (e) {
      return getErrorAlert(e.message);
    }
  },
  onExampleChange: function (evt) {
    var value = evt.target.value;
    var code = examples[value];
    this.setState({code: code});
  },
  onCodeChange: function (evt) {
    var code = evt.target.value;
    this.setState({code: code});
  },
  onDebuggerChange: function (evt) {
    isDebuggerEnabled = evt.target.checked;
  },
  render: function () {
    var code = this.state.code;
    var component = this.eval(JSX_PREAMBLE + code);
    var debuggerLabel = React.DOM.p(null, React.DOM.strong({className: "text-danger"}, "Enable debugger"), " (remember to open up the console and enjoy)");
    return (
      Grid(null, 
        Header(null), 
        React.DOM.hr(null), 
        Row(null, 
          Col({md: 6}, 
            React.DOM.p({className: "lead"}, "Insert JSX code or choose an example"), 
            Example({onChange: this.onExampleChange}), 
            Code({value: code, onChange: this.onCodeChange}), 
            Input({type: "checkbox", label: debuggerLabel, onChange: this.onDebuggerChange})
          ), 
          Col({md: 6}, 
            React.DOM.p({className: "lead"}, "Preview"), 
            Preview({component: component})
          )
        ), 
        React.DOM.hr(null), 
        Footer(null)
      )
    );
  }
});

//
// run
//
var main = Main(null);
React.renderComponent(main, document.getElementById('app'));
