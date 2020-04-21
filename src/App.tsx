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

class App extends React.Component {
  state: { index: number, questions: number }
  constructor(props) {
    super(props);
    this.state = { index: 1, questions: 1 };
    this.renderMain = this.renderMain.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
  }
  renderMain(routeProps: RouteComponentProps) {
    return <Main handleAdd={() => {
      this.setState({ index: this.state.index + 1 })
    }} {...routeProps} />
  }
  renderQuestions(routeProps: RouteComponentProps) {
    return <Questions handleAdd={() => {
      this.setState({ questions: this.state.questions + 1 })
    }} {...routeProps} />
  }
  render() {
    return (<Router>
      <div>
        <ul>
          <li>
            index: {this.state.index}
          </li>
          <li>
            questions: {this.state.questions}
          </li>
        </ul>
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