import React from 'react';
interface IProps extends IQuesComBaseProps {
  node: CFRegionQuestion;
}

class RegionAdvanced extends React.Component<IProps> {
  render(): JSX.Element {
    return <div className="advanced-region">
      RegionAdvanced 空容器 未实现
      </div>
  }
}

export default RegionAdvanced;