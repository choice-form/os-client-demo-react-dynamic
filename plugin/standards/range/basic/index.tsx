import React from "react";

interface IProps {
  handler: CFUIEventHandler;
  node: CFMarkQuestion;
}

class RangeBasic extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    const { node, handler } = this.props;
    return <div>
      <span>RangeBasic</span>
      {node.images.map(image => {
        return <img src={image.large}
          key={image.id}
          title={image.originName}
        ></img>
      })}
      <h1>{node.title}</h1>
      <p>{node.description}</p>
      <div>{node.typeName}</div>
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

window.CF_UI_PLUGIN_CLUSTER.RangeBasic = RangeBasic;