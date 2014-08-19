var components = [
  'Accordion',
  'Affix',
  'Alert',
  'Badge',
  'Button',
  'ButtonGroup',
  'ButtonToolbar',
  'Carousel',
  'CarouselItem',
  'Col',
  'DropdownButton',
  'DropdownMenu',
  'Glyphicon',
  'Grid',
  'Input',
  'Jumbotron',
  'Label',
  'MenuItem',
  'Modal',
  'ModalTrigger',
  'Nav',
  'Navbar',
  'NavItem',
  'OverlayTrigger',
  'PageHeader',
  'PageItem',
  'Pager',
  'Panel',
  'PanelGroup',
  'Popover',
  'ProgessBar',
  'Row',
  'SplitButton',
  'SubNav',
  'TabbedArea',
  'Table',
  'TabPane',
  'Tooltip',
  'Well'
];

components.forEach(function (name) {
  var s = [
  '//',
  '// ' + name,
  '//',
  "var " + name + " = modelFactory('" + name + "', {",
  '}, [BootstrapMixin]);\n'
  ].join('\n');
  console.log(s);
});
