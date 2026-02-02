import RoomList from "../../rooms/RoomList";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ setActiveRoom }) {
  const navigate = useNavigate();

  const handleDiscoverClick = () => {
    navigate("/discover"); // redirect to discover page
  };

  return (
    <aside className="sidebar">
      <button onClick={handleDiscoverClick}>Discover Rooms</button>
      <h3>Rooms you are registered</h3>
      <RoomList setActiveRoom={setActiveRoom} />
    </aside>
  );
}
