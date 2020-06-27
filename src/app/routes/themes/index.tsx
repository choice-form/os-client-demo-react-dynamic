import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Core } from "@choiceform/os-client-core";
import NoView from "../../components/no-view";
import QuesContainer from "../../components/ques-container";
import LangList from "../../components/lang-list";
import Timer from "../../components/timer";
import ProgressBar from "../../components/progress-bar";

interface IProps extends RouteComponentProps {
  model: CFRealtime;
}

class Themes extends React.Component<IProps> {
  /**
   * 是否已经初始化
   */
  private initialized: boolean;
  /**
   * 初始化
   */
  init(): void {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    Core.initRealtimePreview();
  }
  /**
   * 渲染
   */
  render(): JSX.Element {
    if (!this.initialized) {
      this.init();
    }
    const { data } = this.props.model;
    if (!data || !data.nodes) {
      return null;
    }
    // 开始页面和奖励页面的预览特殊处理
    if (data.isStart || data.isGift) {
      const DynamicComponent = data.template.component;
      return (
        <div className="container relative flex flex-col flex-grow p-4 mx-auto">
          <div className="flex items-center justify-end mb-4">
            <LangList
              handler={data.handleEvents}
              language={data.language}
              langTable={data.langTable}
            />
          </div>
          <div className="relative flex flex-col items-center justify-center flex-grow">
            <DynamicComponent model={data} />
          </div>
        </div>
      );
      // 其他和正常题目一样
    } else {
      // 无视图节点的预览单独处理
      const node = data.nodes[0];
      return (
        <div className="container relative flex flex-col flex-grow p-4 mx-auto">
          <div className="flex items-center justify-end mb-4">
            <LangList
              handler={data.handleEvents}
              language={data.language}
              langTable={data.langTable}
            />
            {data.limitTime && <Timer time={data.restTime} />}
          </div>
          <div className="relative flex flex-col items-center justify-center flex-grow">
            {data.needProgressBar && <ProgressBar progress={data.progress} />}
            {node.noView ? (
              <NoView node={node} />
            ) : (
              <QuesContainer model={data} />
            )}
          </div>
        </div>
      );
    }
  }
}

export default Themes;
