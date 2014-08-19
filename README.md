# tcomb-react-bootstrap

tcomb bindings for react-bootstrap (proof of concept)

This library is an attempt to add type safety to the awesome project [React Bootstrap](http://react-bootstrap.github.io).

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

# Domain

# Alert

`subtype($Alert)`

# $Alert

Props:

- `bsClass`: `maybe(BsClass)`
- `bsStyle`: `maybe(BsStyle)`
- `bsSize`: `maybe(BsSize)`
- `onDismiss`: `maybe(Func)`
- `dismissAfter`: `maybe(Num)`

# BsClass

Enums:

- `alert`: `"alert"`
- `button`: `"btn"`
- `button-group`: `"btn-group"`
- `button-toolbar`: `"btn-toolbar"`
- `column`: `"col"`
- `form`: `"form"`
- `glyphicon`: `"glyphicon"`
- `input-group`: `"input-group"`
- `label`: `"label"`
- `modal`: `"modal"`
- `nav`: `"nav"`
- `navbar`: `"navbar"`
- `panel`: `"panel"`
- `panel-group`: `"panel-group"`
- `progress-bar`: `"progress-bar"`
- `row`: `"row"`
- `well`: `"well"`

# BsStyle

Enums:

- `danger`: `"danger"`
- `default`: `"default"`
- `info`: `"info"`
- `inline`: `"inline"`
- `link`: `"link"`
- `pills`: `"pills"`
- `primary`: `"primary"`
- `success`: `"success"`
- `tabs`: `"tabs"`
- `warning`: `"warning"`

# BsSize

Enums:

- `large`: `"lg"`
- `medium`: `"md"`
- `small`: `"sm"`
- `xsmall`: `"xs"`
