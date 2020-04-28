import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Util } from '@choiceform/os-client-core'

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
    Util.initPreviewUploader();
    Util.sendMessage({
      name: 'init_preview',
    });
    document.documentElement.setAttribute('class',
      'ios iphone mobile portrait safari -9');
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
    return <div>
      {data.nodes.map(node => {
        // 节点真实内容交给动态组件渲染
        const NodeComponent = node.template.component;
        return <div key={node.renderId} id={node.renderId}>
          <NodeComponent node={node} handler={data.handleEvents} />
        </div>
      })}
      {this.renderButton()}
    </div>
  }
  /**
   * 渲染单页组按钮
   */
  renderButton(): JSX.Element {
    const { nextButton, prevButton } = this.props.model.data;
    return <div>
      {prevButton ? <button>{prevButton}</button> : null}
      {nextButton ? <button>{nextButton}</button> : null}
    </div>
  }
}

export default Themes;