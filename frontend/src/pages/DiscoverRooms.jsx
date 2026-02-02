import { useEffect, useState } from "react";
import { getDiscoverRooms, joinRoom } from "../api/rooms";
import Sidebar from "../components/layout/Sidebar";

function DiscoverRoomsPage() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await getDiscoverRooms();
        setRooms(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const handleRegister = async (roomId) => {
    try {
      const res = await joinRoom(roomId);
      console.log(res.detail);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  if (loading) return <p>Loading rooms...</p>;

  return (
    <div className="discover-rooms-page">
      <h2>Discover Rooms</h2>
      {rooms.length ? (
        rooms.map((room) => (
          <div key={room.id} className="room-item">
            {room.name}
            <button onClick={() => handleRegister(room.id)}>Register</button>
          </div>
        ))
      ) : (
        <p>There aren't new rooms available at the moment</p>
      )}
    </div>
  );
}

export default DiscoverRoomsPage;
