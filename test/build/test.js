/** @jsx React.DOM */
'use strict';

var React = require('react');
var bs = require('tcomb-react-bootstrap').components;

function append(component) {
  var $node = $('<div></div><br/>');
  $('#fixture').append($node);
  return React.renderComponent(component, $node.get(0));
}

var Accordion = bs.Accordion;
var Panel = bs.Panel;

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
  bs.Alert({bsStyle: "warning"}, 
    React.DOM.strong(null, "Holy guacamole!"), " Best check yo self, you re not looking too good."
  )
); 

// Button
append(
  bs.Button({bsStyle: "danger", bsSize: "large"}, "Save")
); 

// PanelGroup / Panel

function handleSelect (selectedKey) {
  panelGroup.setProps({
    activeKey: selectedKey
  });
}

var panelGroup = append(
  bs.PanelGroup({activeKey: 1, onSelect: handleSelect, accordion: true}, 
    Panel({header: "Panel 1", key: 1}, "Panel 1 content"), 
    Panel({header: "Panel 2", key: 2}, "Panel 2 content")
  )
);

