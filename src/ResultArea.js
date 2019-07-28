import React from 'react';
import copy from 'copy-to-clipboard';

export class ResultArea extends React.Component {
  render() {
    return (<div>
      <input name='head' value={this.props.head} style={{ width: '65%' }} onChange={this.props.onChangeHead} placeholder='学生基本信息' />
      <span className='btn' style={{ width: '30%', fontSize: '.65em', display: 'inline-block', marginLeft: 5 }} onClick={() => {
        let info = Object.assign({}, this.props.basicInfo);
        let changeValue = (oriV, value)=> oriV !== '未填' ? value : oriV;
        info.age = changeValue(info.age, info.age + ' 岁');
        info.account = changeValue(info.account, '学生id: ' + info.account);
        info.sex = changeValue(info.sex, info.sex + '生');
        info.preference = changeValue(info.preference, '对老师的期望: ' + info.preference);
        info.parentIsProgramer = changeValue(info.parentIsProgramer, '父母对编程的了解情况: ' + info.parentIsProgramer);
        info.parentExpectation = changeValue(info.parentExpectation, '家长期望: ' + info.parentExpectation);
        info.operation = changeValue(info.operation, '电脑操作能力: ' + info.operation);
        info.consultant = changeValue(info.consultant, '课程顾问: ' + info.consultant);
        let arr = [];
        for (let x in info) {
          arr.push(info[x]);
        }
        arr = arr.filter(v=> v !== '未填');
        const basicInfo = `【学生信息】 ${arr.join(', ')}\n`;
        copy(`${this.props.head}${basicInfo}${this.props.result}\n【总结反思】 ${this.props.summary === '' ? '无' : this.props.summary}`);
        alert('复制成功');
      }}>复制全部信息</span>
      <textarea style={{ width: '100%', height: '200px', marginTop: 5 }} name='result' value={this.props.result} onChange={this.props.onChangeTextarea} placeholder='反馈信息生成处'/>
    </div>);
  }
}
