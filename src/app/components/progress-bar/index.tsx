import React from 'react';

interface IProps {
  progress: number;
}
/**
 * 进度条组件
 */
class ProgressBar extends React.Component<IProps> {
  render(): JSX.Element {
    return <div className='progress-bar'>
      <div style={{ width: this.props.progress + '%' }}></div>
    </div>
  }
}

export default ProgressBar;