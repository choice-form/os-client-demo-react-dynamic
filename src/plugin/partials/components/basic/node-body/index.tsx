import React from 'react';

interface IProps {
  theme: CFTheme;
}

/**
 * 主区域,大部分题目的主区域容器应该都是一样的
 * 容器上可能附加特殊的内容和样式,这样每个题目都要重复写这些效果,很麻烦
 * 所以做一个容器组件,每个题目中调用就行了
 */
class NodeBody extends React.Component<IProps> {
  render(): JSX.Element {
    return <div className='node-body'>
      {this.props.children}
    </div>
  }
}

export default NodeBody;