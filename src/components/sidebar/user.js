// static imports
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Skeleton from "react-loading-skeleton";

const User = ({ username, fullName, test }) =>
  !username || !fullName ? (
    <Skeleton count={1} height={61} />
  ) : (
    <Link
      to={`/p/${username}`}
      className="grid items-center grid-cols-4 gap-4 mb-6"
    >
      <div className="flex items-center justify-between col-span-1">
        {test}
        <img
          src={`/images/mock-avatars/${username}.jpg`}
          alt="userprofile"
          className="flex w-16 mr-3 rounded-full"
        />
      </div>
      <div className="col-span-3">
        <p className="text-sm font-bold text-gray-800">{username}</p>
        <p className="text-sm font-medium text-gray-600">{fullName}</p>
      </div>
    </Link>
  );
/**
 * memo helps with memoization and helps to use rendering when it is acutally needed
 */

export default User;

User.propTypes = {
  username: PropTypes.string,
  fullName: PropTypes.string,
};
