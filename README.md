# tcomb-react-bootstrap

tcomb bindings for react-bootstrap (proof of concept)

This library is an attempt to add type safety to the awesome project [React Bootstrap](http://react-bootstrap.github.io).

## Example

    /** @jsx React.DOM */
    var components = require('tcomb-react-bootstrap').components;
    var Alert = components.Alert;

    var good = (
      <Alert bsStyle="warning">
        <strong>Holy guacamole!</strong> Best check yo self, you re not looking too good.
      </Alert>
    ); // => ok!

    var bad = (
      <Alert bsStyle="warn"> // <-- typo, should be "warning"
        <strong>Holy guacamole!</strong> Best check yo self, you re not looking too good.
      </Alert>
    ); // => fail! debugger kicks in

