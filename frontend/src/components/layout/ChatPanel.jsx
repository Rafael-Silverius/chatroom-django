import { useEffect, useState } from "react";
import MessageInput from "../chat/MessageInput";
import MessageList from "../chat/MessageList";
import api from "../../api/api";

export default function ChatPanel({ activeRoom }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!activeRoom) return;

    const fetchMessages = async () => {
      setIsLoading(true);
      try {
        const res = await api.get(`/api/rooms/${activeRoom.id}/messages`);
        setMessages(res.data);
      } finally {
        setIsLoading(false);
      }
    };
    fetchMessages();
  }, [activeRoom]);

  if (!activeRoom) {
    return <div className="empty">Select a room</div>;
  }

  return (
    <div className="chat">
      <h2>{activeRoom.name}</h2>
      {isLoading ? (
        <p className="loading">Loading messages...</p>
      ) : (
        <MessageList messages={messages} />
      )}
      <MessageInput roomID={activeRoom.id} setMessages={setMessages} />
    </div>
  );
}
