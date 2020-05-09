import React from 'react';
import NodeHead from '../../../partials/components/basic/node-head';
import OptionContainer from '../../../partials/components/basic/option-container';
import OtherOptions from '../../../partials/components/basic/other-options';


interface IProps extends IQuesComBaseProps {
  node: CFMenuQuestion;
}


class DropdownBasic extends React.Component<IProps> {
  render(): JSX.Element {
    const { node, theme, handler } = this.props;
    const selectedValues = node.options.filter(opt => opt.selected)
      .map(opt => opt.text);
    return <div className='basic-dropdown'>
      <NodeHead node={node} theme={theme} />
      <OptionContainer>
        <select multiple={node.multiple}
          value={selectedValues}
          onChange={() => { /** 保留 */ }}>
          <option hidden={true}
            value={node.placeholder}>
            {node.placeholder}
          </option>
          {node.options.map((option, index) => {
            return <option key={option.text}
              onClick={() => handler.handleMenuClick(index, node)}
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