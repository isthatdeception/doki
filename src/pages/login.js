// static imports
import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router";

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

  return <p>i'm in a login page</p>;
}
