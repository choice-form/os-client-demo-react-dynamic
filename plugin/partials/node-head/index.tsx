import React from "react";
import NodeImage from '../node-image';
import NodeVideo from '../node-video';

interface IProps {
  node: CFQuestion;
}



class NodeHead extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    const node = this.props.node as CFSelectQuestion;
    return <div>
      <NodeVideo node={node} />
      <NodeImage node={node} />
      <h1>{node.title + 'heheda'}</h1>
      <p>{node.description}</p>
      <div>{node.typeName}</div>
    </div>
  }
}

export default NodeHead;

