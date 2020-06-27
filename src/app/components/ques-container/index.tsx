import React from "react";
import { T, LANG } from "../../../utils/i18n";

/**
 * 问题页面渲染参数
 */
interface IQuestionsRenderData {
  /**
   * 自定义logo图片
   */
  customLogo?: string;
  /**
   * 自定义logo文字
   */
  customText?: string;
  /**
   * 事件回调处理器
   */
  handleEvents: CFUIEventHandler;
  /**
   * 下一题按钮文字
   */
  nextButton: string;
  /**
   * 节点列表
   */
  nodes: CFQuestion[];
  /**
   * 上一题按钮文字
   */
  prevButton: string;
  /**
   * 主题
   */
  theme: CFTheme;
  /**
   * 问卷标题
   */
  title?: string;
  /**
   * loading
   */
  nextLoading: boolean;
}

interface IProps {
  model: IQuestionsRenderData;
}

type INodeCom = typeof React.Component;

class QuesContainer extends React.Component<IProps> {
  render(): JSX.Element {
    const { model } = this.props;
    return (
      <div className="w-full">
        {model.nodes.map((node) => {
          // 节点真实内容交给动态组件渲染
          const NodeComponent = node.template.component as INodeCom;
          return (
            <div
              key={node.renderId}
              id={node.renderId}
              className={
                "mb-8 " +
                (node.readonly && " pl-4 border-l-2 border-gray-500") +
                (node.errorMessage && " pl-4 border-l-2 border-red-700")
              }
            >
              {node.readonly && (
                <div className="font-medium text-gray-600">
                  {T(LANG.general.readonly)}
                </div>
              )}
              {node.errorMessage && (
                <div className="font-medium text-red-700">
                  {node.errorMessage}
                </div>
              )}
              <NodeComponent
                node={node}
                handler={model.handleEvents}
                theme={model.theme}
              />
            </div>
          );
        })}
        {this.renderButton()}
      </div>
    );
  }

  renderButton(): JSX.Element {
    const { model: data } = this.props;
    const { nextButton, prevButton, handleEvents, nextLoading } = data;
    return (
      <div className="my-6">
        {prevButton && (
          <button
            role="button"
            type="button"
            className="inline-flex items-center justify-center px-5 py-3 mr-4 text-base font-medium leading-6 text-indigo-600 bg-white bg-indigo-100 border border-transparent rounded-md hover:text-indigo-500 focus:outline-none focus:shadow-outline"
            onClick={() => {
              handleEvents.handlePrevClick();
            }}
          >
            {prevButton}
          </button>
        )}
        {nextButton && (
          <button
            role="button"
            type="button"
            className="inline-flex items-center justify-center px-5 py-3 text-base font-medium leading-6 text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:shadow-outline"
            onClick={() => {
              handleEvents.handleNextClick();
            }}
          >
            {nextLoading ? 'Loading...' : nextButton}
          </button>
        )}
      </div>
    );
  }
}

export default QuesContainer;
