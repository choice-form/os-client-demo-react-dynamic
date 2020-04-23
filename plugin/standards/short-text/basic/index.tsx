// import React from 'react';
const React = window.React;

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