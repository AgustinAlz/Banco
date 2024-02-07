import axios from "./axios";

export const getRolesRequest = async () => axios.get("/roles");
export const createRoleRequest = async (role) => axios.post("/roles", role);
export const updateRoleRequest = async (role) => axios.put(`/roles/${role._id}`, role);
export const deleteRoleRequest = async (id) => axios.delete(`/roles/${id}`);
export const getRoleRequest = async (id) => axios.get(`/roles/${id}`);
