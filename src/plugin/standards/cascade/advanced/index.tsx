import React from 'react';

interface IProps extends IQuesComBaseProps {
  node: CFCascadeQuestion;
}

class CascadeAdvanced extends React.Component<IProps> {
  render(): JSX.Element {
    return <div className='advanced-cascade'>CascadeAdvanced 空容器 未实现 </div>
  }
}

export default CascadeAdvanced;