import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Core } from '@choiceform/os-client-core';

interface IProps extends RouteComponentProps {
  model: CFRewardModel;
  requestModel(): Promise<void>;
}

class Reward extends React.Component<IProps> {
  /**
   * 是否已经进行了首次渲染
   */
  private initialized: boolean;
  /**
   * 初始化工作
   */
  async init(): Promise<void> {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    await this.props.requestModel();
    // 稍后初始化微信分享
    setTimeout(() => {
      Core.prepareWxShare();
    }, 500);
  }
  /**
   * 渲染
   */
  render(): JSX.Element {
    if (!this.initialized) {
      this.initialized = true;
      this.init();
    }
    const { model } = this.props;
    if (!model) {
      return <div>Loading</div>
    }
    // 交给动态模板渲染,奖励页面和节点不同,直接传入整个model
    const RewardComponent = model.template.component;
    return <RewardComponent model={model} />
  }
}

export default Reward;