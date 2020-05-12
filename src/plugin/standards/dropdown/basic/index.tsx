import React from 'react';
import NodeHead from '../../../partials/components/basic/node-head';
import OptionContainer from '../../../partials/components/basic/option-container';
import OtherOptions from '../../../partials/components/basic/other-options';


interface IProps extends IQuesComBaseProps {
  node: CFMenuQuestion;
}

/**
 * 菜单题组件
 */
class DropdownBasic extends React.Component<IProps> {
  /**
   * 处理点击变化
   * @param value 最后点击的选项文字
   */
  handleChange(value: string): void {
    const { node, handler } = this.props;
    // 找到对应选项序号
    const index = this.props.node.options
      .map(opt => opt.text).indexOf(value);
    handler.handleMenuClick(index, node);
  }
  /**
   * 渲染
   */
  render(): JSX.Element {
    const { node, theme, handler } = this.props;
    const selectedValues = node.options.filter(opt => opt.selected)
      .map(opt => opt.text);
    return <div className='basic-dropdown'>
      <NodeHead node={node} theme={theme} />
      <OptionContainer theme={theme}>
        <select multiple={node.multiple}
          value={selectedValues}
          onChange={(e) => this.handleChange(e.target.value)}>
          <option hidden={true}
            value={node.placeholder}>
            {node.placeholder}
          </option>
          {node.options.map(option => {
            return <option key={option.text}
              value={option.text}>
              {option.text}
            </option>
          })}
        </select>
      </OptionContainer>
      <OtherOptions node={node} theme={theme} handler={handler} />
    </div>
  }
}

export default DropdownBasic;