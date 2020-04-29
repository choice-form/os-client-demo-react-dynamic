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
}


/**
 * 渲染向前向后按钮
 */
function renderButton(data: IQuestionsRenderData): JSX.Element {
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

/**
 * 渲染答题页面
 * 把这个抽出来,是应为正式答题页面和实时预览页面都要用到这一部分
 * @param data 数据源
 */
export function renderQuestions(
  data: IQuestionsRenderData): JSX.Element {
  return <div>
    {data.nodes.map(node => {
      // 节点真实内容交给动态组件渲染
      const NodeComponent = node.template.component;
      return <div key={node.renderId} id={node.renderId}
        style={{
          margin: '10px', padding: '10px',
          border: '1px solid black', position: 'relative'
        }}>
        <span style={{
          position: 'absolute',
          top: 0, right: 0, background: 'red'
        }}>
          {node.errorMessage}
        </span>
        <NodeComponent node={node} handler={data.handleEvents} />
      </div>

    })}
    {renderButton(data)}
  </div>
}