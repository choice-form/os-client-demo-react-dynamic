import React from "react";

interface IProps {
  model: CFAnswerResumer;
}
/**
 * 断点续答选择组件
 */
class AnswerResume extends React.Component<IProps> {
  render(): JSX.Element {
    const { model } = this.props;
    return (
      <div className="container flex flex-col items-center justify-center flex-grow p-4 mx-auto text-gray-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 64 64"
        >
          <g fill="currentColor">
            <path d="M32,2c-6.76,0-13.219,2.243-18.479,6.366L6.454,1.465c-0.274-0.269-0.68-0.356-1.04-0.224 C5.053,1.372,4.799,1.699,4.761,2.082l-1.77,17.797c-0.03,0.304,0.081,0.606,0.302,0.819c0.187,0.18,0.436,0.279,0.693,0.279 c0.045,0,0.091-0.003,0.137-0.01l17.52-2.416c0.377-0.052,0.693-0.315,0.813-0.678c0.119-0.362,0.021-0.76-0.252-1.028l-7.235-7.066 C19.838,6.037,25.782,4,32,4c15.439,0,28,12.561,28,28c0,15.439-12.561,28-28,28c-4.58,0-8.902-1.112-12.722-3.07 c-0.424,0.548-0.888,1.06-1.392,1.533C22.095,60.717,26.9,62,32,62c16.542,0,30-13.458,30-30S48.542,2,32,2z"></path>
            <path d="M9,58c-4.963,0-9-4.038-9-9s4.037-9,9-9s9,4.038,9,9S13.963,58,9,58z"></path>
          </g>
        </svg>
        <h1 className="mt-2">{model.title}</h1>
        <p>{model.message}</p>
        <div className="my-6">
          <button
            role="button"
            type="button"
            className="inline-flex items-center justify-center px-5 py-3 mr-4 text-base font-medium leading-6 text-indigo-600 bg-white bg-indigo-100 border border-transparent rounded-md hover:text-indigo-500 focus:outline-none focus:shadow-outline"
            onClick={() => model.handleDeny()}
          >
            {model.denyText}
          </button>
          <button
            role="button"
            type="button"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:shadow-outline"
            onClick={() => model.handleSure()}
          >
            {model.sureText}
          </button>
        </div>
      </div>
    );
  }
}

export default AnswerResume;
