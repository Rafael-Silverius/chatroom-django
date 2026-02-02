import api from "../api";

export const getDiscoverRooms = async () => {
  const res = await api.get("/api/rooms/discover/");
  return res.data;
};
