import React from 'react';
import { ResultArea } from './ResultArea';
import { DataInput } from "./DataInput";
import { StarBox } from "./StarBox";
import { CheckBoxGroup } from "./CheckBoxGroup";
import Modal from 'react-modal';


const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)',
        padding: '30px 50px 10px 50px'
    },
    overlay : {
      position          : 'fixed',
      top               : 0,
      left              : 0,
      right             : 0,
      bottom            : 0,
      backgroundColor   : 'rgba(120, 120, 120, 0.75)'
    }
};
  
Modal.setAppElement('#root')

/**
 * 
张晗4172991

年龄：10
性别：女
年级：小学
编程基础：未填
电脑操作：未填
老师偏好：未填
家长懂编程：未填
家长期望：未填
课程顾问：王达
班主任：未填
 */


// 反馈生成器
export class Spawner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      head: '',
      basic: '',
      basicInfo: {},
      course: 'M-拯救编程猫',
      name: '',
      account: '',
      consultant: '',
      age: '',
      starCount: 5,
      interactive: '交流积极',
      future: '有趣/学科挂钩',
      hope: '被动',
      suggestion: '课后复习',
      summary: '',
      result: '',
      showResult: false,
      items: this.getCourseItems('M-拯救编程猫'),
      showModal: false
    };
    this.knowledge = this.state.items;
    this.modify = false;
  }

  getCourseItems = (name) => {
    switch (name) {
      case 'M-拯救编程猫':
        return ['随机数的原理及应用', '角度的认识', '面向积木与角度的结合使用', '通过缩短时间间隔的原理实现加速效果'];
      case 'S-拯救编程猫':
        return ['角度的认识及应用', '旋转积木与角度的结合使用', '通过缩短时间间隔的原理实现加速效果'];
      case '飞机大战':
        return ['初步认识 x/y 坐标轴', '无限循环结构（重复执行）', '相对运动原理', '动画制作原理'];
      default:
        return [];
    }
  };

  handleCourseChange = event => {
    this.handleInputChange(event);
    let items = this.getCourseItems(event.target.value);
    this.knowledge = items;
    this.setState({
      items: items
    });
  };

  handleInputChange = event => {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };

  handleResultInputChange = event=> {
    this.modify = true;
    this.handleInputChange(event);
  }

  parseBasic = event => {
    this.handleInputChange(event);
    const text = event.target.value;
    const patterns = [
      /^(\S*?)(\d+)/g,
      /年龄：(\d+)/g,
      /性别：(\S+)/g,
      /年级：(\S+)/g,
      /编程基础：(\S+)/g,
      /电脑操作：(\S+)/g,
      /老师偏好：(\S+)/g,
      /家长懂编程：(\S+)/g,
      /家长期望：(\S+)/g,
      /课程顾问：(\S+)/g,
      /班主任：(\S+)/g,
    ];
    const matches = [''];
    for (let p in patterns) {
      const match = patterns[p].exec(text);
      if (match === null) {
        matches.push('未填');
        if (p === 0) matches.push('未填');
        continue;
      }
      for (let i = 1; i < match.length; i++) {
        matches.push(match[i]);
      }
    }
    //const pattern = /(.*?)(\d+).*年龄：(\S*).*性别：(\S*).*年级：(\S*).*编程基础：(\S*).*电脑操作：(\S*).*老师偏好：(\S*).*家长懂编程：(\S*).*家长期望：(\S*).*课程顾问：(\S*).*班主任：(\S*)/g;
    //const matches = pattern.exec(text);
    
    if (matches) {
      this.setState({
        name: matches[1] || '',
        account: matches[2] || '',
        consultant: matches[11] || ''
      });
      if (!isNaN(parseInt(matches[3]))) {
        this.setState({
          age: parseInt(matches[3])
        });
      }
    }
    this.setState({basicInfo: {
      name: matches[1],
      account: matches[2],
      age: matches[3],
      sex: matches[4],
      grade: matches[5],
      basic: matches[6],
      operation: matches[7],
      preference: matches[8],
      parentIsProgramer: matches[9],
      parentExpectation: matches[10],
      consultant: matches[11]
    }});
  };

  handleKnowledgeChange = result => {
    this.setState({
      items: result
    });
    this.knowledge = result;
  };

  spawnFeedback = ()=> {
    this.modify = false;
    const state = this.state;
    let result = `${getBasicInfo(state.name, state.course, state.starCount, this.knowledge)}${getClassInfo(state.name, state.interactive, state.future)}${getTeacherHope(state.name, state.hope)}${getSuggestion(state.name, state.suggestion)}`;
    this.setState({
      head: getHeadInfo(this.state.basicInfo, this.state.course),
      result: result,
      showResult: true
    });
    this.closeModal();
  }

  closeModal = ()=> {
    this.setState({
      showModal: false
    });
  }

  onSpawnClick = () => {
      const state = this.state;
      if (this.modify && !(state.head === '' && state.result === '')) {
        this.setState({
          showModal: true
        });
      } else {
        this.spawnFeedback();
      }
  };

  render() {
    return (<div className='spawner'>
      <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="警告"
        >
        <div style={{borderBottom: '1px solid #979A9A', width: '100%', paddingBottom: 5}}>检测到已对编辑器内文本进行修改, 生成后修改将丢失</div>
        <div style={{textAlign: 'right'}}>
          <div className='btn' style={{width: 120, display: 'inline-block', padding: 5, margin: 5}} onClick={this.spawnFeedback}>确认</div>
          <div className='btn btn-dark' style={{width: 120, display: 'inline-block', padding: 5, margin: 5}} onClick={this.closeModal}>取消</div>
        </div>
      </Modal>
      <DataInput title='基础信息'>
        <input name='basic' onChange={this.parseBasic} placeholder='基础信息自动解析' style={{ width: '90%' }} /><br />
        <input name='name' onChange={this.handleInputChange} placeholder='姓名' value={this.state.name} style={{ width: '20%' }} />
        <input name='account' onChange={this.handleInputChange} placeholder='账号' value={this.state.account} style={{ width: '20%' }} />
        <input name='age' onChange={this.handleInputChange} placeholder='年龄' value={this.state.age} style={{ width: '20%' }} />
        <input name='consultant' onChange={this.handleInputChange} placeholder='课程顾问' value={this.state.consultant} style={{ width: '25%' }} /><br />
        <select name='course' value={this.state.course} onChange={this.handleCourseChange} style={{ width: '90%' }}>
          <option value='M-拯救编程猫'>M-拯救编程猫</option>
          <option value='S-拯救编程猫'>S-拯救编程猫</option>
          <option value='飞机大战'>飞机大战</option>
        </select>
      </DataInput>
      <DataInput title='整体表现'>
        <StarBox count={5} className='star-box' onChange={count => this.setState({ starCount: count })} />
      </DataInput>
      <DataInput title='课堂知识'>
        {this.state.course === 'M-拯救编程猫' ? (<CheckBoxGroup wrap items={['随机数的原理及应用', '角度的认识', '面向积木与角度的结合使用', '通过缩短时间间隔的原理实现加速效果']} result={this.state.items} onChange={this.handleKnowledgeChange} />) : this.state.course === 'S-拯救编程猫' ? (<CheckBoxGroup wrap items={['角度的认识及应用', '旋转积木与角度的结合使用', '通过缩短时间间隔的原理实现加速效果']} result={this.state.items} onChange={this.handleKnowledgeChange} />) : this.state.course === '飞机大战' ? (<CheckBoxGroup wrap items={['初步认识 x/y 坐标轴', '无限循环结构（重复执行）', '相对运动原理', '动画制作原理']} result={this.state.items} onChange={this.handleKnowledgeChange} />) : (<div></div>)}
      </DataInput>
      <DataInput title='课堂情况'>
        <select name='interactive' value={this.state.interactive} onChange={this.handleInputChange}>
          <option value='交流积极'>交流积极</option>
          <option value='交流慢热'>交流慢热</option>
          <option value='交流被动'>交流被动</option>
        </select>
        <select name='future' value={this.state.future} onChange={this.handleInputChange}>
          <option value='有趣/学科挂钩'>有趣/学科挂钩</option>
          <option value='培养逻辑思维/制作游戏'>培养逻辑思维/制作游戏</option>
          <option value='锻炼孩子能力'>锻炼孩子能力</option>
        </select>
      </DataInput>
      <DataInput title='老师寄语'>
        <select name='hope' value={this.state.hope} onChange={this.handleInputChange} style={{ maxWidth: '90%' }}>
          <option value='粗心（提示后能独立修改）'>粗心（提示后能独立修改）</option>
          <option value='粗心（不能独立完成修改）'>粗心（不能独立完成修改）</option>
          <option value='思维跳跃'>思维跳跃</option>
          <option value='逻辑较差'>逻辑较差</option>
          <option value='表达不清晰'>表达不清晰</option>
          <option value='浮躁'>浮躁</option>
          <option value='被动'>被动(只根据老师讲的内容完成)</option>
          <option value='胆怯'>胆怯(害怕出错误)</option>
          <option value='硬件问题'>麦克风有问题</option>
          <option value='网络问题'>网络问题(暂时不要选这个, 还没有模板)</option>
          <option value='上课过程中不受控制，一直玩游戏(戒除游戏瘾)'>上课过程中不受控制</option>
        </select>
      </DataInput>
      <DataInput title='老师建议'>
        <select name='suggestion' value={this.state.suggestion} onChange={this.handleInputChange}>
          <option value='课后复习'>课后复习</option>
          <option value='课后练习表达'>课后练习表达</option>
          <option value='课后作业'>课后作业(不建议使用)</option>
        </select>
      </DataInput>
      <DataInput title='总结反思'>
        <input placeholder='本堂课存在的问题, 对自己的建议' value={this.state.summary} name='summary' onChange={this.handleInputChange} style={{ width: '90%' }} />
      </DataInput>
      {/** 生成按钮 */}
      <div className='btn' onClick={this.onSpawnClick}>
        生成反馈
      </div>
      <ResultArea basicInfo={this.state.basicInfo} head={this.state.head} onChangeHead={this.handleResultInputChange} result={this.state.result} onChangeTextarea={this.handleResultInputChange} summary={this.state.summary} />
    </div>);
  }
}

