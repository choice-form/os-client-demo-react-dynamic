import React from 'react';

interface IProps {
  model: CFAnswerResumer;
}
/**
 * 断点续答选择组件
 */
class AnswerResume extends React.Component<IProps>{
  render(): JSX.Element {
    const { model } = this.props;
    return <div className='answer-resume'>
      <h1>{model.title}</h1>
      <p>{model.message}</p>
      <div>
        <button onClick={() => model.handleDeny()}>
          {model.denyText}
        </button>
        <button onClick={() => model.handleSure()}>
          {model.sureText}
        </button>
      </div>
    </div>
  }
}

export default AnswerResume;