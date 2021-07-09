// static imports
import { useState, useEffect, useContext } from "react";

// relative imports
import { UserContext } from "../context/forUser";
import { getUserByUserId, getPhotos } from "../services/fromFirebase";

export const usePhotos = () => {
  const [photos, setPhotos] = useState(null);

  const {
    user: { uid: userId = "" },
  } = useContext(UserContext);

  useEffect(() => {
    async function getTimelinePhotos() {
      const [{ following }] = await getUserByUserId(userId);
      let followedUserPhotos = [];
      // [2, 11, 4]

      console.log(`following: ${following}`);

      if (following?.length > 0) {
        followedUserPhotos = await getPhotos(userId, following);
      }

      followedUserPhotos.sort((a, b) => b.dateCreated - a.dateCreated);
      setPhotos(followedUserPhotos);
    }

    getTimelinePhotos();
  }, [userId]);

  return { photos };
};
