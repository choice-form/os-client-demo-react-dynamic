declare module 'config' {
  const CF_CONFIG: CFHostConfig;
  export default CF_CONFIG;
}
/**
 * 节点组件基础属性
 */
interface IQuesComBaseProps {
  /**
   * 问题对象
   */
  node: CFQuestion;
  /**
   * 事件回调处理器
   */
  handler: CFUIEventHandler;
  /**
   * 主题信息
   */
  theme: CFTheme;
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
  /**
   * 主题信息
   */
  theme: CFTheme;
}

interface Window {
  __LIVE_APP__: {
    disableNotify(): void;
    recoverNotify(): void;
  }
}