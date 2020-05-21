import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import QuesContainer from '../../components/ques-container';
import PreviewTool from '../../components/preview-tool';
import AnswerResume from '../../components/answer-resume';
import LangList from '../../components/lang-list';

interface IProps extends RouteComponentProps {
  /**
   * 核心对象
   */
  core: CFCore
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
    this.setState({ model })
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
    // 考虑断点续答
    if (model.answerResumer && model.answerResumer.show) {
      return <AnswerResume model={model.answerResumer} />
    }
    return <div>
      {model.preview ? <PreviewTool model={model.previewTool} /> : null}
      <LangList handler={model.handleEvents}
        language={model.language} langTable={model.langTable} />
      <QuesContainer model={model} />
    </div>;
  }
}

export default Survey;