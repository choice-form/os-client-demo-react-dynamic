import React from 'react';
import NodeHead from '../../../partials/components/basic/node-head';
import OptionContainer from '../../../partials/components/basic/option-container';
import OtherOptions from '../../../partials/components/basic/other-options';

interface IProps extends IQuesComBaseProps {
  node: CFMatrixQuestion;
}

class MatrixBasic extends React.Component<IProps> {
  render(): JSX.Element {
    const { node, theme, handler } = this.props;
    return <div className='basic-matrix'>
      <NodeHead node={node} theme={theme} />
      <OptionContainer theme={theme}>
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
      </OptionContainer>
      <OtherOptions node={node} theme={theme} handler={handler} />
    </div>
  }
}

export default MatrixBasic;