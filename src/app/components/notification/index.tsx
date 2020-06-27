import React from "react";

interface IProps {
  notification: { id: number; text: string }[];
}

class Notification extends React.Component<IProps> {
  render() {
    return (
      <div className="fixed inset-x-0 top-0 z-50 ">
        {this.props.notification.map((nt) => {
          return (
            <div className="container px-2 pt-2 mx-auto" key={nt.id}>
              <div
                className="flex items-center px-4 py-2 text-white bg-red-600 rounded-md shadow-lg "
                key={nt.id}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                >
                  <g fill="currentColor">
                    <path d="M8,0C3.6,0,0,3.6,0,8s3.6,8,8,8s8-3.6,8-8S12.4,0,8,0z M9,12H7V7h2V12z M8,6C7.4,6,7,5.6,7,5s0.4-1,1-1 s1,0.4,1,1S8.6,6,8,6z"></path>
                  </g>
                </svg>
                <span className="ml-2">{nt.text}</span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Notification;
