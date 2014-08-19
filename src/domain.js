'use strict';

var t = require('tcomb');
var constants = require('react-bootstrap/constants');

var Any = t.Any;
var Nil = t.Nil;
var Str = t.Str;
var Num = t.Num;
var Func = t.Func;
var Bool = t.Bool;
var struct = t.struct;
var subtype = t.subtype;
var enums = t.enums;
var maybe = t.maybe;
var union = t.union;
var format = t.format;
var mixin = t.mixin;

//
// utils
//

function propsWarnings(componentName, actualProps, expectedProps) {
  var warnings = [];
  for (var k in actualProps) {
    if (actualProps.hasOwnProperty(k)) {
      if (!expectedProps.hasOwnProperty(k)) {
        warnings.push(format('component `%s` does not handle property `%s`', componentName, k));
      }
    }
  }
  return warnings;
}

function bothProps(p1, p2) {
  var f = function (x) {
    return Nil.is(x[p1]) === Nil.is(x[p2]);
  }; 
  // help tcomb-doc
  f.__doc__ = format('Properties %s and %s must be both defined or both missing', p1, p2);
  return f; 
}

function mix(props, mixins) {
  if (mixins) {
    props = mixins.reduce(function (acc, x) {
      return mixin(acc, x);
    }, props);
  }
  return props;
}

function modelFactory(componentName, props, mixins) {
  mix(props, mixins);
  var model = struct(props, componentName);
  model.warnings = function (props) {
    return propsWarnings(componentName, props, this.meta.props);
  };
  return model;
}

//
// React props
//
var Renderable = Any; // TODO: better typing of React.PropTypes.renderable
var Key = union([Str, Num]);
var ComponentClass = Str; // TODO implement valid React component class

//
// common bootstrap props
//
var BsClass = enums(constants.CLASSES, 'BsClass');
var BsStyle = enums(constants.STYLES, 'BsStyle');
var BsSize = enums(constants.SIZES, 'BsSize');
var Glyph = enums.of(constants.GLYPHS, 'Glyph');

//
// mixins
//
var BootstrapMixin = {
  bsClass: maybe(BsClass),
  bsStyle: maybe(BsStyle),
  bsSize: maybe(BsSize)
};

var CollapsableMixin = {
  collapsable: maybe(Bool),
  defaultExpanded: maybe(Bool),
  expanded: maybe(Bool)
};

//
// Accordion
//
var Accordion = modelFactory('Accordion', {
});

//
// Affix
//
var Affix = modelFactory('Affix', {
  offset: maybe(Num),
  offsetTop: maybe(Num),
  offsetBottom: maybe(Num)
});

//
// Alert
//
var UncheckedAlert = struct({
  bsClass:      maybe(BsClass),
  bsStyle:      maybe(BsStyle),
  onDismiss:    maybe(Func),
  dismissAfter: maybe(Num)
}, 'UncheckedAlert');
var Alert = subtype(UncheckedAlert, bothProps('onDismiss', 'dismissAfter'), 'Alert');
Alert.warnings = function (props) {
  var supertype = this.meta.type;
  return propsWarnings('Alert', props, supertype.meta.props);
};

//
// Badge
//
var Badge = modelFactory('Badge', {
  pullRight: maybe(Bool)
});

//
// Button
//
var Button = modelFactory('Button', {
  active:       maybe(Bool),
  disabled:     maybe(Bool),
  block:        maybe(Bool),
  navItem:      maybe(Bool),
  navDropdown:  maybe(Bool)
}, [BootstrapMixin]);

//
// ButtonGroup
//
var ButtonGroup = modelFactory('ButtonGroup', {
  vertical:  maybe(Bool),
  justified: maybe(Bool)
}, [BootstrapMixin]);

//
// ButtonToolbar
//
var ButtonToolbar = modelFactory('ButtonToolbar', { // TODO: report wrong displayName (ButtonGroup)
}, [BootstrapMixin]);

//
// Carousel
//
var Direction = enums.of('prev, next', 'Direction');
var Carousel = modelFactory('Carousel', {
  slide: maybe(Bool),
  indicators: maybe(Bool),
  controls: maybe(Bool),
  pauseOnHover: maybe(Bool),
  wrap: maybe(Bool),
  onSelect: maybe(Func),
  onSlideEnd: maybe(Func),
  activeIndex: maybe(Num),
  defaultActiveIndex: maybe(Num),
  direction: maybe(Direction)
}, [BootstrapMixin]);

//
// CarouselItem
//
var CarouselItem = modelFactory('CarouselItem', {
  direction: maybe(Direction),
  onAnimateOutEnd: maybe(Func),
  active: maybe(Bool),
  caption: maybe(Renderable)
});

//
// Col
//
var Col = modelFactory('Col', {
  xs: maybe(Num),
  sm: maybe(Num),
  md: maybe(Num),
  lg: maybe(Num),
  xsOffset: maybe(Num),
  smOffset: maybe(Num),
  mdOffset: maybe(Num),
  lgOffset: maybe(Num),
  xsPush: maybe(Num),
  smPush: maybe(Num),
  mdPush: maybe(Num),
  lgPush: maybe(Num),
  xsPull: maybe(Num),
  smPull: maybe(Num),
  mdPull: maybe(Num),
  lgPull: maybe(Num),
  componentClass: maybe(ComponentClass)
});

//
// DropdownButton
//
var DropdownButton = modelFactory('DropdownButton', {
  pullRight: maybe(Bool),
  dropup:    maybe(Bool),
  title:     maybe(Renderable),
  href:      maybe(Str),
  onClick:   maybe(Func),
  onSelect:  maybe(Func),
  navItem:   maybe(Bool)
}, [BootstrapMixin]);

