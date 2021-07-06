// static imports
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// relative imports
import * as ROUTES from "./routes";
import useAuthListener from "./utils/useAuthListener";
import { UserContext } from "./context/forUser";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signup"));
const NotFound = lazy(() => import("./pages/not-found"));
const Feed = lazy(() => import("./pages/feed"));

export default function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>loading ...</p>}>
          <Switch>
            <Route exact path={ROUTES.LOGIN} component={Login} />
            <Route exact path={ROUTES.SIGN_UP} component={SignUp} />
            <Route path={ROUTES.NOT_FOUND} component={NotFound} />
            <Route exact path={ROUTES.FEED} component={Feed} />
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}
