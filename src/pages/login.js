// static imports
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

// relative imports
import { FirebaseContext } from "../context/forFirebase";
import * as ROUTES from "../routes";

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
      history.push(ROUTES.FEED);
    } catch (err) {
      setEmailAddress("");
      setPassword("");
      setError(err.message);
    }
  };

  useEffect(() => {
    document.title = "login-doki";
  }, []);

  return (
    <>
      <div className="container flex items-center h-screen max-w-screen-md mx-auto my-auto">
        <div className="flex w-3/5">
          <img
            src="/images/app-resources/instapro.png"
            alt="iphone-with-profile"
          />
        </div>
        <div className="flex flex-col items-center w-2/5 p-4 mb-4 border rounded boder-gray-primary">
          <h1 className="flex justify-center w-full">
            <img
              src="/images/app-resources/logopro.png"
              alt="logo"
              className="w-6/12 mt-2 mb-4"
            />
          </h1>
          {error && (
            <div className="flex text-center align-items text-red-primary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="flex mb-2 mr-2 text-xs font-semibold align-middle">
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleLogin} method="POST">
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email"
              className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-base"
              onChange={(e) => setEmailAddress(e.target.value)}
              value={emailAddress}
              autoComplete="email"
            />

            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-base"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="current-password"
            />

            <button
              disabled={isInvalid}
              className={`w-full h-8 font-semibold text-white bg-purple-600 rounded-md center hover:bg-purple-700 focus:outline-none ${
                isInvalid && "opacity-50"
              }`}
              type="submit"
            >
              login
            </button>
          </form>
          <div className="flex flex-col items-center justify-center w-full p-4 mt-4 bg-white border rounded border-gray-primary ">
            <p className="text-sm font-light text-gray-400">
              Don't have an account yet?{` `}
              <Link
                to={ROUTES.SIGN_UP}
                className="font-semibold text-blue-500 hover:text-blue-700"
              >
                signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
