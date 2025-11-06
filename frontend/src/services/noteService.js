import api from "../api";

export const getNotes = () => {
  return api.get("/api/notes/");
};

export const createNote = (payload) => {
  return api.post("/api/notes/", payload);
};

export const deleteNote = (id) => {
  return api.delete(`/api/notes/delete/${id}/`);
};

export const getNoteDetail = (id) => {
  return api.get(`/api/notes/${id}/`);
};

export const updateNote = (id, payload) => {
  return api.put(`/api/notes/${id}/`, payload);
};
