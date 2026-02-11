import API from "./api";

export const sendMessage = async (name, email, message) => {
  const res = await API.post("/contact", { name, email, message });
  return res.data;
};
