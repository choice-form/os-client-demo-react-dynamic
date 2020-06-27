import React from "react";

interface IProps {
  model: CFStartState;
}

class StartBasic extends React.Component<IProps> {
  render(): JSX.Element {
    const { model } = this.props;
    return (
      <div className="w-full">
        {model.images.map((image, index) => {
          return (
            <img
              src={image.large}
              className="max-w-full"
              key={index}
              title={image.originName}
            ></img>
          );
        })}
        <h2
          className={"leading-10" + (model.summary && " mb-4")}
          dangerouslySetInnerHTML={{ __html: model.title }}
        ></h2>
        <p
          className="text-sm text-gray-600"
          dangerouslySetInnerHTML={{ __html: model.summary }}
        ></p>
        <button
          className="inline-flex items-center justify-center px-5 py-3 my-6 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:shadow-outline"
          onClick={() => model.handleEvents.handleNextClick()}
        >
          {model.nextLoading ? "Loading" : model.nextButton}
        </button>
      </div>
    );
  }
}

export default StartBasic;
