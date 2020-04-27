declare module 'config' {
  const CF_CONFIG: CFHostConfig;
  export default CF_CONFIG;
}

interface IOptionBaseProps {
  /**
   * 选项数据源
   */
  option: CFOption;
  /**
   * 事件回调处理器
   */
  handler: CFUIEventHandler;
}