import React from "react";

interface IProps {
  node: CFMediaNodeMixin;
}

class NodeVideo extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    return <div>
      <video src={this.props.node.video.url} controls></video>
    </div>
  }
}

export default NodeVideo;

