import React from "react";

interface IProps extends IQuesComBaseProps {
  node: CFChoiceQuestion;
}

class ChoiceAdvanced extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    return <div className='advanced-choice'>
      <span>ChoiceAdvanced 空容器 未实现</span>
    </div>
  }
}
export default ChoiceAdvanced;

