import React from 'react';
import { CheckBox } from "./CheckBox";
export class CheckBoxGroup extends React.Component {
  handleCheckBoxChange = event => {
    const value = event.target.value;
    const checked = event.target.checked;
    let result = this.props.result.slice();
    const index = result.indexOf(value);
    if (index === -1 && checked) {
      result.push(value);
    }
    else if (!checked) {
      result.splice(index, 1);
    }
    //this.setState({result: result});
    this.props.onChange(result);
  };
  render() {
    return (<div>
      {this.props.items.map((item, index) => {
        return (<CheckBox wrap={this.props.wrap} defaultChecked label={item} value={item} onChange={this.handleCheckBoxChange} key={'item-' + item + index} />);
      })}
    </div>);
  }
}
