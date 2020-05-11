import React from 'react';
import { loadIcon } from '../../../services/icon-lib';

interface IProps {
  /**
   * 是否激活
   */
  activated: boolean;
  /**
   * 作为缓存依据的id
   */
  cacheId: string;
  /**
   * 选中时的图标地址
   */
  iconActiveUrl: string;
  /**
   * 常规图标地址
   */
  iconUrl: string;
}
/**
 * 图表题图标组件
 */
class OptionIcon extends React.Component<IProps>{
  static style: string = require('./style.scss');
  private iconActiveRef: React.RefObject<HTMLDivElement>;
  private iconRef: React.RefObject<HTMLDivElement>;
  constructor(props: IProps) {
    super(props);
    this.iconActiveRef = React.createRef();
    this.iconRef = React.createRef();
  }
  componentDidMount(): void {
    this.initIcon();
  }
  /**
   * 初始化图标
   */
  async initIcon(): Promise<void> {
    const { iconActiveUrl, iconUrl, cacheId: id } = this.props;
    const iconActive = await loadIcon(iconActiveUrl, id);
    const icon = await loadIcon(iconUrl, id);
    this.iconRef.current.appendChild(icon);
    this.iconActiveRef.current.appendChild(iconActive);
  }
  /**
   * 渲染
   */
  render(): JSX.Element {
    const { activated } = this.props;
    return <div className='option-icon'>
      <div className={activated ? null : 'hidden'}
        ref={this.iconActiveRef}></div>
      <div className={activated ? 'hidden' : null}
        ref={this.iconRef}></div>
    </div>
  }
}

export default OptionIcon;