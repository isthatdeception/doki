/**
 * main component file for the profile component
 */

// static imports
import { useReducer, useEffect } from "react";
import PropTypes from "prop-types";

// relative imports
import Header from "./header";
import Profile from "../../pages/profile";
import { getUserPhotosByUsername } from "../../services/fromFirebase";

export default function UserProfile({ user }) {
  const reducer = (state, newState) => ({ ...state, ...newState });

  const initialState = {
    profile: {},
    photosBucket: [],
    followerCount: 0,
  };

  const [{ profie, photoBucket, followerCount }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    async function getUserProfileAndPhotos() {
      const photos = await getUserPhotosByUsername(user.username);

      dispatch({
        profile: user,
        photosBucket: photos,
        followerCount: user.followers.length,
      });
    }

    getUserProfileAndPhotos();
  }, [user]);
  return (
    <>
      <Header />
      <p>i am the user profile component as in the whole</p>
      <p>hello {user.username}</p>
      <p>todo: bio of the user</p>
    </>
  );
}

Profile.propTypes = {
  user: PropTypes.shape({
    emailAddress: PropTypes.string.isRequired,
    followers: PropTypes.array.isRequired,
    following: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired,
  }).isRequired,
};
