/**
 * custom error page
 */

import { Link } from "react-router-dom";
import { useEffect } from "react";
import * as ROUTES from "../routes";

export default function NotFound() {
  useEffect(() => {
    document.title = "Not Found!";
  }, []);

  return (
    <div className="container content-center justify-center flex-auto h-screen bg-gray-background">
      <div className="max-w-screen-lg mx-auto my-auto ">
        <div className="items-center text-center">
          <h1 className="text-2xl font-bold">Not Found!</h1>
          <p className="font-semibold text-md">
            go back to{` `}
            <Link to={ROUTES.FEED} className="text-blue-600">
              homepage
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
