/**
 * protected route
 */

// static import
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

// relative import
import * as ROUTES from "../routes";

export default function ProtectedRoute({ user, children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return children;
        }

        if (!user) {
          return (
            <Redirect
              to={{
                pathname: ROUTES.LOGIN,
                state: { from: location },
              }}
            />
          );
        }

        // if by any  chance we do not hit both cases then we will return null
        return null;
      }}
    />
  );
}

ProtectedRoute.propTypes = {
  user: PropTypes.object,
  children: PropTypes.object.isRequired,
};
