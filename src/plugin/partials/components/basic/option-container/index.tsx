import React from 'react';

/**
 * 选项容器组件,大部分题目的选项容器应该都是一样的,所以做一个容器组件
 */
class OptionContainer extends React.Component {
  render(): JSX.Element {
    return <div className='option-container'>
      {this.props.children}
    </div>
  }
}

export default OptionContainer;