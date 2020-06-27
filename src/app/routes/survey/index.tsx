import React from "react";
import { RouteComponentProps } from "react-router-dom";
import QuesContainer from "../../components/ques-container";
import PreviewTool from "../../components/preview-tool";
import AnswerResume from "../../components/answer-resume";
import LangList from "../../components/lang-list";
import Timer from "../../components/timer";
import ProgressBar from "../../components/progress-bar";

interface IProps extends RouteComponentProps {
  /**
   * 核心对象
   */
  core: CFCore;
}

interface IState {
  model: CFSurveyState;
}
/**
 * 答题页路由组件
 */
class Survey extends React.Component<IProps, IState> {
  /**
   * 是否已经初始化完成
   */
  private initialized: boolean;
  /**
   * 构造函数
   * @param props 属性
   */
  constructor(props: IProps) {
    super(props);
    this.state = { model: null };
    this.init();
  }
  /**
   * 初始化状态
   */
  async init(): Promise<void> {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    // 获取数据
    const model = await this.props.core.fetchSurveyState();
    this.setState({ model });
  }
  previewToolOpened() {
    const { preview, previewTool } = this.state.model;
    return preview && previewTool && previewTool.opened;
  }
  /**
   * 渲染
   */
  render(): JSX.Element {
    const { model } = this.state;
    // 数据还准备好
    if (!model) {
      return null;
    }
    const answerResumer = model.answerResumer;
    // 考虑断点续答
    if (answerResumer && answerResumer.show) {
      return <AnswerResume model={answerResumer} />;
    }
    return (
      <div className="container relative flex flex-col flex-grow p-4 mx-auto">
        <div className="flex items-center justify-end mb-4">
          {!this.previewToolOpened() && (
            <LangList
              handler={model.handleEvents}
              language={model.language}
              langTable={model.langTable}
            />
          )}
          {!this.previewToolOpened() && model.limitTime && (
            <Timer time={model.restTime} />
          )}

          {model.preview && <PreviewTool model={model.previewTool} />}
        </div>
        {!this.previewToolOpened() && (
          <div className="relative flex flex-col items-center justify-center flex-grow">
            {model.needProgressBar && <ProgressBar progress={model.progress} />}

            <QuesContainer model={model} />
          </div>
        )}
      </div>
    );
  }
}

export default Survey;
