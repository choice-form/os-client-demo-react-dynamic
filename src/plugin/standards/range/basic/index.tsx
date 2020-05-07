import React from "react";
import NodeHead from "../../../partials/basic/node-head";

interface IProps extends IQuesComBaseProps {
  node: CFValueMarkQuestion;
}

class RangeBasic extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    const { node, handler, theme } = this.props;
    return <div>
      <span>RangeBasic</span>
      <NodeHead node={node} theme={theme} />
      {node.options.map(opt => {
        return <div key={opt.renderId}>
          <span>{opt.text}</span>
          <input type="range"
            min={opt.minValue}
            max={opt.maxValue}
            step={opt.step}
            value={opt.value}
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value;
              handler.handleOptionInput(value, opt, node);
            }} />
          <span>{opt.value || 0}</span>
        </div>
      })}
    </div>
  }
}

export default RangeBasic;