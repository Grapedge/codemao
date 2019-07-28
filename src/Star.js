import React from 'react';
export class Star extends React.Component {
  hover = e => this.props.hover(this.props.starIndex);
  out = e => this.props.out();
  click = e => this.props.click(this.props.starIndex);
  render() {
    let className = 'iconfont icon-star star';
    className += this.props.bright ? '-bright' : '';
    return (<i className={className} onMouseEnter={this.hover} onMouseLeave={this.out} onClick={this.click}></i>);
  }
}
