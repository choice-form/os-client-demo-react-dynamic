import React from 'react';
import NodeHead from '../../../partials/node-head';

interface IProps {
  handler: CFUIEventHandler;
  node: CFFillQuestion;
}

class ShortTextAdvanced extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    const { node, handler } = this.props;
    return <div className='advanced-short-text'>
      <span>ShortTextAdvanced</span>
      <NodeHead node={node} />
      <h1>{node.title}</h1>
      <p>{node.description}</p>
      <div>{node.typeName}</div>
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

export default ShortTextAdvanced;