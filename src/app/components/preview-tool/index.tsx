import React from "react";
import { T, LANG } from "../../../utils/i18n";
import classnames from "classnames";

type ITabName = "bookmark" | "time";

interface IState {
  /**
   * 预览书签名
   */
  bookmarkName: string;
  /**
   * 当前选中的tab名称
   */
  currentTab: ITabName;
  /**
   * 时间预览者名称
   */
  timeTestName: string;
}
interface IProps {
  model: CFPreviewTool;
}

/**
 * 预览工具组件,包含预览时间和预览书签
 */
class PreviewTool extends React.Component<IProps, IState> {
  constructor(props: any) {
    super(props);
    this.state = {
      currentTab: "bookmark",
      bookmarkName: "",
      timeTestName: "",
    };
  }
  /**
   * 更改书签名
   * @param name
   */
  handleBookmarkNameChange(name: string): void {
    return this.setState({ bookmarkName: name });
  }
  /**
   * 更改激活的tab
   * @param name tab名称
   */
  handleTabChange(name: ITabName): void {
    this.setState({ currentTab: name });
  }
  /**
   * 更改时间测试名
   * @param name
   */
  handleTimeTestNameChange(name: string): void {
    return this.setState({ timeTestName: name });
  }
  /**
   * 渲染预览工具
   */
  render(): JSX.Element {
    const { model } = this.props;
    const { time, history } = model;
    return (
      <div className={classnames("z-10", model.opened && "w-full")}>
        {/* 开关 */}
        <button
          role="button"
          type="button"
          className={classnames(
            "z-20 inline-block p-2 ml-2 text-indigo-700 rounded-full ",
            "focus:outline-none hover:bg-indigo-100",
            model.opened && "absolute top-2 right-2"
          )}
          onClick={() => model.handleToggleOpen()}
        >
          {model.opened ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <g fill="currentColor">
                <path d="M14.7,1.3c-0.4-0.4-1-0.4-1.4,0L8,6.6L2.7,1.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4L6.6,8l-5.3,5.3 c-0.4,0.4-0.4,1,0,1.4C1.5,14.9,1.7,15,2,15s0.5-0.1,0.7-0.3L8,9.4l5.3,5.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L9.4,8l5.3-5.3C15.1,2.3,15.1,1.7,14.7,1.3z"></path>
              </g>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
            >
              <g fill="currentColor">
                <path d="M13.3,5.2l1.1-2.1l-1.4-1.4l-2.1,1.1c-0.3-0.2-0.7-0.3-1.1-0.4L9,0H7L6.2,2.3C5.9,2.4,5.5,2.5,5.2,2.7 L3.1,1.6L1.6,3.1l1.1,2.1C2.5,5.5,2.4,5.9,2.3,6.2L0,7v2l2.3,0.8c0.1,0.4,0.3,0.7,0.4,1.1l-1.1,2.1l1.4,1.4l2.1-1.1 c0.3,0.2,0.7,0.3,1.1,0.4L7,16h2l0.8-2.3c0.4-0.1,0.7-0.3,1.1-0.4l2.1,1.1l1.4-1.4l-1.1-2.1c0.2-0.3,0.3-0.7,0.4-1.1L16,9V7 l-2.3-0.8C13.6,5.9,13.5,5.5,13.3,5.2z M8,11c-1.7,0-3-1.3-3-3s1.3-3,3-3s3,1.3,3,3S9.7,11,8,11z"></path>
              </g>
            </svg>
          )}
        </button>
        {/* 主体 */}
        {model.opened ? (
          // 打开了才渲染主体
          <div className="container z-10 w-full pt-16 pb-8 mx-auto bg-white">
            {/* tab头部 */}
            <div className="flex items-center mb-4">
              <button
                role="button"
                type="button"
                onClick={() => this.handleTabChange("bookmark")}
                className={
                  "border border-indigo-200 rounded-l-md flex-1 focus:outline-none focus:shadow-outline hover:bg-indigo-100 p-2 " +
                  (this.state.currentTab === "bookmark" &&
                    " bg-indigo-100 text-indigo-600")
                }
              >
                {T(LANG.preview.bookmark.title)}
              </button>
              <button
                role="button"
                type="button"
                onClick={() => this.handleTabChange("time")}
                className={
                  "-ml-px border border-indigo-200 rounded-r-md flex-1 focus:outline-none focus:shadow-outline hover:bg-indigo-100 p-2 " +
                  (this.state.currentTab === "time" &&
                    " bg-indigo-100 text-indigo-600")
                }
              >
                {T(LANG.preview.time.title)}
              </button>
            </div>
            {this.state.currentTab === "bookmark" ? (
              // 书签栏
              <div className="bookmark">
                <div className="mb-2 font-medium">
                  {T(LANG.preview.bookmark.title) +
                    (history.loading ? ` Loading: ${history.progress}` : "")}
                </div>
                <div className="flex items-center mb-4">
                  <input
                    type="text"
                    className="relative block w-full px-3 py-2 text-sm leading-5 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none rounded-md appearance-none focus:outline-none focus:shadow-outline focus:border-blue-300 focus:z-10"
                    defaultValue={this.state.bookmarkName}
                    onChange={(e) =>
                      this.handleBookmarkNameChange(e.target.value)
                    }
                    placeholder={T(LANG.preview.bookmark.input)}
                  />
                  <button
                    className="inline-flex items-center self-stretch justify-center px-5 ml-2 text-xs font-medium leading-6 text-white truncate transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:shadow-outline"
                    onClick={() => {
                      history.handleSaveHistories(this.state.bookmarkName);
                    }}
                  >
                    {T(LANG.preview.bookmark.add)}
                  </button>
                </div>
                <div className="mb-2 text-sm text-gray-600">
                  {T(LANG.preview.bookmark.about)}
                </div>
                <p className="mb-4 text-xs text-gray-600">
                  {T(LANG.preview.bookmark.detail)}
                </p>
                <ul className="pb-2 mb-4 bg-gray-100 border border-gray-300 rounded-md">
                  {history.histories.map((hstry) => {
                    return (
                      <li
                        className="flex items-center px-2 mt-2"
                        key={hstry.id}
                      >
                        <span className="flex-grow">{hstry.name}</span>
                        <button
                          className="px-2 py-1 text-xs text-indigo-600 truncate rounded-md focus:outline-none focus:shadow-outline hover:bg-indigo-100"
                          onClick={() => history.handleImportHistory(hstry)}
                        >
                          {T(LANG.preview.bookmark.apply)}
                        </button>
                        <button
                          className="px-2 py-1 text-xs text-indigo-600 truncate rounded-md focus:outline-none focus:shadow-outline hover:bg-indigo-100"
                          onClick={() => history.handleDeleteHistory(hstry)}
                        >
                          {T(LANG.preview.bookmark.delete)}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                <div className="mb-2 text-sm text-gray-600">
                  {T(LANG.preview.bookmark.history)}
                </div>
                <p className="mb-4 text-xs text-gray-600">
                  {T(LANG.preview.bookmark.historyDetail)}
                </p>
                <ul className="pb-2 bg-gray-100 border border-gray-300 rounded-md">
                  {history.nodeList.map((node) => {
                    return (
                      <li
                        className="flex items-center px-2 mt-2"
                        key={node.renderId}
                      >
                        <span className="flex-grow">{node.nodeName}</span>
                        <button
                          className="px-2 py-1 text-xs text-indigo-600 truncate rounded-md focus:outline-none focus:shadow-outline hover:bg-indigo-100"
                          onClick={() => history.handlePickNode(node)}
                        >
                          {T(LANG.preview.bookmark.revertTo)}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ) : (
              // 时间测试栏
              <div className="time">
                <div className="mb-2 font-medium">
                  {T(LANG.preview.time.title)}
                </div>
                <div className="flex items-center mb-4">
                  <input
                    type="text"
                    className="relative block w-full px-3 py-2 text-sm leading-5 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-none rounded-md appearance-none focus:outline-none focus:shadow-outline focus:border-blue-300 focus:z-10"
                    defaultValue={this.state.timeTestName}
                    onChange={(e) =>
                      this.handleTimeTestNameChange(e.target.value)
                    }
                    placeholder={T(LANG.preview.bookmark.input)}
                  />
                  <button
                    className="inline-flex items-center self-stretch justify-center px-5 ml-2 text-xs font-medium leading-6 text-white truncate transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:shadow-outline"
                    onClick={() => {
                      time.handleUpload(this.state.timeTestName);
                    }}
                  >
                    {T(LANG.preview.time.upload)}
                  </button>
                </div>
                <div className="mb-2 text-sm text-gray-600">
                  {T(LANG.preview.time.about)}
                </div>
                <p className="mb-4 text-xs text-gray-600">
                  {T(LANG.preview.time.detail)}
                </p>
                <div className="flex items-center mb-4 font-medium">
                  <span className="flex-grow">
                    {T(LANG.preview.time.total)}
                  </span>
                  <span>
                    {T(LANG.preview.time.cost, {
                      amount: time.timeInfo.allTime / 1000,
                    })}
                  </span>
                </div>
                <ul className="pb-2 bg-gray-100 border border-gray-300 rounded-md">
                  {time.timeInfo.displayList.map((item) => {
                    return (
                      <li
                        className="flex items-center px-2 mt-2 text-sm"
                        key={item.name}
                      >
                        <span className="flex-grow text-gray-600">
                          {item.name}
                        </span>
                        <span>
                          {T(LANG.preview.time.cost, {
                            amount: item.time / 1000,
                          })}
                        </span>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

export default PreviewTool;
