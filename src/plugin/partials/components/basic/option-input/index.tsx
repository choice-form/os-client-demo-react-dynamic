import React from 'react';

interface IProps {
  /**
   * 选项内容
   */
  option: CFValidateOpt;
  /**
   * 主题信息
   */
  theme: CFTheme;
  /**
   * 输入内容发生变化时的回调函数
   * @param value 当前输入的内容
   */
  handleChange(value: string): void;
}
/**
 * 选项的输入框
 * 一般用来渲染一下几个地方
 * 1. 填空题的选项
 * 2. 选项+备注类型选项的备注框
 * 3. 纯备注选项
 */
class OptionInput extends React.Component<IProps> {
  render(): JSX.Element {
    const { handleChange, option } = this.props;
    return <div>
      <input type="text" value={option.value}
        placeholder={option.placeholder}
        onChange={(e) => handleChange(e.target.value)} />
      {option.errorMessage
        ? <div className='option-error'>
          {option.errorMessage}
        </div>
        : null}
    </div>
  }
}

export default OptionInput;