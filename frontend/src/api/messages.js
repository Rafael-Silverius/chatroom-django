import api from "./api";

// Fetch messages for a room
export const getRoomMessages = async (roomId) => {
  const res = await api.get(`/api/rooms/${roomId}/messages/`);
  return res.data;
};

// Create a new message
export const createMessage = async (roomId, content) => {
  const res = await api.post(`/api/rooms/${roomId}/messages/`, { content });
  return res.data;
};

// Edit a message
export const editMessages = async (roomId, messageId, content) => {
  const res = await api.put(`/api/rooms/${roomId}/messages/${messageId}/`, {
    content,
  });
  return res.data;
};

// Delete a message
export const deleteMessages = async (roomId, messageId) => {
  await api.delete(`/api/rooms/${roomId}/messages/${messageId}/`);
};
