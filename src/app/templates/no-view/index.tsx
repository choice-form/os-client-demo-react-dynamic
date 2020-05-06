import React from 'react';
import { translate } from '../../../utils/i18n';
/**
 * 无视图节点的实时预览渲染方法
 * @param node 节点
 */
export function renderNoViewNode(node: CFQuestion): JSX.Element {
  return <div className='no-view'>{translate(LANG.general.noView)}</div>
}