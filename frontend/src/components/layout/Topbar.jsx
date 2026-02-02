export default function Topbar({ activeRoom }) {
  return (
    <div className="topbar">
      <h2>{activeRoom.name}</h2>
    </div>
  );
}
