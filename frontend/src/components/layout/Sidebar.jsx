import { getRegisteredRooms } from "../../api/rooms";
import RoomList from "../../rooms/RoomList";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Sidebar({ setActiveRoom }) {
  const navigate = useNavigate();

  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRooms();
  }, []);

  const loadRooms = async () => {
    try {
      const res = await getRegisteredRooms();
      setRooms(res);
    } catch (err) {
      console.error("Loading error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDiscoverClick = () => {
    navigate("/discover");
  };

  return (
    <aside className="sidebar">
      <button onClick={handleDiscoverClick}>Discover Rooms</button>

      {loading && <p>Loading...</p>}

      {!loading && rooms.length === 0 && (
        <h3>You are not yet registered in any room</h3>
      )}

      {!loading && rooms.length > 0 && <h3>Rooms you are registered</h3>}

      <RoomList rooms={rooms} setActiveRoom={setActiveRoom} />
    </aside>
  );
}
