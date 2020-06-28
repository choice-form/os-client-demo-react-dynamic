import React from "react";

interface IProps extends IQuesComBaseProps {
  node: CFRangeQuestion;
}

class RangeBasic extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    return <div>
      <span>空容器 未实现</span>
    </div>
  }
}

export default RangeBasic;