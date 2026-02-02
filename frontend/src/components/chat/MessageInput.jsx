import { useState } from "react";
import api from "../../api/api";

export default function MessageInput({ roomID, setMessages }) {
  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);

  const sendMessage = async () => {
    if (!content.trim() || isSending) return;

    setIsSending(true);
    try {
      const res = await api.post(`/api/rooms/${roomID}/messages/`, {
        content,
      });
      setMessages((prev) => [...prev, res.data]);
      setContent("");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div>
      <input
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message..."
        disabled={isSending}
      />
      <button onClick={sendMessage} disabled={isSending}>
        {isSending ? "Posting your message..." : "Post"}
      </button>
    </div>
  );
}
