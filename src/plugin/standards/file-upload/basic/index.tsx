import React from 'react';

interface IProps extends IQuesComBaseProps {
  node: CFFileUploadQuestion;
}

class FileUploadBasic extends React.Component<IProps> {
  render(): JSX.Element {
    return <div>空容器 未实现</div>
  }
}

export default FileUploadBasic;