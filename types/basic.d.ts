declare module 'config' {
  const CF_CONFIG: CFHostConfig;
  export default CF_CONFIG;
}

interface INodePlugin {
  getNodeComponent(type: string): typeof React.Component;
}

declare module 'node-plugin' {
  const getNodeComponent: (type: string) => typeof React.Component;
  export default getNodeComponent;
}

interface Window {
  CF_UI_PLUGIN_CLUSTER: any;
}