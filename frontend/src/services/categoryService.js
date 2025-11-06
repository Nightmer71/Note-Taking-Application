import api from "../api";

export const getCategories = () => {
  return api.get("/api/categories/");
};

export const createCategory = (payload) => {
  return api.post("/api/categories/", payload);
};

export const deleteCategory = (id) => {
  return api.delete(`/api/categories/${id}/`);
};

export const getCategoryDetail = (id) => {
  return api.get(`/api/categories/${id}/`);
};

export const updateCategory = (id, payload) => {
  return api.put(`/api/categories/${id}/`, payload);
};
