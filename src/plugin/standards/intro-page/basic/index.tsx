import React from 'react';
import NodeHead from '../../../partials/components/basic/node-head';


class IntroPageBasic extends React.Component<IQuesComBaseProps> {
  render(): JSX.Element {
    const { node, theme } = this.props;
    return <div className='intro-page-basic'>
      <NodeHead node={node} theme={theme} />
    </div>
  }
}

export default IntroPageBasic;