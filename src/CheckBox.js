import React from 'react';
export class CheckBox extends React.Component {
  render() {
    return (<div>
      <label>
        <input type='checkbox' defaultChecked={this.props.defaultChecked} onChange={this.props.onChange} value={this.props.value ? this.props.value : this.props.label} />
        {this.props.label}
        {this.props.wrap ? (<br />) : ''}
      </label>
    </div>);
  }
}
