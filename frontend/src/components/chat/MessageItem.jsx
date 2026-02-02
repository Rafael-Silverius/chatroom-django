import { useState } from "react";

export default function MessageItem({
  message,
  onEdit,
  onDelete,
  currentUser,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);

  return (
    <div className="">
      <strong>{message.author.username}</strong>
      {`(${message.created_at})`} :
      {isEditing ? (
        <>
          <input
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />
          <button
            onClick={() => {
              onEdit(message.room, message.id, editContent);
              setIsEditing(false);
            }}
          >
            Save
          </button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <span>{message.content}</span>
      )}
      {message.author.id === currentUser.id && (
        <span className="dropdown">
          <button className="dropdown-btn">⋮</button>

          <span className="dropdown-content">
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(message.id)}>Delete</button>
          </span>
        </span>
      )}
    </div>
  );
}
