import React from "react";
import NodeHead from "../../../partials/components/basic/node-head";
import NodeBody from "../../../partials/components/basic/node-body";
import OtherOptions from "../../../partials/components/basic/other-options";

interface IProps extends IQuesComBaseProps {
  node: CFRangeQuestion;
}

class RangeBasic extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    const { node, handler, theme } = this.props;
    return <div>
      <NodeHead node={node} theme={theme} />
      <NodeBody theme={theme}>
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
      </NodeBody>
      <OtherOptions node={node} theme={theme} handler={handler} />
    </div>
  }
}

export default RangeBasic;