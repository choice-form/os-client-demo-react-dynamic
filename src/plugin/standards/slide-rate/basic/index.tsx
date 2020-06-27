import React from "react";
import NodeHead from "../../../partials/components/basic/node-head";
import NodeBody from "../../../partials/components/basic/node-body";
import OtherOptions from "../../../partials/components/basic/other-options";
import Icon from "../../../../utils/ui-components/icon";
import classnames from "classnames";

interface IProps extends IQuesComBaseProps {
  node: CFSlideRateQuestion;
}

interface ITemplateParam {
  groupOptBy: CFAssistPropKeys;
}

interface IGroupHead {
  start: number;
  rowSpan: number;
  text: string;
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
    const param = node.template.param as ITemplateParam;
    // 尝试生成分组头
    const groupHeaders: IGroupHead[] = [];
    if (param.groupOptBy) {
      let lastGroupText = "";
      node.options.forEach((option, index) => {
        const groupText = option.mapping[param.groupOptBy];
        if (groupText && lastGroupText !== groupText) {
          groupHeaders.push({ text: groupText, start: index, rowSpan: 1 });
          lastGroupText = groupText;
        } else {
          groupHeaders[groupHeaders.length - 1].rowSpan += 1;
        }
      });
    }

    return (
      <div className="basic-slide-rate">
        <NodeHead node={node} theme={theme} />
        <NodeBody theme={theme}>
          <table className="w-full m-1 table-fixed">
            <thead>
              <tr>
                {groupHeaders.length > 0 && <th></th>}
                <th></th>
                {node.rateOptions.map((rate) => {
                  return (
                    <th
                      className="p-2 text-xs align-bottom bg-gray-300 border border-gray-500"
                      key={rate.uuid}
                      dangerouslySetInnerHTML={{ __html: rate.text }}
                    ></th>
                  );
                })}
              </tr>
              <tr>
                {groupHeaders.length > 0 && <th></th>}
                <th></th>
                {node.rateOptions.map((rate) => {
                  return (
                    <th
                      className="p-2 text-xs align-bottom bg-gray-300 border border-gray-500"
                      key={rate.uuid}
                    >
                      {rate.value}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {node.options.map((option, optIdx) => {
                const head = groupHeaders.find((item) => {
                  return item.start === optIdx;
                });
                return (
                  <tr key={option.renderId} className='even:bg-gray-300'>
                    {head && (
                      <td
                        className="p-2 text-xs align-middle bg-gray-300 border border-gray-500"
                        rowSpan={head.rowSpan}
                        dangerouslySetInnerHTML={{ __html: head.text }}
                      ></td>
                    )}
                    <td
                      className="p-2 text-xs align-middle bg-gray-300 border border-gray-500"
                      dangerouslySetInnerHTML={{ __html: option.text }}
                    ></td>
                    {node.rateOptions.map((rate) => {
                      return (
                        <td
                          key={rate.uuid}
                          className="p-2 border border-gray-500"
                        >
                          <label
                            className={classnames(
                              "relative h-full flex justify-center items-center p-2 rounded",
                              "focus:outline-none focus-within:shadow-outline",
                              {
                                "text-indigo-600": option.value === rate.value,
                              },
                              node.readonly
                                ? "cursor-not-allowed"
                                : "hover:bg-gray-200 cursor-pointer"
                            )}
                            htmlFor={option.renderId + rate.value}
                            role="radio"
                          >
                            <input
                              disabled={node.readonly}
                              className="absolute inset-y-0 left-0 w-full h-4 my-auto opacity-0 pointer-events-none"
                              type="radio"
                              tabIndex={0}
                              id={option.renderId + rate.value}
                              checked={option.value === rate.value}
                              onChange={() => {
                                /** 保留这个空回调阻止react报错 */
                              }}
                              onClick={(e) =>
                                this.handleRate(rate.value, option)
                              }
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
