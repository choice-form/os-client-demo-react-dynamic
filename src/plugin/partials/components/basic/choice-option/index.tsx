import React from 'react';
import OptionIcon from '../option-icon';
import OptionInput from '../option-input';


interface IProps extends IOptionBaseProps {
  /**
   * 选择类型
   */
  type: 'radio' | 'checkbox';
  /**
   * 选项输入时的回调函数
   * @param value
   */
  handleChange(value: string): void;
  /**
   * 选项点击时的回调函数
   */
  handleClick(): void;
  /**
   * 选项输入触发提示文字时的回调函数
   * @param value
   */
  handleTrigger(value: string): void;
}


/**
 * 选择类型的选项组件,考虑图片和图标
 */
class ChoiceOption extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  render(): JSX.Element {
    const { type, handleChange, handleClick, theme, handleTrigger } = this.props;
    const option = this.props.option as CFIconOption & CFPictureChoiceOption;
    // 选项加备注选中时需要输入框
    const needInput = option.selected
      && option.inputType === 'select-input';
    return <div data-checked={option.selected}>
      <label htmlFor={option.renderId}>
        <input type={type} id={option.renderId}
          checked={option.selected}
          onClick={() => handleClick()}
          onChange={() => { /** 保留这个空回调来阻止React报错 */ }} />
        <span dangerouslySetInnerHTML={{ __html: option.text }}></span>
        {option.icon
          ? <OptionIcon iconUrl={option.icon}
            iconActiveUrl={option.iconActive}
            activated={option.selected}
            cacheId={option.renderId} />
          : null
        }
        {option.image
          ? <img src={option.image.natural}
            width='200'
            title={option.image.originName} />
          : null
        }
      </label>
      {needInput
        ? <OptionInput option={option}
          theme={theme}
          handleTrigger={(v) => handleTrigger(v)}
          handleChange={(v) => handleChange(v)}
        />
        : null
      }
    </div>
  }
}

export default ChoiceOption;