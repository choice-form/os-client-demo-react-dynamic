import React from 'react';

interface IProps {
  error: string;
}

class GlobalError extends React.Component<IProps> {
  render() {
    return <div className="container flex flex-col items-center justify-center flex-grow p-4 mx-auto text-gray-500">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="64"
        height="64"
        viewBox="0 0 64 64"
      >
        <g fill="currentColor">
          <path d="M62.874,56.514l-30-54a1.04,1.04,0,0,0-1.748,0l-30,54A1,1,0,0,0,2,58H62a1,1,0,0,0,.874-1.486ZM34.857,21,33.428,41.714H30.571L29.143,21ZM32,52a3,3,0,1,1,3-3A3,3,0,0,1,32,52Z"></path>
        </g>
      </svg>
      <div className="mt-2 font-medium text-center">
        {this.props.error}
      </div>
    </div>
  }
}

export default GlobalError;
