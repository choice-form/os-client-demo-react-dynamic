import React from "react";

interface IProps {
  time: string;
}
/**
 * 计时器组件
 */
class Timer extends React.Component<IProps> {
  render(): JSX.Element {
    return (
      <div className="flex items-center text-gray-600">{this.props.time}</div>
    );
  }
}

export default Timer;
