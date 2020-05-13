import React from 'react';
import QRCode from 'qrcodejs2';

interface IProps {
  /**
   * 要展示成二维码的文字内容
   */
  text: string
}

class QrCodeBasic extends React.Component<IProps> {
  qrCodeInst: QRCode
  qrCodeTarget: React.RefObject<HTMLDivElement>
  constructor(props: IProps) {
    super(props);
    this.qrCodeTarget = React.createRef();
  }
  componentDidMount(): void {
    this.qrCodeInst = new QRCode(this.qrCodeTarget.current, {
      text: this.props.text,
      colorDark: '#000000',
      width: 200,
      height: 200,
    })
  }
  render(): JSX.Element {
    const { text } = this.props;
    return <div>
      <div ref={this.qrCodeTarget}></div>
      {text}
    </div>
  }
}

export default QrCodeBasic;