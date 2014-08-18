# tcomb-react-bootstrap

tcomb bindings for react-bootstrap

## Example

    /** @jsx React.DOM */
    var Alert = TcombReactBootstrap.Alert;

    // build a component with jsx..
    var component = (
      <Alert bsStyle="warning">
        <strong>Holy guacamole!</strong> 
      </Alert>
    ); 

    // ..or programmatically..
    component = Alert.Config({
      bsStyle: 'info'
    }).render(
      <strong>Holy guacamole!</strong>
    );

    // ..but always type safe
    React.renderComponent(component, mountNode);
