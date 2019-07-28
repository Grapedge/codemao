import React from 'react';
export class DataInput extends React.Component {
  static defaultProps = {
    title: '标题栏'
  };
  render() {
    return (<div>
      <h3>{this.props.title}</h3>
      {this.props.children}
    </div>);
  }
}
