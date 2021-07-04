// static imports
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// relative imports
import "./styles/main.css";
import * as ROUTES from "./routes";

const Login = lazy(() => import("./pages/login"));
function App() {
  return (
    <div className="container flex mx-auto ">
      <Router>
        <Suspense fallback={<p>loading ...</p>}>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
