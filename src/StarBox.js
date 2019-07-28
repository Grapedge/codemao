import React from 'react';
import { Star } from "./Star";
export class StarBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: [],
      brightIndex: props.count - 1,
      activeIndex: props.count - 1
    };
  }
  starHover = index => {
    this.setState({ brightIndex: index });
  };
  starOut = () => {
    this.setState({ brightIndex: this.state.activeIndex });
  };
  starClick = index => {
    this.setState({ activeIndex: index });
    this.props.onChange(index + 1);
  };
  componentDidMount() {
    let stars = [];
    for (let i = 0; i < this.props.count; i++) {
      stars.push(i);
    }
    this.setState({ stars: stars });
  }
  render() {
    return (<div className='star-box'>
      {this.state.stars.map(i => {
        return (<Star starIndex={i} bright={this.state.brightIndex >= i} key={'star' + i} hover={this.starHover} out={this.starOut} click={this.starClick} />);
      })}
    </div>);
  }
}
