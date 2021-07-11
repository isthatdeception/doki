// static imports
import { useState, useContext } from "react";
import PropTypes from "prop-types";

// relative import
import { FirebaseContext } from "../../context/forFirebase";
import { UserContext } from "../../context/forUser";

export default function AddComment({
  docId,
  setComments,
  comments,
  commentInput,
}) {
  const [comment, setComment] = useState("");
  const { firebase, FieldValue } = useContext(FirebaseContext);

  const {
    user: { displayName },
  } = useContext(UserContext);

  const handleSubmitComment = (event) => {
    event.preventDefault();

    setComments([{ displayName, comment }, ...comments]);

    // clear the comment
    setComment("");

    /**
     * get a new array []
     * put the new comment in there
     * add the old comments
     * then we have a new array with the new comment and the older comments
     */

    return firebase
      .firestore()
      .collection("photos")
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment }),
      });
  };

  return (
    <div className="border-t rounded border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(event) => {
          comment.length >= 1
            ? handleSubmitComment(event)
            : event.preventDefault();
        }}
      >
        <input
          aria-label="add a comment"
          autoComplete="off"
          className="w-full px-5 py-5 mr-3 text-sm rounded text-gray-base"
          type="text"
          name="add-comment"
          placeholder="Add a comment..."
          value={comment}
          onChange={({ target }) => setComment(target.value)}
          ref={commentInput}
        />

        <button
          className={`text-sm font-semibold text-blue-medium ${
            !comment && "opacity-25"
          }`}
          type="button"
          disabled={comment.length < 1}
          onClick={handleSubmitComment}
        >
          post
        </button>
      </form>
    </div>
  );
}

// add proptypes
AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  setComments: PropTypes.func.isRequired,
  comments: PropTypes.array.isRequired,
  commentInput: PropTypes.object,
};
