import React from 'react';
import NodeHead from '../../../partials/components/basic/node-head';
import ChoiceOption from '../../../partials/components/basic/choice-option';
import OptionContainer from '../../../partials/components/basic/option-container';

interface IProps extends IQuesComBaseProps {
  node: CFIconQuestion;
}

class IconBasic extends React.Component<IProps> {
  render(): JSX.Element {
    const { node, handler, theme } = this.props;
    return <div className='basic-icon'>
      <NodeHead node={node} theme={theme} />
      <OptionContainer>
        {node.options.map(option => {
          return <ChoiceOption option={option}
            handleChange={(v) => handler.handleOptionInput(v, option, node)}
            handleClick={() => {
              console.log('click');
              handler.handleOptionClick(option, node)
            }}
            key={option.renderId}
            theme={theme} handler={handler}
            type={node.selectType} />
        })}
      </OptionContainer>
    </div>
  }
}

export default IconBasic;