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

// override default fail behaviour of tcomb
t.options.onFail = function (message) {
  throw new Error(message);
};

function getErrorAlert(message){
  return (
    <Alert bsStyle="danger">
      {message}
    </Alert>
  );
}

var Header = React.createClass({
  render: function () {
    return (
      <h1>Playground</h1>
    );
  }
});

var Code = React.createClass({
  onChange: function () {
    var value = this.refs.code.getValue();
    this.props.onChange(value);
  },
  render: function () {
    return (
      <Input
        ref="code" 
        type="textarea" 
        value={this.props.value} 
        rows="10" 
        onChange={this.onChange}/>
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

var examples = {
  Accordion: '<Accordion> <Panel header="Collapsible Group Item #1" key={1}> Anim pariatur cliche reprehenderit </Panel> <Panel header="Collapsible Group Item #2" key={2}> Anim pariatur cliche reprehenderit </Panel> <Panel header="Collapsible Group Item #3" key={3}> Anim pariatur cliche reprehenderit </Panel> </Accordion>',
  Alert: '<Alert bsStyle="warning"><strong>Holy guacamole!</strong></Alert>',
  Badge: '<p>Badges <Badge>42</Badge></p>',
  Button: '<Button bsStyle="danger" bsSize="large">Save</Button>',
  ButtonGroup: '<ButtonGroup> <Button>Left</Button> <Button>Middle</Button> <Button>Right</Button> </ButtonGroup>',
  ButtonToolbar: '<ButtonToolbar> <Button>Default</Button> <Button bsStyle="primary">Primary</Button> <Button bsStyle="success">Success</Button> <Button bsStyle="info">Info</Button> <Button bsStyle="warning">Warning</Button> <Button bsStyle="danger">Danger</Button> <Button bsStyle="link">Link</Button> </ButtonToolbar>',
  Carousel: '<Carousel> <CarouselItem> <img width={900} height={500} alt="900x500" src="assets/carousel.png"/> <div className="carousel-caption"> <h3>First slide label</h3> <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> </div> </CarouselItem> <CarouselItem> <img width={900} height={500} alt="900x500" src="assets/carousel.png"/> <div className="carousel-caption"> <h3>Second slide label</h3> <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> </div> </CarouselItem> <CarouselItem> <img width={900} height={500} alt="900x500" src="assets/carousel.png"/> <div className="carousel-caption"> <h3>Third slide label</h3> <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p> </div> </CarouselItem> </Carousel>',
  DropdownButton: '<DropdownButton bsStyle={title.toLowerCase()} title={title}> <MenuItem key="1">Action</MenuItem> <MenuItem key="2">Another action</MenuItem> <MenuItem key="3">Something else here</MenuItem> <MenuItem divider /> <MenuItem key="4">Separated link</MenuItem> </DropdownButton>',
  Glyphicon: '<div> <ButtonToolbar> <ButtonGroup> <Button><Glyphicon glyph="align-left" /></Button> <Button><Glyphicon glyph="align-center" /></Button> <Button><Glyphicon glyph="align-right" /></Button> <Button><Glyphicon glyph="align-justify" /></Button> </ButtonGroup> </ButtonToolbar> <ButtonToolbar> <ButtonGroup> <Button bsSize="large"><Glyphicon glyph="star" /> Star</Button> <Button><Glyphicon glyph="star" /> Star</Button> <Button bsSize="small"><Glyphicon glyph="star" /> Star</Button> <Button bsSize="xsmall"><Glyphicon glyph="star" /> Star</Button> </ButtonGroup> </ButtonToolbar> </div>',
  Input: '<form> <Input type="text" defaultValue="text" /> <Input type="password" defaultValue="secret" /> <Input type="checkbox" checked readOnly label="checkbox"/> <Input type="radio" checked readOnly label="radio"/> <Input type="select" defaultValue="select"> <option value="select">select</option> <option value="other">...</option> </Input> <Input type="select" multiple> <option value="select">select (multiple)</option> <option value="other">...</option> </Input> <Input type="textarea" defaultValue="textarea" /> <Input type="static" value="static" /> </form>',
  Modal: '<Modal title="Modal title" backdrop={false} animation={false} onRequestHide={handleHide}> <div className="modal-body"> One fine body... </div> <div className="modal-footer"> <Button>Close</Button> <Button bsStyle="primary">Save changes</Button> </div> </Modal>',
  Nav: '<Nav bsStyle="pills" activeKey={1} onSelect={handleSelect}> <NavItem key={1} href="/home">NavItem 1 content</NavItem> <NavItem key={2} title="Item">NavItem 2 content</NavItem> <NavItem key={3} disabled={true}>NavItem 3 content</NavItem> </Nav>',
  Navbar: '<Navbar> <Nav> <NavItem key={1} href="#">Link</NavItem> <NavItem key={2} href="#">Link</NavItem> <DropdownButton key={3} title="Dropdown"> <MenuItem key="1">Action</MenuItem> <MenuItem key="2">Another action</MenuItem> <MenuItem key="3">Something else here</MenuItem> <MenuItem divider /> <MenuItem key="4">Separated link</MenuItem> </DropdownButton> </Nav> </Navbar>',
  Pager: '<Pager> <PageItem href="#">Previous</PageItem> <PageItem href="#">Next</PageItem> </Pager>',
  PanelGroup: ' <PanelGroup activeKey={1} onSelect={handleSelect} accordion> <Panel header="Panel 1" key={1}>Panel 1 content</Panel> <Panel header="Panel 2" key={2}>Panel 2 content</Panel> </PanelGroup>',
  Popover: '<div style={holderStyle}> <Popover placement="right" positionLeft={200} positionTop={50} title="Popover right"> And here\'s some <strong>amazing</strong> content. It\'s very engaging. right? </Popover> </div>',
  ProgressBar: '<div> <ProgressBar striped bsStyle="success" now={40} /> <ProgressBar striped bsStyle="info" now={20} /> <ProgressBar striped bsStyle="warning" now={60} /> <ProgressBar striped bsStyle="danger" now={80} /> </div>',
  SplitButton: '<SplitButton bsStyle={title.toLowerCase()} title={title}> <MenuItem key="1">Action</MenuItem> <MenuItem key="2">Another action</MenuItem> <MenuItem key="3">Something else here</MenuItem> <MenuItem divider /> <MenuItem key="4">Separated link</MenuItem> </SplitButton>',
  TabbedArea: '<TabbedArea defaultActiveKey={2}> <TabPane key={1} tab="Tab 1">TabPane 1 content</TabPane> <TabPane key={2} tab="Tab 2">TabPane 2 content</TabPane> </TabbedArea>',
  Table: '<Table striped bordered condensed hover> <thead> <tr> <th>#</th> <th>First Name</th> <th>Last Name</th> <th>Username</th> </tr> </thead> <tbody> <tr> <td>1</td> <td>Mark</td> <td>Otto</td> <td>@mdo</td> </tr> <tr> <td>2</td> <td>Jacob</td> <td>Thornton</td> <td>@fat</td> </tr> <tr> <td>3</td> <td colSpan="2">Larry the Bird</td> <td>@twitter</td> </tr> </tbody> </Table>',
  Tooltip: '<div style={holderStyle}> <Tooltip placement="right" positionLeft={150} positionTop={50}> <strong>Holy guacamole!</strong> Check this info. </Tooltip> </div>',
  Well: '<div> <Well bsSize="large">Look I\'m in a large well!</Well> <Well bsSize="small">Look I\'m in a small well!</Well> </div>'        
};
var options = Object.keys(examples).sort().map(function (k) {
  return <option key={k} value={k}>{k}</option>;
});

var Example = React.createClass({
  onChange: function () {
    var value = this.refs.example.getValue();
    this.props.onChange(value);
  },
  render: function () {
    return (
      <Input ref="example" type="select" defaultValue="Alert" onChange={this.onChange}>
        {options}
      </Input>
    );
  }
});

var Main = React.createClass({
  getInitialState: function () {
    return {
      code: '/** @jsx React.DOM */\n<Alert bsStyle="warning"><strong>Holy guacamole!</strong></Alert>'
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
  onExampleChange: function () {

  },
  onCodeChange: function (code) {
    this.setState({code: code});
  },
  render: function () {
    var code = this.state.code;
    var component = this.eval(code);
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <Header/>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <p className="lead">Insert JSX code or choose an example</p>
            <Example onChange={onExampleChange}/>
            <Code value={code} onChange={this.onCodeChange}/>
          </Col>
          <Col md={6}>
            <p className="lead">Preview</p>
            <Preview component={component}/>
          </Col>
        </Row>
      </Grid>
    );
  }
});

React.renderComponent(<Main/>, document.getElementById('app'));
