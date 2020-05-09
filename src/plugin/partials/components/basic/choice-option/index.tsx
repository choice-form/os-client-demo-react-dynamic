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
}

interface IState {
  selected: boolean;
}

/**
 * 选择类型的选项组件,考虑图片和图标
 */
class ChoiceOption extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = { selected: false };
  }
  render(): JSX.Element {
    const { type, handleChange, handleClick } = this.props;
    const option = this.props.option as CFIconOption & CFSelectPicOption;
    // 选项加备注选中时需要输入框
    const needInput = option.selected
      && option.inputType === 'select-input';
    return <div data-checked={option.selected}>
      <label htmlFor={option.renderId}>
        <input type={type} id={option.renderId}
          checked={option.selected}
          onChange={() => handleClick()} />
        <span>{option.text}</span>
        {option.icon
          ? <OptionIcon iconUrl={option.icon}
            iconActiveUrl={option.iconActive}
            activated={option.selected}
            cacheId={option.renderId} />
          : null
        }
        {option.image
          ? <img src={option.image.natural}
            style={{ width: '200px' }}
            title={option.image.originName} />
          : null
        }
      </label>
      {needInput
        ? <OptionInput value={option.value}
          placeholder={option.placeholder}
          message={option.errorMessage}
          handleChange={(v) => handleChange(v)}
        />
        : null
      }
    </div>
  }
}

export default ChoiceOption;