import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { getNodeComponent } from '../../nodes';

interface IProps extends RouteComponentProps {
  model: CFState;
  requestModel(): Promise<void>;
}

class Questions extends React.Component<IProps> {
  private initialized: boolean;
  render(): JSX.Element {
    const { model } = this.props;
    // 初始情况下检查数据
    if (!this.initialized) {
      this.initialized = true;
      // 如果没有数据,自己要求一下数据
      if (!model) {
        this.props.requestModel();
      }
    }
    if (!model) {
      return <div></div>;
    }
    return <div>
      {model.nodes.map(node => {
        const NodeCom = getNodeComponent(node.quesType);
        return <div key={node.renderId}
          style={{ margin: '10px', padding: '10px', border: '1px solid black' }}>
          <NodeCom node={node} handler={model.handleEvents} />
        </div>

      })}
      {this.renderButton()}
    </div>
  }

  /**
   * 渲染单页组按钮
   */
  renderButton(): JSX.Element {
    const { nextButton, prevButton, handleEvents } = this.props.model;
    return <div>
      {prevButton ? <button onClick={() => {
        handleEvents.handlePrevClick();
      }}>{prevButton}</button> : ''}
      {nextButton ? <button onClick={() => {
        handleEvents.handleNextClick();
      }}>{nextButton}</button> : ''}
    </div>
  }
}

export default Questions;