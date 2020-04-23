import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
} from "react-router-dom";
import Main from "./routes/main/index";
import Questions from "./routes/questions";
import Realtime from "./routes/realtime";
import Reward from "./routes/reward";
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
  error: string;
  /**
   * 多语言代号
   */
  locale: string;
  /**
   * 提示消息列表
   */
  notification: { id: number, text: string }[];
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
      notification: []
    };
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
      error: (e) => this.showError(e),
      notify: (e) => this.notify(e),
      locateError: (e) => this.locateError(e),
      setLocale: (e) => this.setLocale(e),
      realTimePreview: location.href.indexOf('/realtime') > -1,
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
          ? <div style={{
            position: 'absolute',
            zIndex: 100,
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            textAlign: 'center',
            background: 'white',
          }}>{this.state.error}</div>
          : null}
        {core.needPreviewFlag
          ? <div style={{ textAlign: 'center' }}>预览测试</div>
          : null}
        <div style={{
          position: 'fixed',
          width: '200px',
          right: '10px',
          background: 'red',
        }}>
          {this.state.notification.map(nt => {
            return <div style={{ border: 'solid 1px black' }}
              key={nt.id}>{nt.text}</div>
          })}
        </div>
        <Switch>
          <Route path="/realtime">
            <Realtime />
          </Route>
          <Route path="/reward">
            <Reward />
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