import axios from "./axios";

export const getAccountsRequest = async () => axios.get("/accounts");
export const getAccountsByOwnerRequest = async (id) => axios.get(`/accounts/owner/${id}`);
export const createAccountRequest = async (account) => axios.post("/accounts/create", account);
export const updateAccountRequest = async (account) => axios.put(`/accounts/${account._id}`, account);
export const deleteAccountRequest = async (id) => axios.delete(`/accounts/${id}`);
export const getAccountRequest = async (id) => axios.get(`/accounts/${id}`);
export const getNextAccountRequest = async () => axios.get(`/accounts/nextAccount`);
