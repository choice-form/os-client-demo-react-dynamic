import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Index from "./routes/Index/index";
import Questions from "./routes/Questions";
import Realtime from "./routes/Realtime";
import Reward from "./routes/Reward";

const app = (<Router>
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
    <Switch>
      <Route path="/questions">
        <Questions />
      </Route>
      <Route path="/realtime">
        <Realtime />
      </Route>
      <Route path="/reward">
        <Reward />
      </Route>
      <Route path="/">
        <Index />
      </Route>
    </Switch>
  </div>
</Router>)

export default app;