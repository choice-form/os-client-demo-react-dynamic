import React from "react";

interface IProps extends IQuesComBaseProps {
  node: CFChoiceQuestion;
}

class ChoiceBasic extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    return <div>
      <span>空容器 未实现</span>
    </div>
  }
}
export default ChoiceBasic;

