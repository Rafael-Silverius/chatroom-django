import { deleteMessages, editMessages } from "../../api/messages";
import MessageItem from "./MessageItem";

export default function MessageList({
  roomID,
  messages,
  setMessages,
  currentUser,
}) {
  messages ? console.log(messages) : "";

  const deleteMessage = async (messageId) => {
    try {
      await deleteMessages(roomID, messageId);
      setMessages(messages.filter((msg) => msg.id !== messageId));
    } catch (err) {
      alert("You can only delete your messages");
      console.log(err);
    }
  };

  const editMessage = async (roomID, messageId, newContent) => {
    try {
      const updated = await editMessages(roomID, messageId, newContent);
      setMessages(
        messages.map((msg) => (msg.id === messageId ? updated : msg))
      );
    } catch (err) {
      alert("You can only edit your messages");
      console.error(err);
    }
  };

  return (
    <div className="message-list">
      {messages.length === 0 && <p>No messages</p>}
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          roomID={roomID}
          message={msg}
          onDelete={deleteMessage}
          onEdit={editMessage}
          currentUser={currentUser}
        />
      ))}
    </div>
  );
}
