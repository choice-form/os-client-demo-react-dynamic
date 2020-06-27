import React from "react";
import NodeHead from "../../../partials/components/basic/node-head";
import NodeBody from "../../../partials/components/basic/node-body";
import OtherOptions from "../../../partials/components/basic/other-options";
import Icon from "../../../../utils/ui-components/icon";
import classnames from "classnames";
interface IProps extends IQuesComBaseProps {
  node: CFSlideRateQuestion;
}

class SlideRateBasic extends React.Component<IProps> {
  handleRate(value: string, option: CFSlideRateOption): void {
    if (option.value === value) {
      return;
    }
    window.__LIVE_APP__.disableNotify();
    this.props.handler.handleOptionInput(value, option, this.props.node);
    window.__LIVE_APP__.recoverNotify();
  }
  render(): JSX.Element {
    const { node, theme, handler } = this.props;
    return (
      <div className="inverse-slide-rate">
        <NodeHead node={node} theme={theme} />
        <NodeBody theme={theme}>
          <table className="w-full table-fixed">
            <thead>
              <tr>
                <td></td>
                {node.options.map((option) => {
                  return (
                    <td
                      className="px-2 text-xs align-bottom"
                      key={option.renderId}
                      dangerouslySetInnerHTML={{ __html: option.text }}
                    ></td>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {node.rateOptions.map((rate) => {
                return (
                  <tr key={rate.text + rate.value}>
                    <th
                      className="p-2 text-xs text-right"
                      dangerouslySetInnerHTML={{ __html: rate.text }}
                    ></th>
                    {node.options.map((option) => {
                      return (
                        <td key={option.renderId} className="p-1">
                          <label
                            className={
                              "cursor-pointer relative h-full flex justify-center items-center p-2 rounded focus:outline-none hover:bg-gray-200 focus-within:shadow-outline" +
                              (option.value === rate.value
                                ? " text-indigo-600"
                                : " ")
                            }
                            htmlFor={option.renderId + rate.value}
                            role="radio"
                          >
                            <input disabled={node.readonly}
                              className="absolute inset-y-0 left-0 w-full h-4 my-auto opacity-0 pointer-events-none"
                              type="radio"
                              tabIndex={0}
                              id={option.renderId + rate.value}
                              checked={option.value === rate.value}
                              onClick={() =>
                                this.handleRate(rate.value, option)
                              }
                              onChange={() => {
                                /** 保留这个空回调来禁止react报错 */
                              }}
                            />
                            {option.value === rate.value ? (
                              <Icon
                                className={classnames(
                                  "flex-shrink-0 inline align-middle",
                                  { "text-gray-300": node.readonly }
                                )}
                                icon="glyph-radio-checked-16"
                              />
                            ) : (
                                <Icon
                                  className={classnames(
                                    "flex-shrink-0 inline align-middle",
                                    node.readonly
                                      ? "text-gray-300"
                                      : "text-gray-500"
                                  )}
                                  icon="outline-radio-16"
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
        <OtherOptions node={node} theme={theme} handler={handler} />
      </div>
    );
  }
}

export default SlideRateBasic;
