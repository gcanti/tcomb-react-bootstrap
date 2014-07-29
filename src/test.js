/** @jsx React.DOM */
var Col = br.Col;
var Button = br.Button;
var Table = br.Table;
var Panel = br.Panel;
var PanelHeading = br.PanelHeading;
var PanelBody = br.PanelBody;
var Nav = br.Nav;
var NavItem = br.NavItem;

var Example = React.createClass({
  render: function () {
    return (
      <div className="example">
        <pre><code>{this.props.code}</code></pre>
        <div>
        {{__html: this.props.children}}
        </div>
      </div>
    );
  }
});

function append(component, code) {
  $('#examples').append(React.renderComponentToString(<Example code={code}>{component}</Example>));
} 

var cols = ['Name', 'Surname'];
var data = [
  ['Giulio', 'Canti'],
  ['Fabio', 'Zanini']
];

$(function () {
  
  // Grid system
  append(<Col lg="12,0" md="6,6">col-lg-12</Col>, '<Col lg="12" md="6,6">col-lg-12</Col>');

  // Button
  append(<Button>Save</Button>, '<Button>Save</Button>');
  append(<Button type="primary">Save</Button>, '<Button type="primary">Save</Button>');
  append(<Button size="lg">Save</Button>, '<Button size="lg">Save</Button>');
  append(<Button block>Save</Button>, '<Button block>Save</Button>');
  
  // Table
  append(<Table cols={cols} data={data}/>, '<Table cols={cols} data={data}/>');
  append(<Table cols={cols} data={data} bordered/>, '<Table cols={cols} data={data} bordered/>');
  append(<Table cols={cols} data={data} striped/>, '<Table cols={cols} data={data} striped/>');
  append(<Table cols={cols} data={data} hover/>, '<Table cols={cols} data={data} hover/>');
  append(<Table cols={cols} data={data} condensed/>, '<Table cols={cols} data={data} condensed/>');
  append(<Table cols={cols} data={data} responsive/>, '<Table cols={cols} data={data} responsive/>');
  
  // Panel
  append(
  <Panel>
    <PanelHeading>
      <i>title</i>
    </PanelHeading>
    <PanelBody>
      <b>body...</b>
    </PanelBody>
  </Panel>, '<Panel>\n\
  <PanelHeading>\n\
    <i>title</i>\n\
  </PanelHeading>\n\
  <PanelBody>\n\
    <b>body...</b>\n\
  </PanelBody>\n\
</Panel>');

  // Nav  
  append(
    <Nav active="1">
      <NavItem>Home</NavItem>
      <NavItem>Profile</NavItem>
      <NavItem>Messages</NavItem>
    </Nav>,
    '<Nav active="1">\n\
  <NavItem>Home</NavItem>\n\
  <NavItem>Profile</NavItem>\n\
  <NavItem>Messages</NavItem>\n\
</Nav>'
  );

});
