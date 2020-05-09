import React from 'react';
import OptionInput from '../option-input';
import ChoiceOption from '../choice-option';
interface IProps extends IQuesComBaseProps {
  node: CFSubjectQuestion;
}

/**
 * 其它选项通用组件
 * 现在所有题目的其他选项都是一样的啦
 */
class OtherOptions extends React.Component<IProps>{
  render(): JSX.Element {
    const { node, handler, theme } = this.props;
    return <div className='other-options'>
      {node.otherOptions.map(option => {
        // 纯备注的
        if (option.inputType === 'input') {
          return <OptionInput value={option.value}
            handleChange={(v) => handler.handleOptionInput(v, option, node)}
            message={option.errorMessage}
          />
          // 纯选项或选项加备注的
        } else {
          return <ChoiceOption option={option}
            type={node.selectType}
            handler={handler}
            theme={theme}
            handleClick={() => handler.handleOptionClick(option, node)}
            handleChange={(v) => handler.handleOptionInput(v, option, node)} />
        }
      })}
    </div>
  }
}

export default OtherOptions;