export default function MessageList({ messages }) {
  messages ? console.log(messages) : "";
  return (
    <div>
      {messages.length === 0 && <p>No messages</p>}
      {messages.map((msg) => (
        <div className="" key={msg.id}>
          <strong>{msg.author.username}</strong>({msg.created_at}):
          {msg.content}
        </div>
      ))}
    </div>
  );
}
