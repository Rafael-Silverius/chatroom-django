import { useState } from "react";

export default function MessageItem({
  message,
  onEdit,
  onDelete,
  currentUser,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(message.content);

  const trimmedContent = editContent.trim();
  const hasChanges = trimmedContent !== message.content;
  const canSave = trimmedContent.length > 0 && hasChanges;

  const handleSave = () => {
    if (!canSave) return;
    onEdit(message.room, message.id, trimmedContent);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditContent(message.content);
    setIsEditing(false);
  };

  return (
    <div className="">
      <strong>{message.author.username}</strong>
      {`(${message.created_at})`} :
      {isEditing ? (
        <>
          <input
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSave();
              if (e.key === "Escape") handleCancel();
            }}
            aria-label="Edit message"
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
          <button className="dropdown-btn" aria-haspopup="true">
            ⋮
          </button>

          <span className="dropdown-content">
            {!isEditing}
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => onDelete(message.id)}>Delete</button>
          </span>
        </span>
      )}
    </div>
  );
}