// 下面是模板

export function getHeadInfo(info, course) {
  let result = `# ${info.name} ${info.account} ${info.consultant} ${course}\n`;
  return result;
}
export function getBasicInfo(name, course, starCount, knowledge) {
  if (course === 'M-拯救编程猫' || course === 'S-拯救编程猫') {
    course = '拯救编程猫';
  }
  let star = '';
  for (let i = 0; i < starCount; i++) {
    star += '⭐';
  }
  let result = `【课堂名称】 ${course}
【整体表现】 ${star}
【课堂知识】 ${name}通过本节课的学习，掌握了以下知识点：${knowledge.join(';')}。\n`
  return result;
}
  
export function getClassInfo(name, interactive, future) {
  let interactiveText = '';
  let futureText = '';
  switch(interactive) {
    case '交流积极': 
      interactiveText = `${name}今天在课堂上跟老师的沟通交流顺畅，表达清晰，能够大胆说出自己的想法。`;
      break;
    case '交流慢热': 
      interactiveText = `${name}今天在课堂上课程开始的时候比较腼腆，但随着课堂推进，跟老师的沟通就积极了许多。`;
      break;
    case '交流被动': 
      interactiveText = `${name}今天在课堂上比较腼腆，但是也能紧跟老师的思路，在引导下完成整个作品的探索。`;
      break;
    default:
      break;
  }

  switch(future) {
    case '有趣/学科挂钩':
      futureText = `通过学习编程，每节课${name}不仅能制作出有趣的作品，还能收获满满的知识；并且可以提前学习高年级数学、物理等有关的知识，为未来的升学提供加分项。`;
      break;
    case '培养逻辑思维/制作游戏':
      futureText = `在上课的过程中培养${name}反复分析-实践的动手习惯，锻炼解决问题的编程逻辑思维。经过一段时间的学习，你也可以独立创作出逻辑严谨的作品啦~例如愤怒的小鸟、水果忍者等。`;
      break;
    case '锻炼孩子能力':
      futureText = `通过项目式教学法，可以锻炼${name}分析问题和解决问题的思想和方法；并以课上整合知识点完成作品的方式，培养${name}整合资源完成复杂项目的能力，从被动的学习者转变为学习的主人。`;
      break;
    default:
      break;
  }
  let result = `【课堂情况】 ${interactiveText}${futureText}\n`;
  return result;
}
  
