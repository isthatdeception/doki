// static imports
import { useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatDistance } from "date-fns";

// relative imports
import AddComment from "./addComment";

export default function Comments({
  docId,
  comments: totalComments,
  posted,
  commentInput,
}) {
  const [comments, setComments] = useState(totalComments);
  return (
    <>
      <div className="p-4 pt-1 pb-4">
        {comments.length > 3 && (
          <p className="mb-1 text-sm cursor-pointer text-gray-base">
            view all comments
          </p>
        )}
        {comments.slice(0, 3).map((item) => (
          <p className="mb-1" key={`${item.comment}-${item.displayName}`}>
            <Link to={`/p/${item.displayName}`}>
              <span className="mr-1 font-bold">{item.displayName}</span>
            </Link>
            <span>{item.comment}</span>
          </p>
        ))}
        <p className="mt-2 text-xs font-semibold uppercase text-gray-base">
          {formatDistance(posted, new Date())} ago
        </p>
      </div>
      <AddComment
        docId={docId}
        comments={comments}
        commentInput={commentInput}
        setComments={setComments}
      />
    </>
  );
}

Comments.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  posted: PropTypes.number.isRequired,
  commentInput: PropTypes.object.isRequired,
};
