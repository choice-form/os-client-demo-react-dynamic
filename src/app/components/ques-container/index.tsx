import React from 'react';
/**
 * 问题页面渲染参数
 */
interface IQuestionsRenderData {
  /**
   * 事件回调处理器
   */
  handleEvents: CFUIEventHandler,
  /**
   * 下一题按钮文字
   */
  nextButton: string;
  /**
   * 节点列表
   */
  nodes: CFQuestion[],
  /**
   * 上一题按钮文字
   */
  prevButton: string;
  /**
   * 主题
   */
  theme: CFTheme;
}

interface IProps {
  data: IQuestionsRenderData;
}

type INodeCom = typeof React.Component;

class QuesContainer extends React.Component<IProps> {
  render(): JSX.Element {
    const { data } = this.props;
    return <div>
      {data.nodes.map(node => {
        // 节点真实内容交给动态组件渲染
        const NodeComponent = node.template.component as INodeCom;
        return <div key={node.renderId}
          id={node.renderId}
          className='question-rect'>
          <span className='question-error'>
            {node.errorMessage}
          </span>
          <NodeComponent node={node}
            handler={data.handleEvents} theme={data.theme} />
        </div>
      })}
      {this.renderButton()}
    </div>
  }

  renderButton(): JSX.Element {
    const { data } = this.props;
    const { nextButton, prevButton, handleEvents } = data;
    return <div>
      {prevButton ? <button onClick={() => {
        handleEvents.handlePrevClick();
      }}>{prevButton}</button> : ''}
      {nextButton ? <button onClick={() => {
        handleEvents.handleNextClick(true);
      }}>{nextButton}</button> : ''}
    </div>
  }
}

export default QuesContainer;