# tcomb-react-bootstrap

tcomb bindings for rest-bootstrap

## Example

      var Alert = TcombReactBootstrap.Alert;

      var a = Alert({
        bsStyle: "warning"
      });

      var message = [
        React.DOM.strong(null, 'Holy guacamole!'),
        ' Best check yo self, you\'re not looking too good.' 
      ];

      React.renderComponent(a.render(message), mountNode);
