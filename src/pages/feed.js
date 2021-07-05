/**
 * main feed page of the app
 */

// static imports
import { useEffect } from "react";

// relative imports
import { Header } from "../components/header";
import { SideBar } from "../components/sidebar";
import { Timeline } from "../components/timeline";

export default function Feed() {
  useEffect(() => {
    document.title = "doki";
  }, []);

  return (
    <div className="bg-gray-background">
      <Header />
      <Timeline />
      <SideBar />
    </div>
  );
}
