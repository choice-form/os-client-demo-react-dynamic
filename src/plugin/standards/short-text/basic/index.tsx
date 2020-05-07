import React from 'react';
import NodeHead from '../../../partials/node-head';

interface IProps extends IQuesComBaseProps {
  node: CFFillQuestion;
}

class ShortTextBasic extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    const { node, handler, theme } = this.props;
    return <div className='basic-short-text'>
      <span>ShortTextBasic</span>
      <NodeHead node={node} theme={theme} />
      {node.options.map(opt => {
        return <div key={opt.renderId}>
          <span>{opt.text}</span>
          <input type="text"
            value={opt.value}
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value;
              handler.handleOptionInput(value, opt, node)
            }} />
          <span>{opt.value}</span>
          <span className='option-error'>{opt.errorMessage}</span>
        </div>
      })}
    </div>
  }
}

export default ShortTextBasic;