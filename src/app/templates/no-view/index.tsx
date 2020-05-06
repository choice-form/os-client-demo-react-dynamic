import React from 'react';
import { T } from '../../../utils/i18n';
/**
 * 无视图节点的实时预览渲染方法
 * @param node 节点
 */
export function renderNoViewNode(node: CFQuestion): JSX.Element {
  return <div className='no-view'>{T(LANG.preview.noView)}</div>
}