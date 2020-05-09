import React from "react";

interface IProps {
  node: CFMediaNodeMixin;
}

class NodeImage extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    const { node } = this.props;
    return <div>
      {node.images.map(image => {
        return <img src={image.large}
          style={{ width: '300px' }}
          key={image.id}
          title={image.originName}
        ></img>
      })}
    </div>
  }
}

export default NodeImage;

