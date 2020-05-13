import React from 'react';
import NodeHead from '../../../partials/components/basic/node-head';
import NodeBody from '../../../partials/components/basic/node-body';
import OtherOptions from '../../../partials/components/basic/other-options';

interface IProps extends IQuesComBaseProps {
  node: CFMatrixQuestion;
}

class MatrixBasic extends React.Component<IProps> {
  render(): JSX.Element {
    const { node, theme, handler } = this.props;
    return <div className='basic-matrix'>
      {/* 调用共通组建渲染头部 */}
      <NodeHead node={node} theme={theme} />
      {/* 渲染选项 */}
      <NodeBody theme={theme}>
        <table>
          <thead>
            <tr>
              <th></th>
              {node.renderOptionsX.map(opt => {
                return <th key={opt.uuid}>{opt.text}</th>
              })}
            </tr>
          </thead>
          <tbody>
            {node.matrix.map((row, index) => {
              return <tr key={index}>
                <td>{node.renderOptionsY[index].text}</td>
                {row.map(cell => {
                  return <td key={cell.uuid}
                    onClick={() => handler.handleOptionClick(cell, node)}>
                    <input type={node.selectType} checked={cell.selected} />
                  </td>
                })}
              </tr>
            })}
          </tbody>
        </table>
      </NodeBody>
      {/* 其他选项   */}
      <OtherOptions node={node} theme={theme} handler={handler} />
    </div>
  }
}

export default MatrixBasic;