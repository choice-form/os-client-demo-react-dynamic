import React from "react";
import NodeHead from '../../../partials/basic/node-head';
interface IProps extends IQuesComBaseProps {
  node: CFSelectQuestion;
}

class ChoiceBasic extends React.Component<IProps> {
  static style: string = require('./style.scss');
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    const { node, handler, theme } = this.props;
    return <div className='basic-choice'>
      <NodeHead node={node} theme={theme} />
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
export default ChoiceBasic;
