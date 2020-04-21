import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
} from "react-router-dom";
import Main from "./routes/Main/index";
import Questions from "./routes/Questions";
import Realtime from "./routes/Realtime";
import Reward from "./routes/Reward";
import { Core, Util, EventHub } from '@choiceform/os-client-core'
import CF_CONFIG from "config";

/**
 * 引用程序根状态
 */
interface IFullState {
  /**
   * 核心数据
   */
  core: CFCoreBase,
  /**
   * 错误消息
   */
  error?: string;
  /**
   * 多语言代号
   */
  locale: string;
  /**
   * 提示消息
   */
  notification?: string;
}
/**
 * 应用程序根组件
 */
class App extends React.Component<any, IFullState> {
  /**
   * 答题核心对象
   */
  private core: CFCore;
  /**
   * 构造函数
   */
  constructor(props: any) {
    super(props);
    this.state = { locale: 'zh_cn', core: null };
    this.renderMain = this.renderMain.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.updateCore = this.updateCore.bind(this);
    this.locateError = this.locateError.bind(this);
    this.showError = this.showError.bind(this);
    this.notify = this.notify.bind(this);
    this.setLocale = this.setLocale.bind(this);
    this.requestMainModel = this.requestMainModel.bind(this);
    this.requestQuestionsModel = this.requestQuestionsModel.bind(this);
    this.requestRewardModel = this.requestRewardModel.bind(this);
    this.init();
  }
  /**
   * 初始化答题核心
   */
  async init(): Promise<void> {
    if (this.core) {
      return
    }
    const surveyId = Util.getSidOfStandardUrl();
    this.core = await Core.setup({
      surveyId,
      useWxSdk: true,
      indexUrl: location.origin + '?' + surveyId,
      rewardUrl: location.origin + '/reward?sid=' + surveyId,
      error: this.showError,
      notify: this.notify,
      locateError: this.locateError,
      setLocale: this.setLocale,
      realTimePreview: location.href.indexOf('/realtime') > -1,
      hostConfig: CF_CONFIG,
    });
    // 驱动初始更新
    this.updateCore()
    // 每当核心数据发生变化时,再次驱动更新
    EventHub.on('SET_PROPS', this.updateCore)
  }
  /**
   * 定位错误
   */
  locateError(): void {
    // 后续实现
  }
  /**
   * 显示提示消息
   * @param text 提示消息
   */
  notify(text: string): void {
    this.setState({ notification: text })
  }
  /**
   * 渲染页面
   */
  render(): JSX.Element {
    // 核心还未完成初始化
    if (!this.state.core) {
      return <div>loading...</div>
    }
    return (<Router>
      <div>
        <Switch>
          <Route path="/realtime">
            <Realtime />
          </Route>
          <Route path="/reward">
            <Reward />
          </Route>
          <Route path="/questions"
            render={this.renderQuestions}>
          </Route>
          <Route path="/"
            render={this.renderMain}>
          </Route>
        </Switch>
      </div>
    </Router>)
  }
  /**
   * 渲染首页
   * @param routeProps 路由属性
   */
  renderMain(routeProps: RouteComponentProps): JSX.Element {
    return <Main
      requestModel={this.requestMainModel}
      model={this.state.core.intro}
      {...routeProps} />
  }
  /**
   * 渲染答题页面
   * @param routeProps 路由属性
   */
  renderQuestions(routeProps: RouteComponentProps): JSX.Element {
    return <Questions model={this.state.core.questions} {...routeProps} />
  }
  /**
   * 请求首页数据
   */
  requestMainModel(): void {
    if (this.core) {
      this.core.fetchIntro().then(this.updateCore);
    }
  }
  /**
   * 请求答题页数据
   */
  requestQuestionsModel(): void {
    if (this.core) {
      this.core.fetchQuestions().then(this.updateCore);
    }

  }
  /**
   * 请求奖励页数据
   */
  requestRewardModel(): void {
    if (this.core) {
      this.core.fetchReward().then(this.updateCore);
    }
  }
  /**
   * 切换语言
   * @param locale
   */
  setLocale(locale: string): void {
    this.setState({ locale })
  }
  /**
   * 显示错误消息
   * @param text
   */
  showError(text: string): void {
    this.setState({ error: text })
  }
  /**
   * 驱动核心数据上的变化到页面中
   * 因为核心数据的变化是sdk中发生的,react对他是无感的
   * 需要我们从根部驱动一下
   */
  updateCore(): void {
    this.setState({
      core: {
        preview: this.core.preview,
        needPreviewFlag: this.core.needPreviewFlag,
        intro: this.core.intro,
        questions: this.core.questions,
        reward: this.core.reward,
        realtime: this.core.realtime,
      }
    });
  }
}

export default App;