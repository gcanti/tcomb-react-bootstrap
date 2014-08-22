This project adds a type checking layer to the components of [react-bootstrap](https://github.com/react-bootstrap/react-bootstrap). 

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

## Playground

Try the debugging support [here](https://gcanti.github.io/resources/tcomb-react-bootstrap/playground/playground.html)

## Add debugging support to your own components

For a quick solution you could instrument your code with asserts:

    var t = require('tcomb');

    /** @jsx React.DOM */
    var MyComponent = React.createClass({
      render: function() {
        t.assert(t.Str.is(this.props.name), "ouch! bad name");
        return (
          <h1>Hello {this.props.name}</h1>
        );
      }
    });

## Setup

    npm install tcomb-react-bootstrap

## Contribution

If you do have a contribution for the package feel free to put up a Pull Request or open an Issue.

## License (MIT)

The MIT License (MIT)

Copyright (c) 2014 Giulio Canti

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.