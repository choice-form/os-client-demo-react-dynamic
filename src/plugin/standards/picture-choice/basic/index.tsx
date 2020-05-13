import React from 'react';
import NodeHead from '../../../partials/components/basic/node-head';
import ChoiceOption from '../../../partials/components/basic/choice-option';
import NodeBody from '../../../partials/components/basic/node-body';
import OtherOptions from '../../../partials/components/basic/other-options';

interface IProps extends IQuesComBaseProps {
  node: CFIconQuestion;
}

class IconBasic extends React.Component<IProps> {
  render(): JSX.Element {
    const { node, handler, theme } = this.props;
    return <div className='basic-picture-choice'>
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
      <OtherOptions handler={handler} theme={theme} node={node} />
    </div>
  }
}

export default IconBasic;