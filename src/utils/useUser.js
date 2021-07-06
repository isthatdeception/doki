// static
import { useState, useContext, useEffect } from "react";

// relative
import { UserContext } from "../context/forUser";
import { getUserByUserId } from "../services/fromFirebase";

export default function useUser() {
  const [activeUser, setActiveUser] = useState({});
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function getUserObjByUserId() {
      /**
       * we need a function that will call the firebase and fetch the data related to the user
       * by thier ids
       */
      const [response] = await getUserByUserId(user.uid);
      setActiveUser(response);
    }
    if (user?.uid) {
      getUserObjByUserId();
    }
  }, [user]);

  return { user: activeUser };
}
