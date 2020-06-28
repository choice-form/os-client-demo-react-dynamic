import React from "react";

interface IProps extends IQuesComBaseProps {
  node: CFRatingQuestion;
}

class RatingBasic extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    return <div>
      空容器 未实现
    </div >
  }
}

export default RatingBasic;