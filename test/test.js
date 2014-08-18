/** @jsx React.DOM */
var mountNode = document.getElementById('fixture');

var Alert = TcombReactBootstrap.Alert;

// build a component with jsx..
var component = (
  Alert({bsStyle: "warning"}, 
    React.DOM.strong(null, "Holy guacamole!"), " Best check yo self, you re not looking too good."
  )
); 

// ..or programmatically..
component = Alert.Config({
  bsStyle: 'info'
}).render(
  React.DOM.strong(null, "Hello!")
);

// ..but always type safe

React.renderComponent(component, mountNode);
