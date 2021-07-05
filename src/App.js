// static imports
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// relative imports
import "./styles/main.css";
import * as ROUTES from "./routes";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signup"));

function App() {
  return (
    <div className="container flex mx-auto ">
      <Router>
        <Suspense fallback={<p>loading ...</p>}>
          <Switch>
            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
