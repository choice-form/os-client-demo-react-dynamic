import React from 'react';
import { T } from '../../../utils/i18n';
interface IProps {
  node: CFQuestion;
}
/**
 * 无视图节点实时预览时的的渲染组件
 */
class NoView extends React.Component<IProps>{
  render(): JSX.Element {
    return <div className='no-view'>{T(LANG.preview.noView)}</div>
  }
}

export default NoView;