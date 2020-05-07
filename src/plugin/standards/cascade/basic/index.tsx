import React from 'react';
import NodeHead from '../../../partials/basic/node-head';
import OptionInput from '../../../partials/basic/option-input';

interface IProps extends IQuesComBaseProps {
  node: CFCascadeQuestion;
}

class CascadeBasic extends React.Component<IProps> {

  handleInput(cascade: CFCascade, value: string, parentCascade: CFCascade): void {
    const { handler, node } = this.props;
    const index = parentCascade.list.indexOf(cascade);
    handler.handleCascadeInput(value, index, parentCascade, node);
  }

  handleSelect(cascade: CFCascade, e: React.ChangeEvent<HTMLSelectElement>): void {
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

  render(): JSX.Element {
    const { node, theme } = this.props;
    return <div>
      <NodeHead node={node} theme={theme} />
      {this.renderDropdownUnit(node.cascade, null)}
    </div>
  }

  renderDropdownUnit(cascade: CFCascade, parentCascade: CFCascade): JSX.Element {
    if (!cascade.list || cascade.list.length === 0) {
      return null;
    }
    return <div>
      {parentCascade && ((cascade.option.inputType === 'select-input'
        && cascade.option.selected)
        || cascade.option.inputType === 'input')
        ? <OptionInput
          handleChange={(v) => this.handleInput(cascade, v, parentCascade)}
          value={cascade.option.value}
          message={cascade.option.errorMessage} />
        : null}

      <select multiple={cascade.multiple}
        onChange={(e) => this.handleSelect(cascade, e)}>
        <option value={cascade.placeholder}>{cascade.placeholder}</option>
        {cascade.list.map(sub => {
          return <option key={sub.text}
            value={sub.text}>
            {sub.text}
          </option>
        })}
      </select>

      {cascade.list.filter(item => item.selected).map(item => {
        return <div key={item.text}>
          {this.renderDropdownUnit(item, cascade)}
        </div>
      })}
    </div>
  }
}

export default CascadeBasic;