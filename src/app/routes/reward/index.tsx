import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps {
  model: CFRewardModel;
  requestModel(): void;
}

class Reward extends React.Component<IProps> {
  /**
   * 是否已经进行了首次渲染
   */
  private initialized: boolean;
  render(): JSX.Element {
    const { model } = this.props;
    if (!this.initialized) {
      this.initialized = true;
      this.props.requestModel()
    }
    if (!model) {
      return <div>Loading</div>
    }
    // 交给动态模板渲染,奖励页面和节点不同,直接传入整个model
    const RewardComponent = model.template.component;
    return <RewardComponent model={model}/>
  }
}

export default Reward;