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
  Accordion(null, 
    Panel({header: "Collapsible Group Item #1", key: 1}, 
      "Anim pariatur cliche reprehenderit"
    ), 
    Panel({header: "Collapsible Group Item #2", key: 2}, 
      "Anim pariatur cliche reprehenderit"
    ), 
    Panel({header: "Collapsible Group Item #3", key: 3}, 
      "Anim pariatur cliche reprehenderit"
    )
  )
);

// Alert
append(
  Alert({bsStyle: "warning"}, 
    React.DOM.strong(null, "Holy guacamole!"), " Best check yo self, you re not looking too good."
  )
); 

// Badge
append(
  React.DOM.p(null, "Badges ", Badge(null, "42"))
);

// Button
append(
  Button({bsStyle: "danger", bsSize: "large"}, "Save")
); 

// ButtonGroup
append(
  ButtonGroup(null, 
    Button(null, "Left"), 
    Button(null, "Middle"), 
    Button(null, "Right")
  )
);

// ButtonToolbar
append(
  ButtonToolbar(null, 
    /* Standard button */
    Button(null, "Default"), 

    /* Provides extra visual weight and identifies the primary action in a set of buttons */
    Button({bsStyle: "primary"}, "Primary"), 

    /* Indicates a successful or positive action */
    Button({bsStyle: "success"}, "Success"), 

    /* Contextual button for informational alert messages */
    Button({bsStyle: "info"}, "Info"), 

    /* Indicates caution should be taken with this action */
    Button({bsStyle: "warning"}, "Warning"), 

    /* Indicates a dangerous or potentially negative action */
    Button({bsStyle: "danger"}, "Danger"), 

    /* Deemphasize a button by making it look like a link while maintaining button behavior */
    Button({bsStyle: "link"}, "Link")
  )
);

// Carousel / CarouselItem
append(
  Carousel(null, 
    CarouselItem(null, 
      React.DOM.img({width: 900, height: 500, alt: "900x500", src: "assets/carousel.png"}), 
      React.DOM.div({className: "carousel-caption"}, 
        React.DOM.h3(null, "First slide label"), 
        React.DOM.p(null, "Nulla vitae elit libero, a pharetra augue mollis interdum.")
      )
    ), 
    CarouselItem(null, 
      React.DOM.img({width: 900, height: 500, alt: "900x500", src: "assets/carousel.png"}), 
      React.DOM.div({className: "carousel-caption"}, 
        React.DOM.h3(null, "Second slide label"), 
        React.DOM.p(null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit.")
      )
    ), 
    CarouselItem(null, 
      React.DOM.img({width: 900, height: 500, alt: "900x500", src: "assets/carousel.png"}), 
      React.DOM.div({className: "carousel-caption"}, 
        React.DOM.h3(null, "Third slide label"), 
        React.DOM.p(null, "Praesent commodo cursus magna, vel scelerisque nisl consectetur.")
      )
    )
  )
);

// DropdownButton
var BUTTONS = ['Default', 'Primary', 'Success', 'Info', 'Warning', 'Danger', 'Link'];
function renderDropdownButton(title) {
  return (
    DropdownButton({bsStyle: title.toLowerCase(), title: title}, 
      MenuItem({key: "1"}, "Action"), 
      MenuItem({key: "2"}, "Another action"), 
      MenuItem({key: "3"}, "Something else here"), 
      MenuItem({divider: true}), 
      MenuItem({key: "4"}, "Separated link")
    )
  );
}
append(
  ButtonToolbar(null, BUTTONS.map(renderDropdownButton))
);

// Glyphicon

append(
  React.DOM.div(null, 
    ButtonToolbar(null, 
      ButtonGroup(null, 
        Button(null, Glyphicon({glyph: "align-left"})), 
        Button(null, Glyphicon({glyph: "align-center"})), 
        Button(null, Glyphicon({glyph: "align-right"})), 
        Button(null, Glyphicon({glyph: "align-justify"}))
      )
    ), 
    ButtonToolbar(null, 
      ButtonGroup(null, 
        Button({bsSize: "large"}, Glyphicon({glyph: "star"}), " Star"), 
        Button(null, Glyphicon({glyph: "star"}), " Star"), 
        Button({bsSize: "small"}, Glyphicon({glyph: "star"}), " Star"), 
        Button({bsSize: "xsmall"}, Glyphicon({glyph: "star"}), " Star")
      )
    )
  )
);

// Input

append(
  React.DOM.form(null, 
    Input({type: "text", defaultValue: "text"}), 
    Input({type: "password", defaultValue: "secret"}), 
    Input({type: "checkbox", checked: true, readOnly: true, label: "checkbox"}), 
    Input({type: "radio", checked: true, readOnly: true, label: "radio"}), 
    Input({type: "select", defaultValue: "select"}, 
      React.DOM.option({value: "select"}, "select"), 
      React.DOM.option({value: "other"}, "...")
    ), 
    Input({type: "select", multiple: true}, 
      React.DOM.option({value: "select"}, "select (multiple)"), 
      React.DOM.option({value: "other"}, "...")
    ), 
    Input({type: "textarea", defaultValue: "textarea"}), 
    Input({type: "static", value: "static"})
  )
);

// PanelGroup / Panel

function handleSelect (selectedKey) {
  panelGroup.setProps({
    activeKey: selectedKey
  });
}

var panelGroup = append(
  PanelGroup({activeKey: 1, onSelect: handleSelect, accordion: true}, 
    Panel({header: "Panel 1", key: 1}, "Panel 1 content"), 
    Panel({header: "Panel 2", key: 2}, "Panel 2 content")
  )
);

