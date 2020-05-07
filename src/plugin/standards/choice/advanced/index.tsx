import React from "react";

interface IProps extends IQuesComBaseProps {
  node: CFSelectQuestion;
}

class ChoiceAdvanced extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    return <div className='advanced-choice'>
      <span>ChoiceAdvanced 空容器</span>
    </div>
  }
}
export default ChoiceAdvanced;

