import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { renderQuestions } from '../../templates/questions';

interface IProps extends RouteComponentProps {
  model: CFState;
  requestModel(): Promise<void>;
}

class Questions extends React.Component<IProps> {
  private initialized: boolean;
  render(): JSX.Element {
    const { model } = this.props;
    // 初始情况下检查数据
    if (!this.initialized) {
      this.initialized = true;
      // 如果没有数据,自己要求一下数据
      if (!model) {
        // tslint:disable-next-line:no-floating-promises
        this.props.requestModel();
      }
    }
    if (!model) {
      return <div></div>;
    }
    return renderQuestions(model);
  }
}

export default Questions;