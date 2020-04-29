import React from "react";
import NodeHead from '../../../partials/node-head';
import { utilExampleLog } from "../../../../utils/logger";
interface IProps {
  handler: CFUIEventHandler;
  node: CFSelectQuestion;
}

class ChoiceBasic extends React.Component<IProps> {
  static style: string = require('./style.scss');
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    const { node, handler } = this.props;
    return <div className='basic-choice'>
      <span>ChoiceBasic</span>
      <NodeHead node={node} />
      {node.options.map(opt => {
        return <div key={opt.renderId}
          className={'option' + (opt.selected ? ' selected' : '')}
          onClick={() => handler.handleOptionClick(opt, node)}>
          <span>
            {opt.text}
          </span>
        </div>
      })}
    </div>
  }
}
utilExampleLog('basic choice loaded');
export default ChoiceBasic;
