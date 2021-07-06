/**
 * main feed page of the app
 */

// static imports
import { useEffect } from "react";

// relative imports
import Header from "../components/header";
import SideBar from "../components/sidebar/main";
import Timeline from "../components/timeline";

export default function Feed() {
  useEffect(() => {
    document.title = "doki";
  }, []);

  return (
    <div className="container block max-w-screen-xl max-h-screen bg-gray-background">
      <Header />
      <div className="grid justify-between max-w-screen-lg grid-cols-3 gap-4 mx-auto">
        <Timeline />
        <SideBar />
      </div>
    </div>
  );
}
