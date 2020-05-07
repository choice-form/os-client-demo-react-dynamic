import React from 'react';

interface IProps extends IQuesComBaseProps {
  node: CFFillQuestion;
}

class ShortTextAdvanced extends React.Component<IProps> {
  /**
   * 渲染组件
   */
  render(): JSX.Element {
    return <div className='advanced-short-text'>
      <span>ShortTextAdvanced 空容器</span>
    </div>
  }
}

export default ShortTextAdvanced;