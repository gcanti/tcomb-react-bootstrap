/** @jsx React.DOM */
(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define(['React'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('react'));
    } else {
        root.br = factory(React);
    }
}(this, function (React) {

    "use strict";

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
        }.bind(this));
        className = className.join(' ');
        return <div className={className}>{this.props.children}</div>
      }
    });

    //
    // Button
    //

    var Button = React.createClass({
        render: function () {
          var className = ['btn'];
          this.props.type && className.push('btn-' + this.props.type);
          this.props.size && className.push('btn-' + this.props.size);
          this.props.block && className.push('btn-block');
          className = className.join(' ');
          return <button className={className}>{this.props.children}</button>;
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
            <Thead cols={cols}/>
            <Tbody data={data}/>
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

    var Panel = createDivClass('panel panel-default');
    var PanelHeading = createDivClass('panel-heading');
    var PanelBody = createDivClass('panel-body');

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

    return {
      Container: Container,
      ContainerFluid: ContainerFluid,
      Col: Col,
      Row: Row,
      Button: Button,
      Table: Table,
      Thead: Thead,
      Tbody: Tbody,
      Panel: Panel,
      PanelHeading: PanelHeading,
      PanelBody: PanelBody,
      Nav: Nav,
      NavItem: NavItem
    };

}));    