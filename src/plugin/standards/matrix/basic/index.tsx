import React from "react";
import NodeHead from "../../../partials/components/basic/node-head";
import NodeBody from "../../../partials/components/basic/node-body";
import OtherOptions from "../../../partials/components/basic/other-options";
import Icon from "../../../../utils/ui-components/icon";
import classnames from "classnames";

interface IProps extends IQuesComBaseProps {
  node: CFMatrixQuestion;
}

class MatrixBasic extends React.Component<IProps> {
  render(): JSX.Element {
    const { node, theme, handler } = this.props;
    return (
      <div className="basic-matrix">
        {/* 调用共通组建渲染头部 */}
        <NodeHead node={node} theme={theme} />
        {/* 渲染选项 */}
        <NodeBody theme={theme}>
          <table className="w-full m-1 table-fixed">
            <thead>
              <tr>
                <th></th>
                {node.renderOptionsX.map((opt) => {
                  return (
                    <th
                      className="p-2 text-xs align-bottom bg-gray-300 border border-gray-500"
                      key={opt.uuid}
                      dangerouslySetInnerHTML={{ __html: opt.text }}
                    ></th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {node.matrix.map((row, index) => {
                return (
                  <tr key={index}>
                    <td
                      className="p-2 text-xs bg-gray-300 border border-gray-500"
                      dangerouslySetInnerHTML={{
                        __html: node.renderOptionsY[index].text,
                      }}
                    ></td>
                    {row.map((cell) => {
                      return (
                        <td
                          key={cell.uuid}
                          className="p-2 border border-gray-500 odd:bg-gray-300"
                        >
                          <label
                            className={classnames(
                              "relative h-full flex justify-center items-center p-2 rounded",
                              "focus:outline-none focus-within:shadow-outline",
                              { "text-indigo-600": cell.selected },
                              cell.disabled
                                ? "cursor-not-allowed"
                                : "hover:bg-gray-200 cursor-pointer"
                            )}
                            htmlFor={cell.uuid}
                            role={node.selectType}
                          >
                            <input
                              className="absolute inset-y-0 left-0 w-full h-4 my-auto opacity-0 pointer-events-none"
                              tabIndex={0}
                              id={cell.uuid}
                              type={node.selectType}
                              checked={cell.selected}
                              onClick={() =>
                                !cell.disabled &&
                                handler.handleOptionClick(cell, node)
                              }
                              disabled={cell.disabled || node.readonly}
                            />
                            {cell.selected ? (
                              <Icon
                                className={classnames(
                                  "flex-shrink-0 inline align-middle",
                                  { "text-gray-300": cell.disabled }
                                )}
                                icon={
                                  node.selectType === "checkbox"
                                    ? "glyph-checkbox-checked-16"
                                    : "glyph-radio-checked-16"
                                }
                              />
                            ) : (
                              <Icon
                                className={classnames(
                                  "flex-shrink-0 inline align-middle",
                                  cell.disabled
                                    ? "text-gray-300"
                                    : "text-gray-500"
                                )}
                                icon={
                                  node.selectType === "checkbox"
                                    ? "outline-checkbox-16"
                                    : "outline-radio-16"
                                }
                              />
                            )}
                          </label>
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </NodeBody>
        {/* 其他选项   */}
        <OtherOptions node={node} theme={theme} handler={handler} />
      </div>
    );
  }
}

export default MatrixBasic;
