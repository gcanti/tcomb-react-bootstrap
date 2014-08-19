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
  <bs.Alert bsStyle="warning">
    <strong>Holy guacamole!</strong> Best check yo self, you re not looking too good.
  </bs.Alert>
); 

// Button
append(
  <bs.Button bsStyle="danger" bsSize="large">Save</bs.Button>
); 

// PanelGroup / Panel

function handleSelect (selectedKey) {
  panelGroup.setProps({
    activeKey: selectedKey
  });
}

var panelGroup = append(
  <bs.PanelGroup activeKey={1} onSelect={handleSelect} accordion>
    <Panel header="Panel 1" key={1}>Panel 1 content</Panel>
    <Panel header="Panel 2" key={2}>Panel 2 content</Panel>
  </bs.PanelGroup>
);

