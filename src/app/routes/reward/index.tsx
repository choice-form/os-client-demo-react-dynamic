import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Core } from '@choiceform/os-client-core';

interface IProps extends RouteComponentProps {
  /**
   * 核心对象
   */
  core: CFCore
}

interface IState {
  model: CFRewardModel;
}

/**
 * 奖励页面路由组件
 */
class Reward extends React.Component<IProps, IState> {
  /**
   * 是否已经进行了首次渲染
   */
  private initialized: boolean;
  /**
   * 构造函数
   * @param props 传入的属性
   */
  constructor(props: IProps) {
    super(props);
    this.init();
  }
  /**
   * 初始化工作
   */
  async init(): Promise<void> {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    const model = await this.props.core.fetchReward();
    this.setState({ model })
    // 稍后初始化微信分享
    setTimeout(() => {
      Core.prepareWxShare();
    }, 500);
  }
  /**
   * 渲染
   */
  render(): JSX.Element {
    const { model } = this.state;
    // 数据还没准备好时不渲染
    if (!model) {
      return null;
    }
    // 交给动态模板渲染,奖励页面和节点不同,直接传入整个model
    const RewardComponent = model.template.component;
    return <RewardComponent model={model} />
  }
}

export default Reward;