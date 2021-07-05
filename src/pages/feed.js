/**
 * main feed page of the app
 */

// static imports
import { useEffect } from "react";

// relative imports
import Header from "../components/header";
import SideBar from "../components/sidebar";
import Timeline from "../components/timeline";

export default function Feed() {
  useEffect(() => {
    document.title = "doki";
  }, []);

  return (
    <div className="container block max-h-screen max-w-screen-2xl bg-gray-background">
      <Header />
      <div className="grid">
        <Timeline />
        <SideBar />
      </div>
    </div>
  );
}
