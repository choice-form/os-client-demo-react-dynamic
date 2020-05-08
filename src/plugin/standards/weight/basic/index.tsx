import React from "react";
import NodeHead from "../../../partials/components/basic/node-head";

interface IProps extends IQuesComBaseProps {
  node: CFWeightQuestion;
}

class WeightBasic extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    const { node, handler, theme } = this.props;
    return <div className='basic-weight'>
      <span>WeightBasic</span>
      <NodeHead node={node} theme={theme} />
      <div className='weight-indicator'>
        {node.options.map(opt => {
          const ratio = Number(opt.value) * 100 / node.weightTotal + '%';
          return <span style={{
            width: ratio,
            background: opt.color,
          }} key={opt.renderId}></span>
        })}
      </div>
      {node.options.map(opt => {
        return <div key={opt.renderId}>
          <span className='wegith-opt-color' style={{
            backgroundColor: opt.color,
          }}></span>
          <span>{opt.text}</span>
          <input type="range"
            min='0'
            max={opt.maxValue}
            step='1'
            value={opt.value}
            onChange={(e) => {
              const value = (e.target as HTMLInputElement).value;
              handler.handleOptionInput(value, opt, node);
            }} />
          <span>{opt.value || 0}</span>
        </div>
      })
      }
    </div >
  }
}

export default WeightBasic;