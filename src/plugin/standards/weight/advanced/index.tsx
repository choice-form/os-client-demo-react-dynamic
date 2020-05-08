import React from "react";

interface IProps extends IQuesComBaseProps {
  node: CFWeightQuestion;
}

class WeightAdvanced extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    return <div className='advanced-weight'>
      <span>WeightAdvanced 空容器 未实现</span>
    </div >
  }
}

export default WeightAdvanced;