import React from "react";
import NodeHead from "../../../partials/components/basic/node-head";
import NodeBody from "../../../partials/components/basic/node-body";
import OtherOptions from "../../../partials/components/basic/other-options";

interface IProps extends IQuesComBaseProps {
  node: CFDropdownQuestion;
}

/**
 * 菜单题组件
 */
class DropdownBasic extends React.Component<IProps> {
  /**
   * 处理点击变化
   * @param value 最后点击的选项文字
   */
  handleChange(value: string): void {
    const { node, handler } = this.props;
    // 找到对应选项序号
    const index = this.props.node.options.map((opt) => opt.text).indexOf(value);
    handler.handleMenuClick(index, node);
  }
  /**
   * 渲染
   */
  render(): JSX.Element {
    const { node, theme, handler } = this.props;
    const selectedValues = node.options
      .filter((opt) => opt.selected)
      .map((opt) => opt.text);
    const bindValue = node.multiple ? selectedValues : selectedValues[0] || '';
    return (
      <div className="basic-dropdown">
        <NodeHead node={node} theme={theme} />
        <NodeBody theme={theme}>
          <div className="relative flex-grow m-1">
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
              >
                <path
                  d="M7 7l3-3 3 3m0 6l-3 3-3-3"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <select
              disabled={node.readonly}
              className="w-full py-2 pl-3 pr-10 text-sm leading-5 text-left bg-white border border-gray-300 rounded-md appearance-none cursor-default focus:outline-none focus:shadow-outline focus:border-blue-300"
              multiple={node.multiple}
              value={bindValue}
              onChange={(e) => this.handleChange(e.target.value)}
            >
              <option hidden={true} value={node.placeholder}>
                {node.placeholder}
              </option>
              {node.options.map((option) => {
                return (
                  <option key={option.text} value={option.text}>
                    {option.text}
                  </option>
                );
              })}
            </select>
          </div>
        </NodeBody>
        <OtherOptions node={node} theme={theme} handler={handler} />
      </div>
    );
  }
}

export default DropdownBasic;
