import { fieldValue, firebase } from "../lib/firebase";

/**
 *
 * @param {*} username
 * @returns an boolean array
 */
export async function doesUsernameExists(username) {
  const result = await firebase
    .firestore()
    .collection("users")
    .where("username", "==", username)
    .get();

  // console.log(result);
  return result.docs.map((user) => user.data().length > 0);
}

/**
 *
 * @param {*} userId
 * @returns user
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
 * @param {*} userId
 * @param {*} following
 * @returns suggested profiles as an array
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
 * @param {*} loggedInUserDocId
 * @param {*} profileId
 * @param {*} isFollowingProfile
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
        ? fieldValue.arrayRemove(profileId)
        : fieldValue.arrayUnion(profileId),
    });
}

/**
 *
 * @param {*} profileDocId : string
 * @param {*} loggedInUserDocId : string
 * @param {*} isFollowingProfile : boolean
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
        ? fieldValue.arrayRemove(loggedInUserDocId)
        : fieldValue.arrayUnion(loggedInUserDocId),
    });
}
