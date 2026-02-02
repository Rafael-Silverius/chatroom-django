import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import ChatPanel from "./ChatPanel";

export default function Layout({ currentUser }) {
  const [activeRoom, setActiveRoom] = useState(null);

  useEffect(() => {}, [activeRoom]);

  return (
    <div className="app">
      <Topbar activeRoom={activeRoom ? activeRoom : ""} />
      <div className="main">
        <Sidebar setActiveRoom={setActiveRoom} />
        <ChatPanel activeRoom={activeRoom} currentUser={currentUser} />
      </div>
    </div>
  );
}
