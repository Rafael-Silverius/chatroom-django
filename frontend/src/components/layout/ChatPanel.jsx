import { useEffect, useState } from "react";
import MessageInput from "../chat/MessageInput";
import MessageList from "../chat/MessageList";
import { getRoomMessages } from "../../api/messages";

export default function ChatPanel({ activeRoom, currentUser }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!activeRoom) return; // do nothing if no room selected

    let isMounted = true;
    const fetchMessages = async () => {
      try {
        setIsLoading(true);
        const messages = await getRoomMessages(activeRoom.id);
        if (isMounted) {
          setMessages(messages);
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchMessages();

    return () => {
      isMounted = false; // cleanup flag
    };
  }, [activeRoom]);

  return (
    <div className="chat">
      {activeRoom ? (
        isLoading ? (
          <p className="loading">Loading messages...</p>
        ) : (
          <MessageList
            roomID={activeRoom.id}
            messages={messages}
            setMessages={setMessages}
            currentUser={currentUser}
          />
        )
      ) : (
        <div className="">Click a room to enter</div>
      )}

      {/* Only show MessageInput if a room is selected */}
      {activeRoom && (
        <MessageInput roomID={activeRoom.id} setMessages={setMessages} />
      )}
    </div>
  );
}
