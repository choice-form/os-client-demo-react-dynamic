import React from "react";
import NodeHead from "../../../partials/components/basic/node-head";
import OtherOptions from "../../../partials/components/basic/other-options";
import NodeBody from "../../../partials/components/basic/node-body";

interface IProps extends IQuesComBaseProps {
  node: CFFileUploadQuestion;
}

class FileUploadBasic extends React.Component<IProps> {
  render(): JSX.Element {
    const { node, theme, handler } = this.props;
    return (
      <div className="basic-file-upload">
        <NodeHead node={node} theme={theme} />
        <NodeBody theme={theme}>
          {node.options.map((option) => {
            return (
              <div className="flex flex-col min-w-0 m-1" key={option.renderId}>
                {option.value ? (
                  <div className="p-2 bg-gray-100 border border-gray-200 rounded-md">
                    <div className="flex items-center">
                      <div
                        aria-label={option.fileName}
                        className="flex-shrink-0 w-8 h-8 mr-2 bg-center bg-cover rounded"
                        style={{
                          backgroundImage:
                            (("url(" + option.value) as string) + ")",
                        }}
                      ></div>
                      <div className="flex-grow truncate">
                        {option.fileName}
                      </div>
                      <button
                        role="button"
                        type="button"
                        className="z-20 inline-block p-2 ml-2 text-gray-600 rounded-full focus:outline-none hover:bg-indigo-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                        >
                          <g fill="currentColor">
                            <path d="M2,6v8c0,1.1,0.9,2,2,2h8c1.1,0,2-0.9,2-2V6H2z"></path>
                            <path d="M12,3V1c0-0.6-0.4-1-1-1H5C4.4,0,4,0.4,4,1v2H0v2h16V3H12z M10,3H6V2h4V3z"></path>
                          </g>
                        </svg>
                      </button>
                    </div>
                    <div className="w-full h-1 mt-2 bg-gray-100 rounded-sm">
                      <div
                        className="h-1 bg-indigo-600 rounded-sm"
                        style={{ width: option.progress + "%" }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <button
                    className="flex items-center px-4 py-2 text-sm font-medium leading-5 text-gray-700 bg-white border border-gray-300 rounded-md hover:text-gray-500 focus:outline-none focus:shadow-outline focus:border-blue-300 active:text-gray-800 active:bg-gray-50"
                    onClick={() => handler.handleOptionClick(option, node)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                    >
                      <g fill="currentColor">
                        <rect x="6" y="14" width="4" height="2"></rect>{" "}
                        <rect x="6" width="4" height="2"></rect>
                        <rect x="14" y="6" width="2" height="4"></rect>
                        <rect y="6" width="2" height="4"></rect>
                        <polygon points="7,12 9,12 9,8 12,8 8,4 4,8 7,8 "></polygon>
                        <path d="M2,2h2V0H1C0.4,0,0,0.4,0,1v3h2V2z"></path>
                        <path d="M15,0h-3v2h2v2h2V1C16,0.4,15.6,0,15,0z"></path>
                        <path d="M14,14h-2v2h3c0.6,0,1-0.4,1-1v-3h-2V14z"></path>
                        <path d="M2,12H0v3c0,0.6,0.4,1,1,1h3v-2H2V12z"></path>
                      </g>
                    </svg>
                    <span
                      className="ml-2"
                      dangerouslySetInnerHTML={{ __html: option.text }}
                    ></span>
                  </button>
                )}
              </div>
            );
          })}
        </NodeBody>
        <OtherOptions node={node} theme={theme} handler={handler} />
      </div>
    );
  }
}

export default FileUploadBasic;
