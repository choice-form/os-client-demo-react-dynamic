import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Util } from '@choiceform/os-client-core'
interface IProps extends RouteComponentProps {
  model: CFIntro;
  requestModel(): void;
  requestQuestions(silent?: boolean): Promise<void>;
}

interface IState {
  nextLoading: boolean;
}
class Main extends React.Component<IProps, IState> {
  /**
   * 是否已经进行了首次渲染
   */
  private initialized: boolean;
  state: IState;
  constructor(props: IProps) {
    super(props);
    this.state = { nextLoading: false };
  }
  /**
   * 去往答题页面
   * @param silent 静默模式不会更新状态
   */
  private async gotoQuestions(silent?: boolean): Promise<void> {
    // 去之前先拿帮答题页拿好数据,同时显示loading状态
    // 这样可以避免答题页面临时拿数据出现空白
    if (!silent) {
      this.setState({ nextLoading: true });
    }
    await this.props.requestQuestions(silent)
    if (!silent) {
      this.setState({ nextLoading: false });
    }

    const url = Util.getQuestionsPageUrl('questions')
      .replace(location.origin, '.');
    this.props.history.replace(url)
  }
  /**
   * 渲染页面
   */
  render(): JSX.Element {
    const { model } = this.props;
    if (!this.initialized) {
      this.initialized = true;
      this.props.requestModel();
    }
    if (!model) {
      return <div>Loading</div>
    }
    // 自动跳过首页开始答题的情况下
    if (model.startAuto) {
      this.gotoQuestions(true);
      return <div></div>;
    }

    return <div>
      {model.images.map(image => {
        return <img src={image.large}
          key={image.id}
          title={image.originName}
        ></img>
      })}
      <h1>{model.title}</h1>
      <p>{model.summary}</p>
      <button onClick={() => this.gotoQuestions()}>
        {this.state.nextLoading ? 'Loading' : model.nextButton}
      </button>
    </div>
  }
}

export default Main;