// relaitve imports
import useUser from "../../utils/useUser";
import User from "./user";
import Suggestions from "./suggestions";

export default function SideBar() {
  const {
    user: { fullName, username, userId },
  } = useUser();

  return (
    <div className="p-4">
      <User username={username} fullName={fullName} />
      <Suggestions userId={userId} />
    </div>
  );
}
