import React from 'react';
import './App.css';
import { TitleBar } from './TitleBar';
import { Spawner } from './Spawner';

/**
 * 反馈生成器
 */
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      spawners: []
    }
    this.spawnerCount = 0;
  }
  
  onUnload = e => {
    e.returnValue = "刷新后已填写模板将被清除";
    return "刷新后已填写模板将被清除";
  }

  componentDidMount() {
    window.addEventListener("beforeunload", this.onUnload);
  }

  componentWillUnmount() {
      window.removeEventListener("beforeunload", this.onUnload);
  }
  
  newSpawner = ()=> {
    let spawners = this.state.spawners.slice();
    spawners.push(this.spawnerCount++);
    this.setState({
      spawners: spawners
    });
  }

  render() {
    return (
      <div className='root'>
        <TitleBar onNewSpawner={this.newSpawner}/>
        <div className='main'>
          {
            // 这个地方可以直接push, 但我觉得可能以后会修改一些元素
            this.state.spawners.map(spawner=>(<Spawner key={spawner}></Spawner>))
          }
        </div>
      </div>
    );
  }
}


