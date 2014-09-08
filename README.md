% tcomb-react-bootstrap

![tcomb logo](http://gcanti.github.io/resources/tcomb/logo.png)

This project adds a type checking layer to the components of [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap). 

If you want to **add type checking to your own React components**, see [here](https://github.com/gcanti/tcomb-react).

# Playground

Try the playground [here](https://gcanti.github.io/resources/tcomb-react-bootstrap/playground/playground.html)

# Constraint examples

Some constraints among others enforced by this library:

- `Alert`: `onDismiss` and `dismissAfter` must either or neither passed
- `ButtonGroup`: can have only `Button` children
- `Col`: props must be integers between 1 and 12
- `Glyphicon`: can't have children
- `Nav`: bsStyle must be one of `pills`, `tabs`

For now the constraints are quite relaxed in order to allow an easier demo, however they can be tighten up to the point of accepting 
only whitelisted props.

# Usage

```js
/** @jsx React.DOM */
// development
var Alert = require('tcomb-react-bootstrap/Alert');
// production
// var Alert = require('react-bootstrap/Alert');

var good = (
  <Alert bsStyle="warning">
    <strong>Holy guacamole!</strong>
  </Alert>
); // => ok!

var bad = (
  <Alert bsStyle="warn"> // <-- should be "warning"
    <strong>Holy guacamole!</strong>
  </Alert>
); // => fail! debugger kicks in
```

# Setup

    npm install tcomb-react-bootstrap

# License (MIT)
