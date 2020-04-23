import React from 'react';
import NodeHead from '../../../partials/node-head';

interface IProps {
  handler: CFUIEventHandler;
  node: CFFillQuestion;
}

class ShortTextBasic extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    const { node, handler } = this.props;
    return <div>
      <span>ShortTextBasic</span>
      <NodeHead node={node} />
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
          <span style={{ background: 'red' }}>{opt.errorMessage}</span>
        </div>
      })}
    </div>
  }
}

export default ShortTextBasic;
window.CF_UI_PLUGIN_CLUSTER.ShortTextBasic = ShortTextBasic;