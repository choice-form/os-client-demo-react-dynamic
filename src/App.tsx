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
import { Core, Util } from '@choiceform/os-client-core'


interface IFullState {
  locale: string;
  counter: number,
  core: CFCoreBase,
}

class App extends React.Component {
  private updateTaskId: number = -1;
  state: IFullState;
  constructor(props) {
    super(props);
    this.state = { counter: 0, locale: 'zh_cn', core: null };
    this.renderMain = this.renderMain.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.updateCounter = this.updateCounter.bind(this);
    this.locateError = this.locateError.bind(this);
    this.showError = this.showError.bind(this);
    this.notify = this.notify.bind(this);
    this.setLocale = this.setLocale.bind(this);
    this.init();
  }

  setLocale(locale) {
    this.setState({ locale })
  }

  locateError() {

  }

  showError() {

  }

  notify() {

  }

  updateCounter() {
    clearTimeout(this.updateTaskId);
    this.updateTaskId = window.setTimeout(() => {
      this.setState({ counter: this.state.counter + 1 });
    })
  }

  async init(): Promise<any> {
    const surveyId = Util.getSidOfStandardUrl();
    const core = await Core.setup({
      setter: this.updateCounter,
      surveyId,
      useWxSdk: true,
      indexUrl: location.origin + '?' + surveyId,
      rewardUrl: location.origin + '/reward?sid=' + surveyId,
      error: this.showError,
      notify: this.notify,
      locateError: this.locateError,
      setLocale: this.setLocale,
      realTimePreview: location.href.indexOf('/realtime') > -1,
    });
    this.setState({
      core: {
        preview: core.preview,
        needPreviewFlag: core.needPreviewFlag,
        intro: core.intro,
        questions: core.questions,
        reward: core.reward,
        realtime: core.realtime,
      } as CFCoreBase
    })
  }

  renderMain(routeProps: RouteComponentProps) {
    return <Main handleAdd={this.updateCounter} {...routeProps} />
  }
  renderQuestions(routeProps: RouteComponentProps) {
    return <Questions handleAdd={this.updateCounter} {...routeProps} />
  }
  render() {
    if (!this.state.core) {
      return <div>loading...</div>
    }
    return (<Router>
      <div>
        <div> counter: {this.state.counter}</div>
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
}

export default App;