import React from "react";

interface IProps {
  progress: number;
}
/**
 * 进度条组件
 */
class ProgressBar extends React.Component<IProps> {
  render(): JSX.Element {
    return (
      <div className="flex items-center w-full mb-4 mr-auto ot:w-240">
        <div className="flex-grow h-1 bg-gray-100 rounded-sm">
          <div
            className="h-1 bg-indigo-600 rounded-sm"
            style={{ width: this.props.progress + "%" }}
          ></div>
        </div>
        <span className="ml-2 text-xs text-gray-600">
          {this.props.progress + "%"}
        </span>
      </div>
    );
  }
}

export default ProgressBar;
