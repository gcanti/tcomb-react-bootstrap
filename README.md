# tcomb-react-bootstrap

This project aims to add a type checking layer to
the awesome library [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap) mantaining identical APIs.
You can opt-in in development and opt-out in production with just a `require`.
Beware, checkings are *very* strict at the moment.

## Example

    /** @jsx React.DOM */
    var Alert = require('tcomb-react-bootstrap/Alert');

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

## Setup

    npm install tcomb-react-bootstrap
