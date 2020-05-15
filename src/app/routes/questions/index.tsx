import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import QuesContainer from '../../components/ques-container';
import { Core } from '@choiceform/os-client-core';
import PreviewTool from '../../components/preview-tool';
import AnswerResume from '../../components/answer-resume';

interface IProps extends RouteComponentProps {
  /**
   * 核心对象
   */
  core: CFCore
}

interface IState {
  model: CFState;
}
/**
 * 答题页路由组件
 */
class Questions extends React.Component<IProps, IState> {
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
    console.log('questions construction');
    const oldSetter = this.setState;
    this.setState = (data: any) => {
      console.log('questions set state');
      oldSetter.call(this, data);
    }
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
    const model = await this.props.core.fetchQuestions();
    this.setState({ model })
    // 稍后准备微信分享
    setTimeout(() => {
      Core.prepareWxShare();
    }, 500)
  }
  /**
   * 渲染
   */
  render(): JSX.Element {
    console.log('questions render');
    const { model } = this.state;
    // 数据还准备好
    if (!model) {
      return null;
    }
    // 考虑断点续答
    if (model.memoryTool && model.memoryTool.show) {
      return <AnswerResume model={model.memoryTool} />
    }
    return <div>
      {model.preview ? <PreviewTool model={model.previewTool} /> : null}
      <QuesContainer model={model} />
    </div>;
  }
}

export default Questions;