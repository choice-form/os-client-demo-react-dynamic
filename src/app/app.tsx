import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
} from "react-router-dom";
import Main from "./routes/main";
import Questions from "./routes/questions";
import Themes from "./routes/themes";
import Reward from "./routes/reward";
import { Core, Util, EventHub } from '@choiceform/os-client-core'
import CF_CONFIG from "config";
import './app.scss';

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
  error: string;
  /**
   * 多语言代号
   */
  locale: string;
  /**
   * 提示消息列表
   */
  notification: { id: number, text: string }[];
  /**
   * 全局主题信息
   */
  theme: CFTheme;
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
   * 提示信息是否被挂起
   */
  private notifySuspended: boolean;
  /**
   * 更新任务id
   */
  private updateTaskId: number = -1;
  /**
   * 构造函数
   */
  constructor(props: any) {
    super(props);
    this.state = {
      locale: 'zh_cn',
      core: null,
      error: '',
      notification: [],
      theme: null,
    };
    // tslint:disable-next-line:no-floating-promises
    this.init();
  }
  /**
   * 获取动态组件所在路径
   */
  getTemplatePath(): string {
    // 本地开发模式
    if (location.origin.match(/(?:localhost|(?:\d{1,3}\.){3}\w{1,3})/)) {
      return location.origin;
    }
    return CF_CONFIG.cdnHost + '/os-client-live';
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
      clientName: 'Live',
      dynamic: true,
      treeUrl: location.origin + '/tree.json',
      templatePath: this.getTemplatePath(),
      surveyId,
      useWxSdk: true,
      indexUrl: location.origin + '?' + surveyId,
      rewardUrl: location.origin + '/reward?sid=' + surveyId,
      error: (e) => this.showError(e),
      notify: (e) => this.notify(e),
      locateError: (e) => this.locateError(e),
      setLocale: (e) => this.setLocale(e),
      suspendNotify: () => this.suspendNotify(),
      resumeNotify: () => this.resumeNotify(),
      realTimePreview: location.href.indexOf('/themes') > -1,
      setTheme: (e) => this.setTheme(e),
      hostConfig: CF_CONFIG,
    });
    // 驱动初始更新
    this.updateCore()
    // 每当核心数据发生变化时,再次驱动更新
    EventHub.on('SET_PROPS', () => this.updateCore())
  }
  /**
   * 定位错误
   */
  locateError(e: CFValidateResult): void {
    const { dueToNode } = e;
    if (dueToNode) {
      const element = document.getElementById(dueToNode.renderId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
  /**
   * 显示提示消息
   * @param text 提示消息
   */
  notify(text: string): void {
    if (this.notifySuspended) {
      return;
    }
    const item = { id: Math.random(), text };
    this.setState({ notification: [...this.state.notification, item] })
    setTimeout(() => {
      this.setState({
        notification: this.state.notification.filter(a => a !== item)
      });
    }, 2000);
  }
  /**
   * 渲染页面
   */
  render(): JSX.Element {
    const { core } = this.state;
    // 核心还未完成初始化
    if (!core) {
      return <div></div>
    }

    return (<Router>
      <div>
        {this.state.error
          ? <div className='global-error'>
            {this.state.error}
          </div>
          : null}
        {core.needPreviewFlag
          ? <div className='preview-flag'>预览测试</div>
          : null}
        <div className='global-notification'>
          {this.state.notification.map(nt => {
            return <div className='notification-item'
              key={nt.id}>{nt.text}</div>
          })}
        </div>
        <Switch>
          <Route path="/themes"
            render={(e) => this.renderThemes(e)}>
          </Route>
          <Route path="/reward"
            render={(e) => this.renderReward(e)}>
          </Route>
          <Route path="/questions"
            render={(e) => this.renderQuestions(e)}>
          </Route>
          <Route path="/"
            render={(e) => this.renderMain(e)}>
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
      requestModel={() => this.requestMainModel()}
      requestQuestions={(e) => this.requestQuestionsModel(e)}
      model={this.state.core.intro}
      {...routeProps} />
  }
  /**
   * 渲染答题页面
   * @param routeProps 路由属性
   */
  renderQuestions(routeProps: RouteComponentProps): JSX.Element {
    return <Questions
      requestModel={() => this.requestQuestionsModel()}
      model={this.state.core.questions}
      {...routeProps} />
  }
  /**
   * 渲染奖励页面
   * @param routeProps 路由属性
   */
  renderReward(routeProps: RouteComponentProps): JSX.Element {
    return <Reward
      requestModel={() => this.requestRewardModel()}
      model={this.state.core.reward}
      {...routeProps}></Reward>
  }
  /**
   * 渲染主题实时预览页面
   * @param routeProps 路由属性
   */
  renderThemes(routeProps: RouteComponentProps): JSX.Element {
    return <Themes
      model={this.state.core.realtime}
      {...routeProps}></Themes>
  }
  /**
   * 请求首页数据
   */
  async requestMainModel(): Promise<void> {
    await this.core.fetchIntro();
    this.updateCore();
  }
  /**
   * 请求答题页数据
   * @param silent 静默模式不会更新状态
   */
  async requestQuestionsModel(silent?: boolean): Promise<void> {
    await this.core.fetchQuestions();
    if (!silent) {
      this.updateCore();
    }
  }
  /**
   * 请求奖励页数据
   */
  async requestRewardModel(): Promise<void> {
    await this.core.fetchReward();
    this.updateCore();
  }
  /**
   * 将提示消息从挂起状态中恢复过来,之后的提示消息会恢复显示
   */
  resumeNotify(): void {
    this.notifySuspended = false;
  }
  /**
   * 切换语言
   * @param locale
   */
  setLocale(locale: string): void {
    this.setState({ locale })
  }
  /**
   * 设置主题
   * @param theme 主题
   */
  setTheme(theme: CFTheme): void {
    this.setState({ theme });
  }
  /**
   * 显示错误消息
   * @param text
   */
  showError(text: string): void {
    this.setState({ error: text })
  }
  /**
   * 将提示信息挂起,直到恢复之前,任何提示信息都不会被显示出来.
   */
  suspendNotify(): void {
    this.notifySuspended = true;
  }
  /**
   * 驱动核心数据上的变化到页面中
   * 因为核心数据的变化是sdk中发生的,react对他是无感的
   * 需要我们从根部驱动一下
   * 同一进程中的同步更改所调用的更新会被合并到最后一个来减压
   */
  updateCore(): void {
    clearTimeout(this.updateTaskId);
    this.updateTaskId = window.setTimeout(() => {
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
    })
  }
}

export default App;