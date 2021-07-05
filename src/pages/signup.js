// static imports
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

// relative imports
import { firebaseContext } from "../context/forFirebase";
import * as ROUTES from "../routes";
import { doesUsernameExists } from "../utils/doesUsernameExists";

export default function SignUp() {
  const history = useHistory();
  const { firebase } = useContext(firebaseContext);

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const isInvalid = password === "" || emailAddress === "";

  /**
   *
   * @param {*} event
   * handling the sign up for the page
   */
  const handleSignUp = async (event) => {
    event.preventDefault();

    const usernameExists = await doesUsernameExists(username);
    // console.log(`usernameExists.length ${usernameExists.length}`);

    /**
     * does username exists returns back an array if the username exists
     * so if the username array is empty we will fill it anew by allowing to the username
     * to the firebase
     */
    if (!usernameExists.length) {
      try {
        const createdUser = await firebase
          .auth()
          .createUserWithEmailAndPassword(emailAddress, password);

        /**
         * authentication
         * emailAddress & password & username (display name)
         */
        await createdUser.user.updateProfile({
          displayName: username,
        });

        // creating a new firebase document for the user
        await firebase.firestore().collection("users").add({
          userId: createdUser.user.uid,
          username: username.toLowerCase(),
          fullName,
          emailAddress: emailAddress.toLowerCase(),
          following: [],
          dateCreated: Date.now(),
        });

        history.push(ROUTES.FEED);
      } catch (err) {
        console.log(`error occured on handleSignup ${err.message}`);

        setUsername("");
        setFullName("");
        setEmailAddress("");
        setPassword("");
        setError(err.message);
      }
    } else {
      setError("That username is already taken please try another");
    }
  };

  useEffect(() => {
    document.title = "signup-doki";
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
          {error && <p className="mb-4 text-xs text-red-600">!! {error}</p>}

          <form onSubmit={handleSignUp} method="POST">
            <input
              aria-label="Enter your username"
              type="text"
              placeholder="Username"
              className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-base"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />

            <input
              aria-label="Enter your fullname"
              type="text"
              placeholder="Fullname"
              className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-base"
              onChange={(e) => setFullName(e.target.value)}
              value={fullName}
            />

            <input
              aria-label="Enter your email address"
              type="text"
              placeholder="Email"
              className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-base"
              onChange={(e) => setEmailAddress(e.target.value)}
              value={emailAddress}
            />

            <input
              aria-label="Enter your password"
              type="password"
              placeholder="Password"
              className="w-full h-2 px-4 py-5 mb-2 mr-3 text-sm border border-transparent rounded focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent text-gray-base"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />

            <button
              disabled={isInvalid}
              className={`w-full h-8 font-semibold text-white bg-purple-600 rounded-md center hover:bg-purple-700 focus:outline-none ${
                isInvalid && "opacity-50"
              }`}
              type="submit"
            >
              signup
            </button>
          </form>
          <div className="flex flex-col items-center justify-center w-full p-4 mt-4 bg-white border rounded border-gray-primary ">
            <p className="text-sm font-light text-gray-400">
              Already have an account?{` `}
              <Link
                to={ROUTES.LOGIN}
                className="font-semibold text-blue-500 hover:text-blue-700"
              >
                login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
