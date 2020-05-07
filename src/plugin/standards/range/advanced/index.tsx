import React from "react";

interface IProps extends IQuesComBaseProps {
  handler: CFUIEventHandler;
  node: CFValueMarkQuestion;
}

class RangeAdvanced extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    return <div>
      <span>RangeAdvanced 空容器</span>
    </div>
  }
}

export default RangeAdvanced;