//
// DropdownMenu
//
var DropdownMenu = modelFactory('DropdownMenu', {
  pullRight: maybe(Bool),
  onSelect: maybe(Func)
});

//
// Glyphicon
//
var Glyphicon = modelFactory('Glyphicon', {
  glyph: Glyph
}, [BootstrapMixin]);

//
// Grid
//
var Grid = modelFactory('Grid', {
  fluid: maybe(Bool),
  componentClass: maybe(ComponentClass)
});

//
// Input
//
var InputStyle = enums.of('success warning error', 'InputStyle');
var Input = modelFactory('Input', {
  type: maybe(Str),
  label: maybe(Renderable),
  help: maybe(Renderable),
  addonBefore: maybe(Renderable),
  addonAfter: maybe(Renderable),
  bsStyle: maybe(InputStyle),
  hasFeedback: maybe(Bool),
  groupClassName: maybe(Str),
  wrapperClassName: maybe(Str),
  labelClassName: maybe(Str),
  checked: maybe(Bool), // TODO report missing propType
  readOnly: maybe(Bool), // TODO report missing propType
  multiple: maybe(Bool), // TODO report missing propType
  value: maybe(Str), // TODO report missing propType
  defaultValue: maybe(Str) // TODO report missing propType
});

//
// Jumbotron
//
var Jumbotron = modelFactory('Jumbotron', {
}, [BootstrapMixin]);

//
// Label
//
var Label = modelFactory('Label', {
}, [BootstrapMixin]);

//
// MenuItem
//
var MenuItem = modelFactory('MenuItem', {
  key: maybe(Key) // TODO: report missing propType
});

//
// Modal
//
var Modal = modelFactory('Modal', {
}, [BootstrapMixin]);

//
// ModalTrigger
//
var ModalTrigger = modelFactory('ModalTrigger', {
}, [BootstrapMixin]);

//
// Nav
//
var Nav = modelFactory('Nav', {
}, [BootstrapMixin]);

//
// Navbar
//
var Navbar = modelFactory('Navbar', {
}, [BootstrapMixin]);

//
// NavItem
//
var NavItem = modelFactory('NavItem', {
}, [BootstrapMixin]);

//
// OverlayTrigger
//
var OverlayTrigger = modelFactory('OverlayTrigger', {
}, [BootstrapMixin]);

//
// PageHeader
//
var PageHeader = modelFactory('PageHeader', {
}, [BootstrapMixin]);

//
// PageItem
//
var PageItem = modelFactory('PageItem', {
}, [BootstrapMixin]);

//
// Pager
//
var Pager = modelFactory('Pager', {
}, [BootstrapMixin]);

//
// Panel
//
var Panel = modelFactory('Panel', {
  header: Renderable,
  footer: Renderable,
  onClick: maybe(Func),
  key: Key // TODO: report missing propType
}, [BootstrapMixin, CollapsableMixin]);

//
// PanelGroup
//
var PanelGroup = modelFactory('PanelGroup', {
  collapsable: maybe(Bool),
  activeKey: Any,
  defaultActiveKey: Any,
  onSelect: maybe(Func),
  accordion: maybe(Bool) // TODO: report missing propType
}, [BootstrapMixin]);

//
// Popover
//
var Popover = modelFactory('Popover', {
}, [BootstrapMixin]);

//
// ProgessBar
//
var ProgessBar = modelFactory('ProgessBar', {
}, [BootstrapMixin]);

//
// Row
//
var Row = modelFactory('Row', {
}, [BootstrapMixin]);

//
// SplitButton
//
var SplitButton = modelFactory('SplitButton', {
}, [BootstrapMixin]);

//
// SubNav
//
var SubNav = modelFactory('SubNav', {
}, [BootstrapMixin]);

//
// TabbedArea
//
var TabbedArea = modelFactory('TabbedArea', {
}, [BootstrapMixin]);

//
// Table
//
var Table = modelFactory('Table', {
}, [BootstrapMixin]);

//
// TabPane
//
var TabPane = modelFactory('TabPane', {
}, [BootstrapMixin]);

//
// Tooltip
//
var Tooltip = modelFactory('Tooltip', {
}, [BootstrapMixin]);

//
// Well
//
var Well = modelFactory('Well', {
}, [BootstrapMixin]);

module.exports = {
  Accordion: Accordion,
  Affix: Affix,
  Alert: Alert,
  Badge: Badge,
  Button: Button,
  ButtonGroup: ButtonGroup,
  ButtonToolbar: ButtonToolbar,
  Carousel: Carousel,
  CarouselItem: CarouselItem,
  Col: Col,
  DropdownButton: DropdownButton,
  DropdownMenu: DropdownMenu,
  Glyphicon: Glyphicon,
  Grid: Grid,
  Input: Input,
  Jumbotron: Jumbotron,
  Label: Label,
  MenuItem: MenuItem,
  Modal: Modal,
  ModalTrigger: ModalTrigger,
  Nav: Nav,
  Navbar: Navbar,
  NavItem: NavItem,
  OverlayTrigger: OverlayTrigger,
  PageHeader: PageHeader,
  PageItem: PageItem,
  Pager: Pager,
  Panel: Panel,
  PanelGroup: PanelGroup,
  Popover: Popover,
  ProgessBar: ProgessBar,
  Row: Row,
  SplitButton: SplitButton,
  SubNav: SubNav,
  TabbedArea: TabbedArea,
  Table: Table,
  TabPane: TabPane,
  Tooltip: Tooltip,
  Well: Well
};
