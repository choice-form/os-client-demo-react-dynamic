import React from 'react';
import { loadIcon } from '../../../services/icon-lib';

interface IProps {
  /**
   * 选中时的图标地址
   */
  iconActiveUrl: string;
  /**
   * 常规图标地址
   */
  iconUrl: string;
}
interface IState {
  /**
   * 选中时的图标
   */
  icon: string;
  /**
   * 未选中时的图标
   */
  iconActive: string;
}
/**
 * 图表题图标组件
 */
class OptionIcon extends React.Component<IProps, IState>{
  constructor(props: IProps) {
    super(props);
    this.state = { icon: '', iconActive: '' };
    this.initIcon();
  }
  /**
   * 初始化图标
   */
  async initIcon(): Promise<void> {
    const { iconActiveUrl, iconUrl } = this.props;
    const iconActive = await loadIcon(iconActiveUrl);
    const icon = await loadIcon(iconUrl);
    this.setState({ icon, iconActive });
  }
  /**
   * 渲染
   */
  render(): JSX.Element {
    const { icon } = this.state;
    if (!icon) {
      return null;
    }
    console.log(icon);
    return <div>
      <div className=''></div>
    </div>
  }
}

export default OptionIcon;