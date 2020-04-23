import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

interface IProps extends RouteComponentProps {
  model: CFState;
  requestModel(): Promise<void>;
}
function getNodeCom(type: string): any {
  const map = {
    choice: window.CF_UI_PLUGIN_CLUSTER.ChoiceBasic,
    range: window.CF_UI_PLUGIN_CLUSTER.RangeBasic,
    rating: window.CF_UI_PLUGIN_CLUSTER.RatingBasic,
    'short-text': window.CF_UI_PLUGIN_CLUSTER.ShortTextBasic,
    weight: window.CF_UI_PLUGIN_CLUSTER.WeightBasic,
  }
  return map[type];
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
        const NodeCom = getNodeCom(node.quesType);
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
          {<NodeCom node={node} handler={model.handleEvents} />}
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