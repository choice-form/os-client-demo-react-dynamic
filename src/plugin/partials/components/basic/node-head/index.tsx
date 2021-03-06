import React from "react";
import NodeImage from '../node-image';
import NodeVideo from '../node-video';

interface IProps {
  node: CFQuestion;
  theme: CFTheme;
}



class NodeHead extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    const { node } = this.props;
    return <div className='node-head'>
      <NodeVideo node={node} />
      <NodeImage node={node} />
      <h1 dangerouslySetInnerHTML={{ __html: node.title }}></h1>
      <p dangerouslySetInnerHTML={{ __html: node.description }}></p>
      <div>{node.typeName}</div>
    </div>
  }
}

export default NodeHead;

