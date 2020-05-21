import React from "react";

interface IProps {
  node: CFQuestion;
}

class NodeVideo extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    const node = this.props.node as CFChoiceQuestion;
    const { video } = node;
    if (!video) {
      return null;
    }
    return <div>
      <video src={video.url} controls></video>
    </div>
  }
}

export default NodeVideo;

