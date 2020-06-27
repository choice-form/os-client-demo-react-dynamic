import React from "react";
import NodeHead from "../../../partials/components/basic/node-head";
import NodeBody from "../../../partials/components/basic/node-body";
import OptionInput from "../../../partials/components/basic/option-input";
import OtherOptions from "../../../partials/components/basic/other-options";
import { LANG, T } from "../../../../utils/i18n";

interface ITemplateParam {
  sum: boolean;
  valueAlign: "left" | "mid" | "right";
}

interface IProps extends IQuesComBaseProps {
  node: CFShortTextQuestion;
}

interface IState {
  firstTextWidth: string;
}

class ShortTextBasic extends React.Component<IProps, IState> {
  private element: React.RefObject<HTMLDivElement>;
  constructor(props: IProps) {
    super(props);
    this.state = { firstTextWidth: "" };
    this.element = React.createRef();
  }

  componentDidMount() {
    // 重新计算带头文字宽度
    const spanList = Array.from(
      this.element.current.querySelectorAll('[data-width-measure="true"]')
    ) as HTMLElement[];
    const widthList = spanList.map((node) => node.offsetWidth);
    const maxWidth = Math.max(...widthList);
    const containerWidth = 1280;
    const ratio = maxWidth / containerWidth;
    let realWidth = "";
    if (ratio <= 1 / 12) {
      realWidth = "od:w-1/12 d:w-2/12 t:w-3/12";
    } else if (ratio <= 2 / 12) {
      realWidth = "od:w-2/12 d:w-3/12 t:w-4/12";
    } else if (ratio <= 3 / 12) {
      realWidth = "od:w-3/12 d:w-4/12 t:w-5/12";
    } else if (ratio <= 4 / 12) {
      realWidth = "od:w-4/12 d:w-5/12 t:w-6/12";
    } else if (ratio <= 5 / 12) {
      realWidth = "od:w-5/12 d:w-6/12 t:w-7/12";
    } else if (ratio <= 6 / 12) {
      realWidth = "od:w-6/12 d:w-7/12 t:w-8/12";
    } else if (ratio <= 7 / 12) {
      realWidth = "od:w-7/12 d:w-8/12 t:w-9/12";
    } else if (ratio <= 8 / 12) {
      realWidth = "od:w-8/12 d:w-9/12 t:w-10/12";
    } else if (ratio <= 9 / 12) {
      realWidth = "od:w-9/12 d:w-10/12 t:w-11/12";
    } else if (ratio <= 10 / 12) {
      realWidth = "od:w-10/12 d:w-11/12 t:w-full";
    } else if (ratio <= 11 / 12) {
      realWidth = "od:w-11/12 d:w-full t:w-full";
    } else {
      realWidth = "w-full";
    }
    this.setState({ firstTextWidth: realWidth });
  }

  reformOptions() {
    const { node } = this.props;
    const options: CFOption[] = [...node.options];
    const otherOptions: CFOption[] = [];
    node.otherOptions.forEach((option) => {
      if (option.inputType === "input") {
        options.push(option);
      } else {
        otherOptions.push(option);
      }
    });
    const param = node.template.param as ITemplateParam;
    // 如果需要求和则假造一个选项
    if (param.sum) {
      const sum = options.reduce((rs, option) => {
        if (option.value) {
          rs += Number(option.value);
        }
        return rs;
      }, 0);
      const id = "xxxxxxxx-dddd-yyyy-zzzz-bbbbvvvvcccc";
      options.push({
        renderId: id,
        text:
          T(LANG.general.sum) +
          `<span class="var-string var-light"><input data-iptc-holder='${id}' hidden="true"/></span>%`,
        value: sum,
        inputRule: "int",
        disabled: true,
      } as CFOption);
    }
    return { options, otherOptions };
  }

  /**
   * 渲染组件
   */
  render(): JSX.Element {
    const { node, handler, theme } = this.props;
    const param = node.template.param as ITemplateParam;
    const { options, otherOptions } = this.reformOptions();
    return (
      <div className="basic-short-text" ref={this.element}>
        <NodeHead node={node} theme={theme} />
        <NodeBody theme={theme}>
          {options.map((option) => {
            return (
              <OptionInput
                valueAlign={param.valueAlign}
                firstTextWidth={this.state.firstTextWidth}
                key={option.renderId}
                placeholder={option.text}
                placeAt="isolated"
                disabled={node.readonly || option.disabled}
                option={option}
                theme={theme}
                handleAssistChange={(v, k) =>
                  handler.handleOptionAssistInput(v, k, option)
                }
                handleTrigger={(v) =>
                  handler.handleAutoCpltInput(v, option, node)
                }
                handleChange={(e) => handler.handleOptionInput(e, option, node)}
              />
            );
          })}
        </NodeBody>
        <OtherOptions
          theme={theme}
          handler={handler}
          node={node}
          otherOptions={otherOptions}
        />
      </div>
    );
  }
}

export default ShortTextBasic;
