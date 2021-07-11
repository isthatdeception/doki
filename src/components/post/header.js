import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Header({ username }) {
  return (
    <div className="flex h-12 p-4 py-4 border-b border-gray-primary">
      <div className="flex items-center">
        <Link to={`/p/${username}`} className="flex items-center">
          <img
            src={`/images/mock-avatars/${username}.png`}
            alt={`${username}'s post`}
            className="flex mr-2 rounded-full w-9 h-9"
          />
          <p className="font-semibold text-gray-800">{username}</p>
        </Link>
      </div>
    </div>
  );
}

Header.propTypes = {
  username: PropTypes.string.isRequired,
};
