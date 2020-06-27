import React from "react";
import NodeHead from "../../../partials/components/basic/node-head";
import { T, LANG } from "../../../../utils/i18n";
import NodeBody from "../../../partials/components/basic/node-body";
import { locate } from "../../../partials/modules/locator";

interface IProps extends IQuesComBaseProps {
  node: CFLocateQuestion;
}

interface IState {
  status: string;
}

class LocationBasic extends React.Component<IProps, IState> {
  state: IState = { status: T(LANG.locate.click) };
  /**
   * 定位
   */
  locate(): void {
    this.setState({
      status: T(LANG.locate.doing),
    });
    locate().then((result) => {
      let status = "";
      if (result.type === "success") {
        status = T(LANG.locate.success);
        const { node, handler } = this.props;
        handler.handleAutoLocate(result.data, node);
      } else if (result.type === "failure") {
        status = T(LANG.locate.failed);
      } else {
        status = T(LANG.locate.timeout);
      }
      this.setState({ status });
    });
  }
  render(): JSX.Element {
    const { node, theme } = this.props;
    return (
      <div>
        {/* 调用共通组建渲染头部 */}
        <NodeHead node={node} theme={theme} />
        {/* 主区域 */}
        <NodeBody theme={theme}>
          {/* 定位按钮 */}
          <button
            className="flex items-center px-4 py-2 m-1 text-sm font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:shadow-outline focus:border-blue-300 active:text-gray-800 active:bg-gray-50"
            onClick={() => this.locate()}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <g fill="currentColor">
                <path d="M15.3,4l-14-4C0.5-0.2-0.2,0.5,0,1.3l4,14c0.3,0.9,1.5,1,1.9,0.1l2.8-6.6l6.6-2.8C16.3,5.5,16.2,4.3,15.3,4z "></path>
              </g>
            </svg>
            <span className="ml-2">{this.state.status}</span>
          </button>
          {/* 显示定位结果 */}
          <div>{node.value}</div>
        </NodeBody>
        {/* 定位题的选项和其他选项时不需要渲染的 */}
      </div>
    );
  }
}

export default LocationBasic;
