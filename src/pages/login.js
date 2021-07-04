// static imports
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

// relative imports
import { firebaseContext } from "../context/forFirebase";

export default function Login() {
  const history = useHistory();
  const { firebase } = useContext(firebaseContext);

  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  const handleLogin = () => {};

  useEffect(() => {
    document.title = "login-doki";
    return () => {
      /** cleanup */
    };
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
              src="/images/app-resources/logo.png"
              alt="logo"
              className="w-6/12 mt-2 mb-4"
            />
          </h1>
          {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

          <form onSubmit={handleLogin} method="POST">
            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email"
              className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-base"
              onChange={(e) => setEmailAddress(e.target.value)}
            />

            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-base"
              onChange={(e) => setPassword(e.target.value)}
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
            <p className="text-sm font-light text-gray-500">
              Don't have an account yet?{` `}
              <Link to="/signup" className="font-semibold">
                signup
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
