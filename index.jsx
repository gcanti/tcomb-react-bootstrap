/** @jsx React.DOM */

var createDivClass = function (className) {
  return React.createClass({
    render: function () {
      return <div className={className}>{this.props.children}</div>;
    }
  });
};

//
// Grid system
//

var Container = createDivClass('container');
var ContainerFluid = createDivClass('container-fluid');
var Row = createDivClass('row');
var Col = React.createClass({
  render: function () {
    var className = [];
    'xs sm md lg'.split(' ').forEach(function (size) {
      if (this.props[size]) {
        var arr = this.props[size].split(',');
        var width = arr[0];
        className.push('col-' + size + '-' + width);
        var offset = arr[1];
        if (offset) {
          className.push('col-' + size + '-offset-' + offset);
        }
      }
    }, this);
    if (this.props.align) {
      className.push('text-' + this.props.align);
    }
    className = className.join(' ');
    return <div className={className}>{this.props.children}</div>
  }
});

var Button = React.createClass({
    render: function () {
      var className = ['btn'];
      this.props.type && className.push('btn-' + this.props.type);
      this.props.size && className.push('btn-' + this.props.size);
      this.props.block && className.push('btn-block');
      if (this.props.className) {
        className.push(this.props.className);
      }
      className = className.join(' ');
      return <button className={className} onClick={this.props.onClick} disabled={this.props.disabled}>{this.props.children}</button>;
    }
});

var Select = React.createClass({
  render: function () {
    return (
      <select id={this.props.id} className={this.props.className} value={this.props.value}>
        { 
          this.props.options.map(function (option) {
            return <option key={option.value} value={option.value}>{option.description}</option>
          }) 
        }
      </select>
    );
  }
});

Select.EMPTY_VALUE = '';
Select.EMPTY_OPTION = {
  value: Select.EMPTY_VALUE,
  description: '-'
};

var Textbox = React.createClass({
  render: function () {
    return (
      <input type="text" className={this.props.className} placeholder={this.props.placeholder} defaultValue={this.props.value}/>
    );
  }
});

//
// Table
//

var Table = React.createClass({
  render: function () {
    var className = ['table'];
    this.props.bordered && className.push('table-bordered');
    this.props.striped && className.push('table-striped');
    this.props.hover && className.push('table-hover');
    this.props.condensed && className.push('table-condensed');
    className = className.join(' ');
    var table = ( 
      <table className={className}>
        <Thead cols={this.props.cols}/>
        <Tbody data={this.props.data}/>
      </table>
    );
    if (this.props.responsive) {
      table = <div className="table-responsive">{table}</div>;
    }
    return table;
  }
});

var Thead = React.createClass({
  render: function () {
    return (
      <thead>
        <tr>
        {this.props.cols.map(function (col, i) { 
          return <th key={i}>{col}</th>; 
        })}
        </tr>
      </thead>
    );
  }
});

var Tbody = React.createClass({
  render: function () {
    return (
      <tbody>
      {this.props.data.map(function (row, i) { 
        return ( 
          <tr key={i}>
          {row.map(function (cell, j) { 
            return <td key={j}>{cell}</td>; 
          })}
          </tr>
        ); 
      })}
      </tbody>
    );
  }
});

//
// Panel
//
var Panel = React.createClass({
    render: function () {
      var className = ['panel'];
      className.push('panel-' + (this.props.type || 'default'));
      className = className.join(' ');
      return <div className={className}>{this.props.children}</div>;
    }
});
var PanelHeading = createDivClass('panel-heading');
var PanelBody = createDivClass('panel-body');

//
// ProgressBar
//

var ProgessBar = React.createClass({
  getInitialState: function () {
    return {percentage: this.props.percentage};
  },
  render: function () {
    return (
      <div className="progress">
        <div className="progress-bar progress-bar-striped active" role="progressbar" style={{width: this.state.percentage + '%'}}></div>
      </div>
    );
  }
});

//
// Nav
//

var Nav = React.createClass({
  render: function () {
    this.props.children.forEach(function (item, i) {
      item.props.key = String(i);
      item.props.active = this.props.active;
    }.bind(this));
    return <ul className="nav nav-tabs" role="tablist">{this.props.children}</ul>;
  }
});

var NavItem = React.createClass({
  render: function () {
    var className = this.props.active === this.props.key ? 'active' : null;
    return <li className={className}><a href="#">{this.props.children}</a></li>;
  }
});

module.exports = {
  Container: Container,
  ContainerFluid: ContainerFluid,
  Row: Row,
  Col: Col,
  Button: Button,
  Select: Select,
  Textbox: Textbox,
  Table: Table,
  Panel: Panel,
  PanelHeading: PanelHeading,
  PanelBody: PanelBody,
  ProgessBar: ProgessBar,
  Nav: Nav
};
