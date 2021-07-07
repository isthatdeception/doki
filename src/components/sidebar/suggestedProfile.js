// static imports
import { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

// relaitve imports
import {
  updateLoggedInUserFollowing,
  updateFollowedUserFollowers,
} from "../../services/fromFirebase";

export default function SuggestedProfile(
  profileDocId,
  userId,
  username,
  profileId,
  loggedInUserDocId
) {
  /**
   * when a user follow the account
   * the suggested user bar should automatically update the whole bar and remove the user
   * that just we followed
   */
  const [followed, setFollowed] = useState(false);

  async function handleFollow() {
    setFollowed(true);

    /**
     * firebase create 2 services
     * update the following array of the logged in user
     * update the followers array of the user one followed
     */

    console.log(username);

    await updateLoggedInUserFollowing(loggedInUserDocId, profileId, false);

    await updateFollowedUserFollowers(profileDocId, userId, false);
  }

  return !followed ? (
    <div className="flex flex-row items-center justify-between align-items">
      <div className="flex items-center justify-center">
        <img
          src={`/images/mock-avatars/${username}.jpg`}
          alt={`mock-avatar-of-${username}`}
          className="flex w-8 mr-3 rounded-full"
        />

        <Link to={`/p/${username}`}>
          <p className="text-sm font-bold">{username}</p>
        </Link>
      </div>
      <div>
        <button
          className="text-xs font-bold text-blue-medium"
          type="button"
          onClick={handleFollow}
        >
          follow
        </button>
      </div>
    </div>
  ) : null;
}

SuggestedProfile.propTypes = {
  profileDocId: PropTypes.string.isRequired,
  userId: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  profileId: PropTypes.string.isRequired,
  loggedInUserDocId: PropTypes.string.isRequired,
};
