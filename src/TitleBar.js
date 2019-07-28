import React from 'react';
export class TitleBar extends React.Component {
  render() {
    return (<div>
      <div className='btn' onClick={this.props.onNewSpawner}>新建反馈模板</div>
      <div className='btn-dropdown' style={{right: 10, top: 0}}>
        <div className="dropdown">
          <div className="btn btn-dark">三</div>
          <div className="dropdown-content">
            <a target="_blank" rel="noopener noreferrer" href='http://wpa.qq.com/msgrd?v=3&uin=203202537&site=qq&menu=yes'>反馈BUG</a>
            <a href='javascript: alert("计划功能, 暂未上线");'>复制全部信息</a>
          </div>
        </div>
      </div>
    </div>);
  }
}
