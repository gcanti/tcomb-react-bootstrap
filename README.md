# tcomb-react-bootstrap

tcomb bindings for rest-bootstrap

## Example

```javascript
/** @jsx React.DOM */
var Alert = TcombReactBootstrap.Alert;

// build a component with jsx..
var component = (
  <Alert bsStyle="warning">
    <strong>Holy guacamole!</strong> Best check yo self, you re not looking too good.
  </Alert>
); 

// ..or programmatically..
component = Alert.Config({
  bsStyle: 'info'
}).render(
  <strong>Hello!</strong>
);

// ..but always type safe

React.renderComponent(component, mountNode);
```