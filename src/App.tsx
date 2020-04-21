import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Index from "./routes/Index/index";
import Questions from "./routes/Questions";
import Realtime from "./routes/Realtime";
import Reward from "./routes/Reward";

class AppRoute extends React.Component {
  state: { index: number, questions: number }
  constructor(props) {
    super(props);
    this.state = { index: 0, questions: 0 };
  }
  render() {
    return (<Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Index</Link>
            </li>
            <li>
              <Link to="/questions">Questions</Link>
            </li>
            <li>
              <Link to="/realtime">Realtime</Link>
            </li>
            <li>
              <Link to="/reward">Reward</Link>
            </li>
          </ul>
        </nav>
        <ul>
          <li>
            index count: {this.state.index}
          </li>
          <li>
            questions count: {this.state.questions}
          </li>
        </ul>
        <Switch>
          <Route path="/questions">
            <Questions handleAdd={() => {
              this.setState({ questions: this.state.questions + 1 })
            }} handleJump={() => {

            }} />
          </Route>
          <Route path="/realtime">
            <Realtime />
          </Route>
          <Route path="/reward">
            <Reward />
          </Route>
          <Route path="/" render={(routeProps) => {
            return <Index handleAdd={() => {
              this.setState({ index: this.state.index + 1 })
            }} {...routeProps} />
          }}>
          </Route>
        </Switch>
      </div>
    </Router>)
  }
}

const App = <div>
  <AppRoute></AppRoute>
</div>

export default App;