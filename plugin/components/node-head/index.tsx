import React from "react";

interface IProps {
  node: CFQuestion;
}

class NodeHead extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    const { node } = this.props;
    return <div>
      <h1>{node.title + 'hehe'}</h1>
      <p>{node.description}</p>
      <div>{node.typeName}</div>
    </div>
  }
}

export default NodeHead;

