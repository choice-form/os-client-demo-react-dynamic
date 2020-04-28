import React from "react";

interface IProps {
  node: CFMediaNodeMixin;
}

class NodeVideo extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    const { video } = this.props.node;
    if (!video) {
      return null;
    }
    return <div>
      <video src={video.url} controls></video>
    </div>
  }
}

export default NodeVideo;

