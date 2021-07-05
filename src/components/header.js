// static import
import { useContext } from "react";
import { Link } from "react-router-dom";

// relative imports
import { FirebaseContext } from "../context/forFirebase";
import { UserContext } from "../context/forUser";
import * as ROUTES from "../routes";

export default function Header() {
  /**
   * most working component
   */
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

  return (
    <header className="h-16 mb-8 bg-white border-b border-gray-primary">
      <div className="container h-full max-w-screen-lg mx-auto">
        <div className="flex justify-between h-full">
          <div className="flex items-center w-full text-center text-gray-700 cursor-pointer align-items">
            <h1 className="flex justify-center w-12">
              <Link to={ROUTES.FEED}>
                <img src="/images/app-resources/logopro.png" alt="logo" />
              </Link>
            </h1>
            <h1 className="flex justify-center mt-2 ml-2 w-28">
              <Link to={ROUTES.FEED}>
                <img
                  src="/images/app-resources/letterslogopro.png"
                  alt="letterslogo"
                />
              </Link>
            </h1>
          </div>

          <div className="flex items-center text-center text-gray-700 align-items">
            {user ? (
              <>
                <Link to={ROUTES.FEED} aria-label="Feed" title="home">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-6 mr-6 cursor-pointer text-black-light"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>

                <button
                  type="button"
                  title="signout"
                  onClick={() => firebase.auth().signOut()}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      firebase.auth().signOut();
                    }
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-8 h-6 mr-6 cursor-pointer text-black-light"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>

                {/** rounded profile picture */}
                <div className="flex items-center cursor-pointer">
                  <Link to={`/p/${user.displayName}`}>
                    <img
                      src={`/images/mock-avatars/${user.displayName}.jpg`}
                      alt={`{user.displayName} profile`}
                      className="flex w-8 h-6 rounded-full"
                    />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to={ROUTES.LOGIN}>
                  <button
                    type="button"
                    title="login"
                    className="w-20 h-8 text-sm font-semibold text-white rounded bg-blue-medium"
                  >
                    login
                  </button>
                </Link>
                <Link to={ROUTES.SIGN_UP}>
                  <button
                    type="button"
                    title="signup"
                    className="w-20 h-8 text-sm font-semibold text-blue-medium"
                  >
                    signup
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
