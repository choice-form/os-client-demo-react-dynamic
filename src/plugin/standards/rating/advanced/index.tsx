import React from "react";

interface IProps extends IQuesComBaseProps {
  node: CFRatingQuestion;
}

class RatingAdvanced extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    return <div className='advanced-rating'>
      <span>RatingAdvanced 空容器 未实现</span>
    </div >
  }
}

export default RatingAdvanced;