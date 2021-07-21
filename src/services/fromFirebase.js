import { FieldValue, firebase } from "../lib/firebase";

/**
 *
 * @param {string} username
 * @returns an boolean value of true and false if the user exists
 */
export async function doesUsernameExists(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  return result.docs.length > 0;
}

/**
 *
 * @param {string} username
 * @returns actual user and if it doesn't, return false
 *
 */
export async function getUserProfileByUsername(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}

/**
 *
 * @param {string} userId
 * @returns user
 *
 */
export async function getUserByUserId(userId) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("userId", "==", userId)
    .get();

  const user = result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));

  return user;
}

/**
 *
 * @param {string} userId
 * @param {array<number | []>} following
 * @returns suggested profiles as an array
 *
 */
export async function getSuggestedProfiles(userId, following) {
  const result = await firebase.firestore().collection("users").limit(10).get();

  return result.docs
    .map((user) => ({ ...user.data(), docId: user.id }))
    .filter(
      (profile) =>
        profile.userId !== userId && !following?.includes(profile.userId)
    );
}

/**
 *
 * @param {string} loggedInUserDocId
 * @param {string} profileId
 * @param {boolean} isFollowingProfile
 * @returns an updated array of the following users of the currently logged in user
 */
export async function updateLoggedInUserFollowing(
  loggedInUserDocId, // currently logged in user document id
  profileId, // user that one needs to follow
  isFollowingProfile // true/false (do one is already following this person )
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(loggedInUserDocId)
    .update({
      following: isFollowingProfile
        ? FieldValue.arrayRemove(profileId)
        : FieldValue.arrayUnion(profileId),
    });
}

/**
 *
 * @param {string} profileDocId
 * @param {string} loggedInUserDocId
 * @param {boolean} isFollowingProfile
 * @returns an uodated user followers of the currently logged in account
 */
export async function updateFollowedUserFollowers(
  profileDocId,
  loggedInUserDocId,
  isFollowingProfile
) {
  return firebase
    .firestore()
    .collection("users")
    .doc(profileDocId)
    .update({
      followers: isFollowingProfile
        ? FieldValue.arrayRemove(loggedInUserDocId)
        : FieldValue.arrayUnion(loggedInUserDocId),
    });
}

/**
 *
 * @param {string} userId
 * @param {boolean} following
 * @returns photos that are concerned with the logged user aka personalized feed
 */
export async function getPhotos(userId, following) {
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "in", following)
    .get();

  const userFollowedPhotos = result.docs.map((photo) => ({
    ...photo.data(),
    docId: photo.id,
  }));

  const photoWithUserDetails = await Promise.all(
    userFollowedPhotos.map(async (photo) => {
      let userLikedPhoto = false;
      if (photo.likes.includes(userId)) {
        userLikedPhoto = true;
      }

      const user = await getUserByUserId(photo.userId);

      const { username } = user[0];

      return { username, ...photo, userLikedPhoto };
    })
  );

  return photoWithUserDetails;
}

/**
 *
 * @param {string} username
 * @returns
 */
export async function getUserPhotosByUsername(username) {
  /**
   * need to write a function that can handle user photos and give back to our app
   * from firebase
   * with just username
   * as they are also unique in our app
   * @todo need to write this function asap
   */

  const [user] = await getUserProfileByUsername(username);
  const result = await firebase
    .firestore()
    .collection("photos")
    .where("userId", "==", user.userId)
    .get();

  return result.docs.map((item) => ({
    ...item.data(),
    docId: item.id,
  }));
}
