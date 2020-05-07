import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Core } from '@choiceform/os-client-core'
import { renderQuestions } from '../../templates/questions';
import { renderNoViewNode } from '../../templates/no-view';

interface IProps extends RouteComponentProps {
  model: CFRealTime;
}

class Themes extends React.Component<IProps> {
  /**
   * 是否已经初始化
   */
  private initialized: boolean;
  /**
   * 初始化
   */
  init(): void {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    Core.initRealtimePreview();
  }
  /**
   * 渲染
   */
  render(): JSX.Element {
    if (!this.initialized) {
      this.init();
    }
    const { data } = this.props.model;
    if (!data || !data.nodes) {
      return null;
    }
    // 开始页面和奖励页面的预览特殊处理
    if (data.isStart || data.isGift) {
      const DynamicComponent = data.template.component;
      return <div>
        <DynamicComponent model={data} />
      </div>
      // 其他和正常题目一样
    } else {
      // 无视图节点的预览单独处理
      const node = data.nodes[0];
      console.log(node.quesType, node.noView)
      if (node.noView) {
        return renderNoViewNode(node);
      }
      return renderQuestions(data);
    }
  }
}

export default Themes;