/**
 * dynamic profile
 * every user would have the same username but differnt account and also one can also
 * see other's account
 */

// static import
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";

// relative import
import { getUserProfileByUsername } from "../services/fromFirebase";
import * as ROUTES from "../routes";
import Header from "../components/header";
import UserProfile from "../components/profile/main";

export default function Profile() {
  const { username } = useParams();
  const history = useHistory();

  const [userExists, setUserExists] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUserExists() {
      const user = await getUserProfileByUsername(username);

      if (user.length > 0) {
        setUser(user[0]);
        setUserExists(true);
      } else {
        history.push(ROUTES.NOT_FOUND);
      }
    }

    checkUserExists();
  }, [username, history]);

  return userExists ? (
    <div className="bg-gray-background">
      <Header />
      <div className="max-w-screen-lg mx-auto">
        <UserProfile user={user} />
      </div>
    </div>
  ) : null;
}
