// static imports
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// relative imports
import * as ROUTES from "./routes";
import useAuthListener from "./utils/useAuthListener";
import { UserContext } from "./context/forUser";
import ProtectedRoute from "./utils/protectedRoute";
// import IsUserAlreadyLoggedIn from "./utils/isUserAlreadyLoggedIn";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/signup"));
const NotFound = lazy(() => import("./pages/not-found"));
const Feed = lazy(() => import("./pages/feed"));
const Profile = lazy(() => import("./pages/profile"));

export default function App() {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>loading ...</p>}>
          <Switch>
            {/* <IsUserAlreadyLoggedIn
              user={user}
              loggedInPath={ROUTES.FEED}
              path={ROUTES.LOGIN}
            >
              <Login />
            </IsUserAlreadyLoggedIn>

            <IsUserAlreadyLoggedIn
              user={user}
              loggedInPath={ROUTES.FEED}
              path={ROUTES.SIGN_UP}
            >
              <SignUp />
            </IsUserAlreadyLoggedIn> */}

            <Route path={ROUTES.LOGIN} component={Login} />
            <Route path={ROUTES.SIGN_UP} component={SignUp} />

            <Route path={ROUTES.PROFILE} component={Profile} />

            <Route path={ROUTES.NOT_FOUND} component={NotFound} />
            <ProtectedRoute user={user} path={ROUTES.FEED} exact>
              <Feed />
            </ProtectedRoute>
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
}
