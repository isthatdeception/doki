//static imports
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

// relative imports
import { getSuggestedProfiles } from "../../services/fromFirebase";
import SuggestedProfile from "./suggestedProfile";

export default function Suggestions({ userId, following, loggedInUserDocId }) {
  const [profiles, setProfiles] = useState(null);

  /**
   * get the suggested profiles
   * use the firebase service (call using the userid)
   * getSuggestedProfiles
   * call the async function **** within useEffect
   * store in the state
   * go ahead and render (
   *  wait on the profiles as in the skeleton
   * )
   */

  useEffect(() => {
    async function suggestedProfiles() {
      const response = await getSuggestedProfiles(userId, following);
      setProfiles(response);
    }

    if (userId) {
      suggestedProfiles();
    }
  }, [userId, following]);

  return !profiles ? (
    <Skeleton count={10} height={150} className="mt-5" />
  ) : profiles.length > 0 ? (
    <div className="flex flex-col rounded">
      <div className="flex items-center justify-between mb-2 text-sm">
        <p className="font-bold text-gray-base">you might know</p>
      </div>
      <div className="grid gap-5 mt-4">
        {profiles.map((profile) => (
          <SuggestedProfile
            key={profile.docId}
            profileDocId={profile.docId}
            username={profile.username}
            profileId={profile.userId}
            userId={profile.userId}
            loggedInUserDocId={profile.loggedInUserDocId}
          />
        ))}
      </div>
    </div>
  ) : null;
}

Suggestions.propTypes = {
  userId: PropTypes.string,
  following: PropTypes.array,
  loggedInUserDocId: PropTypes.string,
};
