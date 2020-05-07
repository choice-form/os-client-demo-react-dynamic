import React from 'react';
import NodeHead from '../../../partials/node-head';

interface IProps extends IQuesComBaseProps {
  node: CFCascadeQuestion;
}

class CascadeBasic extends React.Component<IProps> {
  render(): JSX.Element {
    const { node, theme } = this.props;
    return <div>
      <NodeHead node={node} theme={theme} />
      {this.renderDropdownUnit(node.cascade)}
    </div>
  }

  renderDropdownUnit(cascade: CFCascade): JSX.Element {
    if (!cascade.list || cascade.list.length === 0) {
      return null;
    }
    return <div>
      <select multiple={cascade.multiple}>
        {cascade.list.map(sub => {
          return <option key={sub.text}
            value={sub.text}
            selected={sub.selected}>
            {sub.text}
          </option>
        })}
      </select>
      {cascade.list.filter(item => item.selected).map(item => {
        return this.renderDropdownUnit(item);
      })}
    </div>
  }
}

export default CascadeBasic;