import api from "../api";

export const getRegisteredRooms = async () => {
  const res = await api.get("/api/rooms/");
  return res.data;
};
