import React from "react";
import { T, LANG } from "../../../utils/i18n";
interface IProps {
  node: CFQuestion;
}
/**
 * 无视图节点实时预览时的的渲染组件
 */
class NoView extends React.Component<IProps> {
  render(): JSX.Element {
    return (
      <div className="flex flex-col items-center text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
        >
          <g
            className="non-scaling-stroke"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
          >
            <polyline points="2 10 2 2 10 2"></polyline>
            <polyline points="22 2 30 2 30 10"></polyline>
            <polyline points="30 22 30 30 22 30"></polyline>
            <polyline points="10 30 2 30 2 22"></polyline>
            <rect x="10" y="12" width="12" height="8"></rect>
          </g>
        </svg>
        <h5 className="mt-4">{T(LANG.preview.noView)}</h5>
      </div>
    );
  }
}

export default NoView;
