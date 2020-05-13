import React from "react";
import NodeHead from '../../../partials/components/basic/node-head';
import NodeBody from "../../../partials/components/basic/node-body";
import ChoiceOption from "../../../partials/components/basic/choice-option";
import OtherOptions from "../../../partials/components/basic/other-options";
interface IProps extends IQuesComBaseProps {
  node: CFSelectQuestion;
}

class ChoiceBasic extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    const { node, handler, theme } = this.props;
    return <div className='basic-choice'>
      <NodeHead node={node} theme={theme} />
      <NodeBody theme={theme}>
        {node.options.map(option => {
          return <ChoiceOption option={option}
            handleTrigger={(v) => handler.handleAutoCpltInput(v, option, node)}
            handleChange={(v) => handler.handleOptionInput(v, option, node)}
            handleClick={() => handler.handleOptionClick(option, node)}
            key={option.renderId}
            theme={theme} handler={handler}
            type={node.selectType} />
        })}
      </NodeBody>
      <OtherOptions theme={theme} handler={handler} node={node} />
    </div>
  }
}
export default ChoiceBasic;
