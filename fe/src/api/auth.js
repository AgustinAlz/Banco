import axios from "./axios";

export const loginRequest = async (user) => axios.post(`/auth/login`, user);
export const verifyTokenRequest = async () => axios.get(`/auth/verify`);
