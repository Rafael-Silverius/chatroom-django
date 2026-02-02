import RoomList from "../../rooms/RoomList";

export default function Sidebar({ setActiveRoom }) {
  return (
    <aside className="sidebar">
      <h3>Rooms you are registered</h3>
      <RoomList setActiveRoom={setActiveRoom} />
    </aside>
  );
}
