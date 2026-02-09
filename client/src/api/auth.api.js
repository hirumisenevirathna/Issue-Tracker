import { api } from "./http";

export const me = () => api.get("/api/auth/me");
export const login = (data) => api.post("/api/auth/login", data);
export const register = (data) => api.post("/api/auth/register", data);
