/**
 * checking that user is already logged in
 */

// static import
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";

export default function IsUserAlreadyLoggedIn({
  user,
  loggedInPath,
  children,
  ...rest
}) {
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (user) {
          return children;
        }
        console.log(`==============info from the isUserAlreadyLoggedIn starts`);
        console.log(`location ${location}`);
        console.log(`loggedInPath ${loggedInPath}`);
        console.log(`children ${children}`);
        console.log(`====================================== info ends`);

        if (!user) {
          return (
            <Redirect
              to={{
                pathname: loggedInPath,
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

IsUserAlreadyLoggedIn.propTypes = {
  user: PropTypes.object,
  loggedInpath: PropTypes.string.isRequired,
  children: PropTypes.object.isRequired,
};
