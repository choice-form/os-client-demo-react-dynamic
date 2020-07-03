import React from 'react';
import AutoCompleteBasic from '../auto-complete';

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
  /**
   * 输入触发内容发生变化时的回调函数
   * @param value 内容
   */
  handleTrigger(value: string): void;
}
/**
 * 选项的输入框
 * 一般用来渲染一下几个地方
 * 1. 填空题的选项
 * 2. 选项+备注类型选项的备注框
 * 3. 纯备注选项
 *
 * 输入规则在`option.intpuRule`属性中,
 * 参照该属性的注释描述:不同的规则要实现不同的输入辅助方式,
 * 这里的作为案例,只实现了一部分.
 */
class OptionInput extends React.Component<IProps> {
  /**
   * 某些输入规则借用原生的HTML输入类型
   */
  static nativeHtmlTypeMap: { [key: string]: string } = {
    'data': 'date',
    "email": 'email',
    "int": 'number',
    "float": 'number',
    "mobile": 'tel'
  }

  /**
   * 渲染
   */
  render(): JSX.Element {
    const { handleChange, option, handleTrigger, theme } = this.props;
    if (option.inputRule === 'dropdown') {
      return this.renderDropdown();
    } else if (option.inputRule === 'autoComplete') {
      return <AutoCompleteBasic handleChange={(e) => handleChange(e)}
        theme={theme} option={option}
        handleTrigger={(e) => handleTrigger(e)} />;
    } else {
      const type = OptionInput.nativeHtmlTypeMap[option.inputRule] || 'text';
      return <div>
        <input type={type} defaultValue={option.value}
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
  /**
   * 渲染下拉选择列表的输入方式
   */
  renderDropdown(): JSX.Element {
    const { option, handleChange } = this.props;
    const values = String(option.value).split(',');
    return <div>
      <select multiple={true} value={values}
        onChange={(e) => {
          const targetValue = e.target.value;
          let newList = [...values];
          if (!values.includes(targetValue)) {
            newList.push(targetValue);
          } else {
            newList = newList.filter(i => i !== targetValue);
          }
          handleChange(newList.join());
        }}>
        <option hidden>{option.placeholder}</option>
        {option.selectList.map((text, index) => {
          return <option key={index} value={text}>{text}</option>
        })}
      </select>
    </div>
  }
}

export default OptionInput;