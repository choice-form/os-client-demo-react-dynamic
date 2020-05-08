import React from 'react';
import NodeHead from '../../../partials/components/basic/node-head';
import OptionInput from '../../../partials/components/basic/option-input';

interface IProps extends IQuesComBaseProps {
  node: CFCascadeQuestion;
}

/**
 * 基础级联题组件
 * 只实现了下拉列表方式
 */
class CascadeBasic extends React.Component<IProps> {
  /**
   * 导入自己独用的样式
   */
  static style: string = require('./style.scss');
  /**
   * 选项输入时的处理方法
   * @param cascade 级联项
   * @param value 输入值
   * @param parentCascade 所属父级联项
   */
  handleInput(cascade: CFCascade, value: string, parentCascade: CFCascade): void {
    const { handler, node } = this.props;
    const index = parentCascade.list.indexOf(cascade);
    // 算出索引以后调用核心的级联输入回调函数
    handler.handleCascadeInput(value, index, parentCascade, node);
  }
  /**
   * 选中级联项时的处理方法
   * @param cascade 级联项
   * @param e 事件参数
   */
  handleSelect(cascade: CFCascade, e: React.ChangeEvent<HTMLSelectElement>): void {
    // 级联题选中后可以调用handleOptionClick方法
    // 或者调用handleCascadeClick方法,
    // 前者要求传递的一个CascadeClickResult对象
    // 后者要求传递选择的级联项在所属列表中的索引,一般来说调用后者更简单
    // 但是我们这里用的原生的HTML的select组件,这个组件开启了多选的时候,即使进行单选操作
    // 原来选中的项目也不会被取消掉,所以仅仅传递选中项的索引不够,我们调用前者
    const { handler, node } = this.props;
    const resultList = Array.from(e.target.options).reduce((rs, opt) => {
      if (opt.selected) {
        rs.push(opt.value);
      }
      return rs;
    }, [] as string[])
    const param: CascadeClickResult = {
      resultList,
      list: cascade.list,
      group: cascade,
    }
    handler.handleOptionClick(param, node);
  }
  /**
   * 渲染
   */
  render(): JSX.Element {
    const { node, theme } = this.props;
    return <div className='basic-cascade'>
      <NodeHead node={node} theme={theme} />
      {this.renderDropdownUnit(node.cascade, null)}
    </div>
  }
  /**
   * 递归渲染级联下拉
   * @param cascade 级联项
   * @param parentCascade 所属的父级联项
   */
  renderDropdownUnit(cascade: CFCascade, parentCascade: CFCascade): JSX.Element {
    if (!cascade.list || cascade.list.length === 0) {
      return null;
    }
    return <div className='dropdown'>
      {/* 有可能需要输入框 */}
      {parentCascade && ((cascade.option.inputType === 'select-input'
        && cascade.option.selected)
        || cascade.option.inputType === 'input')
        ? <OptionInput
          handleChange={(v) => this.handleInput(cascade, v, parentCascade)}
          value={cascade.option.value}
          message={cascade.option.errorMessage} />
        : null}
      {/* 下拉列表 */}
      <select multiple={cascade.multiple}
        onChange={(e) => this.handleSelect(cascade, e)}>
        <option value={cascade.placeholder}
          hidden={true}>
          {cascade.placeholder}
        </option>
        {cascade.list.map(sub => {
          return <option key={sub.text}
            value={sub.text}>
            {sub.text}
          </option>
        })}
      </select>
      {/* 递归渲染已选中项的子列表 */}
      {cascade.list.filter(item => item.selected).map(item => {
        return <div key={item.text}>
          {this.renderDropdownUnit(item, cascade)}
        </div>
      })}
    </div>
  }
}

export default CascadeBasic;