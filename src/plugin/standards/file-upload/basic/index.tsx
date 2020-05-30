import React from 'react';
import NodeHead from '../../../partials/components/basic/node-head';
import OtherOptions from '../../../partials/components/basic/other-options';
import NodeBody from '../../../partials/components/basic/node-body';

interface IProps extends IQuesComBaseProps {
  node: CFFileUploadQuestion;
}




class FileUploadBasic extends React.Component<IProps> {
  static style: string = require('./style.scss')
  render(): JSX.Element {
    const { node, theme, handler } = this.props;
    return <div className='basic-file-upload'>
      <NodeHead node={node} theme={theme} />
      <NodeBody theme={theme}>
        {node.options.map(option => {
          return <div key={option.renderId}>
            <button onClick={() => handler.handleOptionClick(option, node)}
            dangerouslySetInnerHTML={{ __html: option.text }}>
            </button>
            <div className='progress'>
              <div style={{ width: option.progress + '%'}}></div>
            </div>
            <div>{option.fileName}</div>
            <img src={option.value as string}
              title={option.fileName} />
          </div>
        })}
      </NodeBody>
      <OtherOptions node={node} theme={theme} handler={handler} />
    </div>
  }
}

export default FileUploadBasic;