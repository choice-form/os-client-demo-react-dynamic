import React from 'react';
import OptionInput from '../option-input';
import ChoiceOption from '../choice-option';
interface IProps extends IQuesComBaseProps {
  node: CFSubjectQuestion;
}

/**
 * 其它选项通用组件
 * 现在所有题目的其他选项都是一样的啦
 * 其他选项有三种形式
 * 1. 纯选择选项 => 案列中使用普通的选择选项渲染
 * 2. 选项+备注 => 案列中使用普通的选择选项渲染,
 *                当选项被选中时,会附加显示一个输入框,可以输入内容
 * 3. 纯备注 => 案列中使用选项输入框渲染
 */
class OtherOptions extends React.Component<IProps>{
  render(): JSX.Element {
    const { node, handler, theme } = this.props;
    return <div className='other-options'>
      {node.otherOptions.map(option => {
        // 纯备注的
        if (option.inputType === 'input') {
          // 使用选项输入框渲染
          return <OptionInput key={option.renderId}
            option={option}
            theme={theme}
            handleTrigger={(v) => handler.handleAutoCpltInput(v, option, node)}
            handleChange={(v) => handler.handleOptionInput(v, option, node)}
          />
          // 纯选项或选项加备注的
        } else {
          // 使用普通选择选项渲染
          return <ChoiceOption option={option}
            key={option.renderId}
            type={node.selectType}
            handler={handler}
            theme={theme}
            handleTrigger={(v) => handler.handleAutoCpltInput(v, option, node)}
            handleClick={() => handler.handleOptionClick(option, node)}
            handleChange={(v) => handler.handleOptionInput(v, option, node)} />
        }
      })}
    </div>
  }
}

export default OtherOptions;