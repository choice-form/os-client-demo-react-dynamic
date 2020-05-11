import React from 'react';

interface IProps {
  model: CFIntro;
}

class StartBasic extends React.Component<IProps> {
  render(): JSX.Element {
    const { model } = this.props;
    return <div className='basic-start'>
      {model.images.map(image => {
        return <img src={image.large}
          style={{ width: '300px' }}
          key={image.id}
          title={image.originName}
        ></img>
      })}
      <h1>{model.title}</h1>
      <p>{model.summary}</p>
      <button onClick={() => model.handleEvents.handleNextClick()}>
        {model.nextLoading ? 'Loading' : model.nextButton}
      </button>
    </div>

  }
}

export default StartBasic;