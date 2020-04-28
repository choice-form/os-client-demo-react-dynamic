import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Util } from '@choiceform/os-client-core'
interface IProps extends RouteComponentProps {
  model: CFIntro;
  requestModel(): Promise<void>;
  requestQuestions(silent?: boolean): Promise<void>;
}
class Main extends React.Component<IProps> {
  /**
   * 是否已经进行了首次渲染
   */
  private initialized: boolean;
  constructor(props: IProps) {
    super(props);
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
   * 初始化数据
   */
  private async init(): Promise<void> {
    if (this.initialized) {
      return;
    }
    this.initialized = true;
    await this.props.requestModel();
    // 首页下一题的行为会切换理由,核心包是无法处理的,这里修改一下这个处理器
    // 由本路由自己处理
    // 因为成功收到数据后上层setState之后才会让本路由的model得到更新
    // 而setState造成的结果是非同步的,所以我们这里稍后再设置处理器
    // 否则model还没有更新进来
    setTimeout(() => {
      this.props.model.setNextHander(() => {
        // tslint:disable-next-line:no-floating-promises
        this.gotoQuestions();
      })
    });
  }
  /**
   * 渲染页面
   */
  render(): JSX.Element {
    const { model } = this.props;
    if (!this.initialized) {
      // tslint:disable-next-line:no-floating-promises
      this.init();
    }
    if (!model) {
      return <div>Loading</div>
    }
    // 自动跳过首页开始答题的情况下
    if (model.startAuto) {
      // tslint:disable-next-line:no-floating-promises
      this.gotoQuestions(true);
      return null;
    }
    // 交给动态模板渲染,开始页面和节点不同,直接传入整个model
    const StartComponent = model.template.component;
    return <div>
      <StartComponent model={model} />
    </div>
  }
}

export default Main;