import React from 'react';
import NodeHead from '../../../partials/components/basic/node-head';
import OptionContainer from '../../../partials/components/basic/option-container';
import OptionInput from '../../../partials/components/basic/option-input';

interface IProps extends IQuesComBaseProps {
  node: CFFillQuestion;
}

class ShortTextBasic extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    const { node, handler, theme } = this.props;
    return <div className='basic-short-text'>
      <NodeHead node={node} theme={theme} />
      <OptionContainer>
        {node.options.map(opt => {
          return <OptionInput key={opt.renderId}
            value={opt.value}
            placeholder={opt.placeholder}
            handleChange={(e) => handler.handleOptionInput(e, opt, node)}
            message={opt.errorMessage} />
        })}
      </OptionContainer>
    </div>
  }
}

export default ShortTextBasic;