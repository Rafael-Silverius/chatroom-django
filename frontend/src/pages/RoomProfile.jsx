import { useEffect, useState } from "react";
import { getRoomDetail, leaveRoom } from "../api/rooms";
import { useNavigate, useParams } from "react-router-dom";

export default function RoomProfile() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getRoomDetail(roomId).then(setRoom);
  }, [roomId]);

  console.log(room);
  const handleLeave = async () => {
    if (!window.confirm("Leave this room?")) return;

    try {
      const res = await leaveRoom(roomId);

      if (!res.success) {
        throw new Error(res.detail);
      }
      // Go back to home after leaving
      navigate("/");
    } catch (err) {
      console.error("Leave error:", err);

      alert(
        err.response?.data?.detail || err.message || "Could not leave room"
      );
    }
  };

  if (!room) return <p>Loading...</p>;

  return (
    <div>
      <h2>{room.name}</h2>
      <p>Owner: {room.owner.username}</p>
      <p>Members: {room.members.length}</p>
      {room.is_member && !room.is_owner && (
        <button onClick={handleLeave}>Leave Room</button>
      )}
      {room.is_admin && <button>Manage Room</button>}
      <h3>Members</h3>

      <ul>
        {room.members.map((m) => (
          <li key={m.id}>{m.username}</li>
        ))}
      </ul>
    </div>
  );
}
