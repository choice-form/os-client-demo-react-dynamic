import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  RouteComponentProps,
} from "react-router-dom";
import Main from "./routes/main";
import Survey from "./routes/survey";
import Themes from "./routes/themes";
import Reward from "./routes/reward";
import { Core, EventHub } from '@choiceform/os-client-core'
import CF_CONFIG from "config";
import './app.scss';
import { setLocale, T } from "../utils/i18n";
/**
 * 引用程序根状态
 */
interface IFullState {
  /**
   * 核心数据
   */
  core: CFCore,
  /**
   * 错误消息
   */
  error: string;
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
   * 提示信息是否被挂起
   */
  private notifySuspended: boolean;
  /**
   * 构造函数
   */
  constructor(props: any) {
    super(props);
    this.state = {
      core: null,
      error: '',
      notification: [],
    };
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
    if (this.state.core) {
      return
    }
    const core = await Core.setup({
      clientName: 'ALL',
      dynamic: true,
      treeUrl: location.origin + '/tree.json',
      templatePath: this.getTemplatePath(),
      useWxSdk: true,
      error: (e) => this.showError(e),
      notify: (e) => this.notify(e),
      locateError: (e) => this.locateError(e),
      setLocale: (e) => this.setLocale(e),
      suspendNotify: () => this.suspendNotify(),
      resumeNotify: () => this.resumeNotify(),
      hostConfig: CF_CONFIG,
    });
    // 驱动初始更新
    this.setState({ core });
    // 每当核心数据发生变化时,再次驱动更新
    EventHub.on('SET_PROPS', () => {
      this.setState({});
    })
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
    // 推入错误消息
    this.setState({ notification: [...this.state.notification, item] })
    // 两秒后去掉错误消息
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
    const theme = core.getTheme();
    return (<Router>
      <div>
        {this.state.error
          ? <div className='global-error'>
            {this.state.error}
          </div>
          : null}
        {core.needPreviewFlag
          ? <div className='preview-flag'
            style={{ background: theme.contrast }}>
            {T(LANG.preview.title)}
          </div>
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
          <Route path="/survey"
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
    return <Main {...routeProps}
      core={this.state.core}
    />
  }
  /**
   * 渲染答题页面
   * @param routeProps 路由属性
   */
  renderQuestions(routeProps: RouteComponentProps): JSX.Element {
    return <Survey {...routeProps}
      core={this.state.core} />
  }
  /**
   * 渲染奖励页面
   * @param routeProps 路由属性
   */
  renderReward(routeProps: RouteComponentProps): JSX.Element {
    return <Reward {...routeProps}
      core={this.state.core} />
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
    setLocale(locale);
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
}

export default App;