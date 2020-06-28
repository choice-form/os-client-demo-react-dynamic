import React from 'react';
import NodeHead from '../../../partials/components/basic/node-head';
import QrCodeBasic from '../../../partials/components/basic/qr-code';

interface IProps extends IQuesComBaseProps {
  node: CFEndPage;
}

class EndPageBasic extends React.Component<IProps> {
  render(): JSX.Element {
    const { node, theme } = this.props;
    return <div>
      <NodeHead node={node} theme={theme} />
      {node.qrCode ? <QrCodeBasic text={node.qrCode} /> : null}
    </div>
  }
}

export default EndPageBasic;