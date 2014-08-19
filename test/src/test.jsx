/** @jsx React.DOM */
'use strict';

var React = require('react');
var bs = require('tcomb-react-bootstrap').components;

function append(component) {
  var $node = $('<div></div><br/>');
  $('#fixture').prepend($node);
  return React.renderComponent(component, $node.get(0));
}

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
var ProgessBar = bs.ProgessBar;
var Row = bs.Row;
var SplitButton = bs.SplitButton;
var SubNav = bs.SubNav;
var TabbedArea = bs.TabbedArea;
var Table = bs.Table;
var TabPane = bs.TabPane;
var Tooltip = bs.Tooltip;
var Well = bs.Well;

// Accordion
append(
  <Accordion>
    <Panel header="Collapsible Group Item #1" key={1}>
      Anim pariatur cliche reprehenderit
    </Panel>
    <Panel header="Collapsible Group Item #2" key={2}>
      Anim pariatur cliche reprehenderit
    </Panel>
    <Panel header="Collapsible Group Item #3" key={3}>
      Anim pariatur cliche reprehenderit
    </Panel>
  </Accordion>
);

// Alert
append(
  <Alert bsStyle="warning">
    <strong>Holy guacamole!</strong> Best check yo self, you re not looking too good.
  </Alert>
); 

// Badge
append(
  <p>Badges <Badge>42</Badge></p>
);

// Button
append(
  <Button bsStyle="danger" bsSize="large">Save</Button>
); 

// ButtonGroup
append(
  <ButtonGroup>
    <Button>Left</Button>
    <Button>Middle</Button>
    <Button>Right</Button>
  </ButtonGroup>
);

// ButtonToolbar
append(
  <ButtonToolbar>
    {/* Standard button */}
    <Button>Default</Button>

    {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
    <Button bsStyle="primary">Primary</Button>

    {/* Indicates a successful or positive action */}
    <Button bsStyle="success">Success</Button>

    {/* Contextual button for informational alert messages */}
    <Button bsStyle="info">Info</Button>

    {/* Indicates caution should be taken with this action */}
    <Button bsStyle="warning">Warning</Button>

    {/* Indicates a dangerous or potentially negative action */}
    <Button bsStyle="danger">Danger</Button>

    {/* Deemphasize a button by making it look like a link while maintaining button behavior */}
    <Button bsStyle="link">Link</Button>
  </ButtonToolbar>
);

// Carousel / CarouselItem
append(
  <Carousel>
    <CarouselItem>
      <img width={900} height={500} alt="900x500" src="assets/carousel.png"/>
      <div className="carousel-caption">
        <h3>First slide label</h3>
        <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
      </div>
    </CarouselItem>
    <CarouselItem>
      <img width={900} height={500} alt="900x500" src="assets/carousel.png"/>
      <div className="carousel-caption">
        <h3>Second slide label</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </CarouselItem>
    <CarouselItem>
      <img width={900} height={500} alt="900x500" src="assets/carousel.png"/>
      <div className="carousel-caption">
        <h3>Third slide label</h3>
        <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
      </div>
    </CarouselItem>
  </Carousel>
);

// DropdownButton
var BUTTONS = ['Default', 'Primary', 'Success', 'Info', 'Warning', 'Danger', 'Link'];
function renderDropdownButton(title) {
  return (
    <DropdownButton bsStyle={title.toLowerCase()} title={title}>
      <MenuItem key="1">Action</MenuItem>
      <MenuItem key="2">Another action</MenuItem>
      <MenuItem key="3">Something else here</MenuItem>
      <MenuItem divider />
      <MenuItem key="4">Separated link</MenuItem>
    </DropdownButton>
  );
}
append(
  <ButtonToolbar>{BUTTONS.map(renderDropdownButton)}</ButtonToolbar>
);

// Glyphicon

append(
  <div>
    <ButtonToolbar>
      <ButtonGroup>
        <Button><Glyphicon glyph="align-left" /></Button>
        <Button><Glyphicon glyph="align-center" /></Button>
        <Button><Glyphicon glyph="align-right" /></Button>
        <Button><Glyphicon glyph="align-justify" /></Button>
      </ButtonGroup>
    </ButtonToolbar>
    <ButtonToolbar>
      <ButtonGroup>
        <Button bsSize="large"><Glyphicon glyph="star" /> Star</Button>
        <Button><Glyphicon glyph="star" /> Star</Button>
        <Button bsSize="small"><Glyphicon glyph="star" /> Star</Button>
        <Button bsSize="xsmall"><Glyphicon glyph="star" /> Star</Button>
      </ButtonGroup>
    </ButtonToolbar>
  </div>
);

// Input

append(
  <form>
    <Input type="text" defaultValue="text" />
    <Input type="password" defaultValue="secret" />
    <Input type="checkbox" checked readOnly label="checkbox"/>
    <Input type="radio" checked readOnly label="radio"/>
    <Input type="select" defaultValue="select">
      <option value="select">select</option>
      <option value="other">...</option>
    </Input>
    <Input type="select" multiple>
      <option value="select">select (multiple)</option>
      <option value="other">...</option>
    </Input>
    <Input type="textarea" defaultValue="textarea" />
    <Input type="static" value="static" />
  </form>
);

// PanelGroup / Panel

function handleSelect (selectedKey) {
  panelGroup.setProps({
    activeKey: selectedKey
  });
}

var panelGroup = append(
  <PanelGroup activeKey={1} onSelect={handleSelect} accordion>
    <Panel header="Panel 1" key={1}>Panel 1 content</Panel>
    <Panel header="Panel 2" key={2}>Panel 2 content</Panel>
  </PanelGroup>
);

