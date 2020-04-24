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
      video
    </div>
  }
}

export default NodeVideo;

