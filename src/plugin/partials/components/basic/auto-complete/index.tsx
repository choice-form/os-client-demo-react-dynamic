import React from 'react';
import { getAutoCompleteData } from '../../../modules/auto-complete';
import { debounce } from '../../../../../utils/lazy';

interface IProps {
  /**
   * 选项
   */
  option: CFValidateOpt;
  /**
   * 主题
   */
  theme: CFTheme;
  /**
   * 输入内容发生变化的回调函数
   * @param value 内容
   */
  handleChange(value: string): void;
  /**
   * 触发提示的文字发生变化时的回调
   * @param value 触发文字
   */
  handleTrigger(value: string): void;
}

interface IState {
  /**
   * 带选用的提示项
   */
  candidates: CFAutoCpltData[];
  /**
   * 已选中的提示项
   */
  promoted: CFAutoCpltData[];
}

/**
 * 基本风格的自动提示组件
 */
class AutoCompleteBasic extends React.Component<IProps, IState> {

  trigger: React.RefObject<HTMLInputElement>;

  constructor(props: IProps) {
    super(props);
    this.handleTrigger = debounce(this.handleTrigger, 250);
    this.trigger = React.createRef();
    this.state = {
      candidates: [],
      promoted: this.getPromotedItems(),
    }
  }
  /**
   * 获取已选中的提示项
   */
  getPromotedItems(): CFAutoCpltData[] {
    const { option } = this.props;
    if (!option.value) {
      return [];
    }
    return String(option.value).split(',')
      .map(t => {
        return option.completeGroups.find(g => g.name === t);
      })
  }

  /**
   * 点击添加时的回调函数
   * @param value
   */
  handleAdd(value: string): void {
    const originValue = String(this.props.option.value);
    let newValue: string = '';
    if (!originValue) {
      newValue = value;
    } else {
      newValue = [...originValue.split(','), value].join();
    }
    this.props.handleChange(newValue);
    this.setState({ promoted: this.getPromotedItems(), candidates: [] });
    // 清空提示输入框
    this.trigger.current.value = '';
  }

  /**
   * 点击删除某个输入项的内容
   * @param value 值
   */
  handleRemove(value: string): void {
    const originValue = String(this.props.option.value)
    const newValue = originValue.split(',').filter(v => v !== value).join();
    this.props.handleChange(newValue);
    this.setState({ promoted: this.getPromotedItems() });
  }
  /**
   * 处理输入变化
   * @param value
   */
  handleTrigger(value: string): void {
    const { option, handleTrigger } = this.props;
    const completeData = getAutoCompleteData(value, option.completeGroups,
      "full", option.simpleCplt);
    this.setState({ candidates: completeData.results });
    handleTrigger(value);
  }


  /**
   * 渲染
   */
  render(): JSX.Element {
    return <div>
      {/* 已选中的项目 */}
      <div>
        {this.state.promoted.map((item, index) => {
          return <span key={index}>
            {item.icon
              ? <img src={item.icon} />
              : null}
            <span>{item.name}</span>
            <span onClick={() => this.handleRemove(item.name)}>╳</span>
          </span>
        })}
      </div>
      {/* 提示触发文字输入框 */}
      <input type="text" ref={this.trigger}
        onChange={(e) => this.handleTrigger(e.target.value)} />
      {/* 当前触发出来的项目 */}
      <div>
        {this.state.candidates.map((item, index) => {
          return <span key={index}
            onClick={() => this.handleAdd(item.name)}>
            {item.icon
              ? <img src={item.icon} />
              : null}
            <span>{item.name}</span>
          </span>
        })}
      </div>

    </div>
  }
}

export default AutoCompleteBasic;