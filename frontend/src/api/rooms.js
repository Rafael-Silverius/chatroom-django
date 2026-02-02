import api from "./api";

export const getRegisteredRooms = async () => {
  const res = await api.get("/api/rooms/");
  return res.data;
};

export const getDiscoverRooms = async () => {
  const res = await api.get("/api/rooms/discover/");
  return res.data;
};

export const joinRoom = async (roomId) => {
  const res = await api.post(`/api/rooms/${roomId}/join/`);
  return res.data;
};
