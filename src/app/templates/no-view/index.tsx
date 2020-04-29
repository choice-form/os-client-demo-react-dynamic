import React from 'react';
/**
 * 无视图节点的实时预览渲染方法
 * @param node 节点
 */
export function renderNoViewNode(node: CFQuestion): JSX.Element {
  return <div className='no-view'>无视图节点,答题过程中不会显示</div>
}