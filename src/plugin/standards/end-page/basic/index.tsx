import React from 'react';
import NodeHead from '../../../partials/components/basic/node-head';

interface IProps extends IQuesComBaseProps {
  node: CFEndQuestion;
}

class EndPageBasic extends React.Component<IProps> {
  render(): JSX.Element {
    const { node, theme } = this.props;
    return <div className='basic-end'>
      <NodeHead node={node} theme={theme} />
    </div>
  }
}

export default EndPageBasic;