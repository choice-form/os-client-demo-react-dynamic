import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import QuesContainer from '../../components/ques-container';
import { Core } from '@choiceform/os-client-core';
import PreviewTool from '../../components/preview-tool';

interface IProps extends RouteComponentProps {
  model: CFState;
  requestModel(): Promise<void>;
}

class Questions extends React.Component<IProps> {
  private initialized: boolean;
  async init(): Promise<void> {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    // 如果没有数据,自己要求一下数据
    if (!this.props.model) {
      await this.props.requestModel();
    }
    // 稍后准备微信分享
    setTimeout(() => {
      Core.prepareWxShare(this.props.model);
    }, 500)
  }
  render(): JSX.Element {
    const { model } = this.props;
    // 初始情况下检查数据
    if (!this.initialized) {
      this.init();
    }
    if (!model) {
      return <div></div>;
    }
    return <div>
      {model.preview ? <PreviewTool model={model.previewTool} /> : null}
      <QuesContainer data={model} />
    </div>;
  }
}

export default Questions;