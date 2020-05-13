// QRCode 的部分类型定义,只定义了使用到的部分
// 插件地址:https://github.com/davidshimjs/qrcodejs


interface QRCodeConfig {
  text: string;
  colorDark: string;
  width: string | number;
  height: string | number;
}

declare module 'qrcodejs2' {
  const QRCode: QRCode;
  export default QRCode;
}

interface QRCode {
  new(element: HTMLElement, config: QRCodeConfig): any;
}
