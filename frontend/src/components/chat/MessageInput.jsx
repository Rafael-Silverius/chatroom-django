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

  const handleKeyDown = (e) => {
    // ENTER → Send (without Shift)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }

    // ESC → Clear
    if (e.key === "Escape") {
      setContent("");
    }
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type a message..."
        disabled={isSending}
        rows={2}
        autoFocus
      />
      <button onClick={sendMessage} disabled={isSending}>
        {isSending ? "Posting..." : "Post"}
      </button>
    </div>
  );
}
