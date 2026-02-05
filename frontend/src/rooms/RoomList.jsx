import { useEffect, useState } from "react";
import { getRegisteredRooms } from "../api/rooms";

export default function RoomList({ setActiveRoom }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    getRegisteredRooms().then(setRooms);
  }, []);

  const handleSelectRoom = (room) => {
    setActiveRoom(room);
  };

  return (
    <ul>
      {rooms.map((room) => (
        <li
          key={room.id}
          onClick={() => handleSelectRoom(room)}
          style={{ cursor: "pointer" }}
        >
          {room.name}
        </li>
      ))}
    </ul>
  );
}
