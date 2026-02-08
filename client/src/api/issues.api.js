import { api } from "./http";

export const getIssues = (params) => api.get("/api/issues", { params });
export const createIssue = (data) => api.post("/api/issues", data);
export const updateIssue = (id, data) => api.put(`/api/issues/${id}`, data);
export const deleteIssue = (id) => api.delete(`/api/issues/${id}`);
export const getSummary = () => api.get("/api/issues/summary");
