import React from 'react';

interface IProps {
  handler: CFUIEventHandler;
  node: CFSelectQuestion;
}

class ChoiceAdvanced extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    const { node, handler } = this.props;
    return <div>
      <span>ChoiceAdvanced</span>
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
        return <div key={opt.renderId}
          onClick={() => handler.handleOptionClick(opt, node)}>
          <span style={{
            backgroundColor: opt.selected ? 'red' : undefined
          }}>
            {opt.text}
          </span>
        </div>
      })}
    </div>
  }
}

export default ChoiceAdvanced;