export function getTeacherHope(name, hope) {
  let hopeText = '';
  switch(hope) {
    case '粗心（提示后能独立修改）':
      hopeText = `老师在给${name}上课的过程中，发现你有一点点粗心呢~但是在提示下能够快速定位到自己的错误点，然后加以修改，说明逻辑和理解方面还是很清晰，如果能够再细心一点就更加完美啦！以后不管是学习还是生活上，都要细心地观察和对待哦~`;
      break;
    case '粗心（不能独立完成修改）':
      hopeText = `老师在给${name}上课的过程中，发现你有一点点粗心呢~每次搭建积木后，尝试运行作品查看效果，能够帮助我们快速定位错误点，养成查错、改错的好习惯哦~所有以后不管是学习还是生活上，都要细心地观察和对待哦~`;
      break;
    case '思维跳跃':
      hopeText = `${name}的整体逻辑思维比较强，而且有很多自己的想法，会坚持自己的创意，不拘泥于示例作品的做法，这种创新精神非常棒，继续保持哦！但是在创新的过程中，还是会比较心急，思维太跳跃，想到就做，如果跟老师多沟通一些会更好哦，这样我们才能一起更好的掌握知识。`;
      break;
    case '逻辑较差':
      hopeText = `老师发现${name}在上课的过程中，有很多灵感和创意，但是还不知道要怎么实现~ 那么通过学习编程，${name}能给把零散的知识点加以整合，学会自己理顺思路，强化逻辑思维，然后制作出完整的作品。老师非常期待能够跟你一起实现你的奇思妙想哦~`;
      break;
    case '表达不清晰':
      hopeText = `老师发现在让${name}讲解作品原理的过程中，你的表达还不够清晰，需要再多加练习，能清晰表达出来的知识，才是真的学透吃透。课后可以尝试讲解给爸爸妈妈或者同学听哦~`;
      break;
    case '浮躁':
      hopeText = `老师发现${name}是一有想法就要马上动手去做的，是个行动派哦～但是这样子做的话，很有可能会败在一些细节上。所以老师给你的建议是，做作品的过程中，要保持不骄不躁的状态，从最简单的积木开始做起，慢慢地在基础任务上一步步地堆砌积木。`;
      break;
    case '被动':
      hopeText = `${name}课上非常配合老师，会紧跟老师的思路完成作品，老师希望下次上课你可以大胆说出自己想要的效果，并且可以尝试利用积木来实现。探究精神在编程学习中是很重要的哦，勇于创造，我们才能做出更多更好的作品哦。`;
      break;
    case '胆怯':
      hopeText = `学习就是一个不断试错的过程，不要害怕错误，要学会在错误中吸取经验。${name}可以在创作过程中多多尝试哦。`;
      break;
    case '硬件问题':
      hopeText = `今天因为${name}的设备无法正常运行，所以老师没有办法听到你的想法呢~ 但是老师相信你是个创新能力很强的孩子，希望下次上课前能把麦克风的问题解决好，老师期待能够听到你的奇思妙想，然后跟你一起实现哦！`;
      break;
    case '网络问题':
      hopeText = ``;
      break;
    case '上课过程中不受控制，一直玩游戏(戒除游戏瘾)':
      hopeText = `老师发现${name}非常喜欢游戏呢，那么今天我们体验了如何制作游戏，并为游戏制定规则，这样子是不是会让你更有成就感呢？通过学习编程，我们以后都可以在自己创作的游戏里面制定规则啦~老师非常期待能玩到你亲手做的游戏呢！`;
      break;
    default:
      break;
  }
  let result = `【老师寄语】 ${hopeText}\n`;
  return result;
}
  
export function getSuggestion(name, suggestion) {
  let suggestionText = '';
  switch(suggestion) {
    case '课后复习':
      suggestionText = `最后建议${name}课后一定要通过编程猫客户端→我的课程→任务讲解进行复习，课上做过的作品，也可以把积木删掉，重新理清逻辑，再拼接一次。这样子才能够把基础打扎实，以后才能做出更加优秀的作品哦！温故而知新，能让我们进步得更快哦~加油！`;
      break;
    case '课后练习表达':
      suggestionText = `最后建议${name}多留意经常出现的积木，每次运用之后都对这些常用积木进行思考及总结。觉得思路不清晰的时候，可以尝试先用纸笔记录下来，理清思路之后再尝试去讲解给别人听（可以教爸爸妈妈和朋友哦~），在讲解之后，你就会发现自己真正对这个知识点掌握透彻啦。加油！`;
      break;
    case '课后作业':
      suggestionText = `这节课的作业老师已经在课上发给${name}啦，${name}课后认真完成，遇到不懂的地方可以来询问课程老师哦。完成之后可以把作品通过拍照或者扫描二维码的方式分享给老师欣赏哦。加油！`;
      break;
    default:
      break;
  }
  let result = `【老师建议】 ${suggestionText}`;
  return result;
}