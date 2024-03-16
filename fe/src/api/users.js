import axios from "./axios";

export const getUsersRequest = async (regularUsers) => axios.get(`/users/${regularUsers}`);
export const getRegularUsersRequest = async () => axios.get("/users");
export const createUserRequest = async (user) => axios.post("/users/create", user);
export const updateUserRequest = async (user) => axios.put(`/users/${user._id}`, user);
export const deleteUserRequest = async (id) => axios.delete(`/users/${id}`);
export const getUserRequest = async (id) => axios.get(`/users/${id}`);
