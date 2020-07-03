import React from 'react';

interface IProps {
  model: CFStartState;
}

class StartBasic extends React.Component<IProps> {
  render(): JSX.Element {
    const { model } = this.props;
    return <div className='basic-start'>
      {model.images.map((image, index) => {
        return <img src={image.large}
          width='300'
          key={index}
          title={image.originName}
        ></img>
      })}
      <h1 dangerouslySetInnerHTML={{ __html: model.title }}></h1>
      <p dangerouslySetInnerHTML={{ __html: model.summary }}></p>
      <button onClick={() => model.handleEvents.handleNextClick()}>
        {model.nextLoading ? 'Loading' : model.nextButton}
      </button>
    </div>
  }
}

export default StartBasic;