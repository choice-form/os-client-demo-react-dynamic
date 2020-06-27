import React from "react";
import NodeHead from "../../../partials/components/basic/node-head";
import NodeBody from "../../../partials/components/basic/node-body";
import ChoiceOption from "../../../partials/components/basic/choice-option";

interface IProps extends IQuesComBaseProps {
  node: CFChoiceQuestion;
}
interface IState {
  column: number;
}

interface ITemplateParam {
  groupOptBy: CFAssistPropKeys;
  column: string;
}

type IRenderItemType = 'head' | 'option'

interface IRenderItem {
  type: IRenderItemType;
  option?: CFOption;
  text?: string;
}

class ChoiceBasic extends React.Component<IProps, IState> {
  private element: React.RefObject<HTMLDivElement>;
  column = 1;
  constructor(props) {
    super(props)
    this.element = React.createRef();
    this.state = { column: 1 }
  }
  componentDidMount() {
    const param = this.props.node.template.param as ITemplateParam;
    let column: number = Number(param.column);
    // 当有分组的时候,锁死一列
    if (param.groupOptBy) {
      column = 1;
    }
    if (!column) {
      const choiceTexts = Array.from(this.element.current.querySelectorAll('[data-choice-text]')) as HTMLElement[];
      const width = Math.max(...choiceTexts.map(node => node.offsetWidth)) + 50;
      const ratio = width / 1280;
      if (ratio >= 0.5) {
        column = 1;
      } else if (ratio < 0.5 && ratio >= 0.33) {
        column = 2;
      } else if (ratio < 0.33 && ratio >= 0.25) {
        column = 3;
      } else {
        column = 4;
      }
    }

    this.setState({ column });
  }
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    const { node, handler, theme } = this.props;
    const options = [...node.options, ...node.otherOptions];
    let renderItems: IRenderItem[] = [];
    const param = node.template.param as ITemplateParam;
    if (param.groupOptBy) {
      let lastGroupText = '';
      options.forEach(option => {
        const groupText = option.mapping[param.groupOptBy];
        if (groupText && lastGroupText !== groupText) {
          renderItems.push({ type: 'head', text: groupText });
          lastGroupText = groupText
        }
        renderItems.push({ type: 'option', option });
      })
    } else {
      renderItems = options.map(option => {
        return { type: 'option', option }
      })
    }
    return (
      <div className="basic-choice" ref={this.element}>
        <NodeHead node={node} theme={theme} />
        <NodeBody theme={theme} >
          {renderItems.map((item) => {
            const { type, option, text } = item;
            if (type === 'head') {
              // 有分组表头的时候都是锁死一列的
              return <div className="self-stretch m-1">{text}</div>
            } else {
              return (
                <ChoiceOption
                  column={this.state.column}
                  disabled={node.readonly}
                  option={option}
                  handleTrigger={(v) =>
                    handler.handleAutoCpltInput(v, option, node)
                  }
                  handleChange={(v) => handler.handleOptionInput(v, option, node)}
                  handleClick={() => handler.handleOptionClick(option, node)}
                  key={option.renderId}
                  theme={theme}
                  handler={handler}
                  layout={node.layout}
                  type={node.selectType}
                />
              );
            }

          })}
        </NodeBody>
      </div>
    );
  }
}
export default ChoiceBasic;
