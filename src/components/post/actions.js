import { useState, useContext } from "react";
import PropTypes from "prop-types";

import { FirebaseContext } from "../../context/forFirebase";
import { UserContext } from "../../context/forUser";

export default function Actions({
  docId,
  totalLikes,
  likedPhoto,
  handleFocus,
}) {
  const {
    user: { uid: userId = "" },
  } = useContext(UserContext);

  const [toggleLiked, setToggleLiked] = useState(likedPhoto);
  const [likes, setLikes] = useState(totalLikes);

  const { firebase, FieldValue } = useContext(FirebaseContext);

  const handleToggleLiked = async () => {
    setToggleLiked((toggleLiked) => !toggleLiked);

    await firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        likes: toggleLiked
          ? FieldValue.arrayRemove(userId)
          : FieldValue.arrayUnion(userId),
      });

    setLikes((likes) => (toggleLiked ? likes - 1 : likes + 1));
  };

  return (
    <>
      <div className="flex justify-between p-4">
        <div className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`w-6 mr-4 select-none cursor-pointer border-gray-900 ${
              toggleLiked ? "fill-red text-red-primary" : "text-black-light"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={handleToggleLiked}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleToggleLiked();
              }
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 border-gray-900 cursor-pointer select-none text-black-light"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            onClick={handleFocus}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                handleFocus();
              }
            }}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </div>
      </div>
      <div className="p-4 py-0">
        <p className="font-semibold">
          {likes === 1 ? `${likes} like` : `${likes} likes`}
        </p>
      </div>
    </>
  );
}

Actions.propTypes = {
  docId: PropTypes.string.isRequired,
  totalLikes: PropTypes.number.isRequired,
  likedPhoto: PropTypes.bool.isRequired,
  handleFocus: PropTypes.func.isRequired,
};
