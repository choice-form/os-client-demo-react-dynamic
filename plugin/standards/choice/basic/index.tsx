import React from "react";
import NodeHead from '../../../partials/node-head';
interface IProps {
  handler: CFUIEventHandler;
  node: CFSelectQuestion;
}

class ChoiceBasic extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    const { node, handler } = this.props;
    return <div>
      <span>ChoiceBasic</span>
      <NodeHead node={node} />
      {node.options.map(opt => {
        return <div key={opt.renderId}
          onClick={() => handler.handleOptionClick(opt, node)}>
          <span style={{
            backgroundColor: opt.selected ? 'red' : undefined
          }}>
            {opt.text}
          </span>
        </div>
      })}
    </div>
  }
}

export default ChoiceBasic;
