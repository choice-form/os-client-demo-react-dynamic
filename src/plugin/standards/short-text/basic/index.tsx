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
      <OptionContainer theme={theme}>
        {node.options.map(option => {
          return <OptionInput key={option.renderId}
            option={option}
            theme={theme}
            handleTrigger={(v) => handler.handleAutoCpltInput(v, option, node)}
            handleChange={(e) => handler.handleOptionInput(e, option, node)} />
        })}
      </OptionContainer>
    </div>
  }
}

export default ShortTextBasic;