% tcomb-react-bootstrap

![tcomb logo](http://gcanti.github.io/resources/tcomb/logo.png)

This project adds a type checking layer to the components of [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap). 

# Playground

Try the playground [here](https://gcanti.github.io/resources/tcomb-react-bootstrap/playground/playground.html)

# Example

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
