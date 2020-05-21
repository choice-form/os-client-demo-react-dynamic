import React from "react";

interface IProps {
  node: CFQuestion;
}

class NodeImage extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    //
    const node = this.props.node as CFChoiceQuestion;
    return <div>
      {node.images.map((image, index) => {
        return <img src={image.large}
          width='300'
          key={index}
          title={image.originName}
        ></img>
      })}
    </div>
  }
}

export default NodeImage;

