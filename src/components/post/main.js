import { useRef } from "react";
import PropTypes from "prop-types";

import Header from "./header";
import Image from "./image";
import Actions from "./actions";

export default function Post({ content }) {
  const commentInput = useRef(null);
  const handleFocus = () => commentInput.current.focus();
  /**
   * header, image, actions, (like & comment actions on the post), footer, comments, captions
   */
  return (
    <div className="col-span-4 mb-12 bg-white border rounded border-gray-primary">
      <Header username={content.username} />
      <Image src={content.imageSrc} />
      <Actions
        docId={content.docId}
        totalLikes={content.likes.length}
        likedPhoto={content.userLikedPhoto}
        handleFocus={handleFocus}
      />
    </div>
  );
}

Post.propTypes = {
  content: PropTypes.shape({
    username: PropTypes.string.isRequired,
    imageSrc: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    docId: PropTypes.string.isRequired,
    userLikedPhoto: PropTypes.bool.isRequired,
    likes: PropTypes.array.isRequired,
    comments: PropTypes.array.isRequired,
    dateCreated: PropTypes.number.isRequired,
  }),
};
