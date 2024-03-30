import axios from "./axios";

//export const getTransactionsRequest = async () => axios.get("/transactions");
export const getTransactionsByAccountRequest = async (id) => axios.get(`/transactions/account/${id}`);
export const createTransactionRequest = async (transaction) => axios.post("/transactions/create", transaction);
export const updateTransactionRequest = async (transaction) => axios.put(`/transactions/${transaction._id}`, transaction);
export const deleteTransactionRequest = async (id) => axios.delete(`/transactions/${id}`);
export const getTransactionRequest = async (id) => axios.get(`/transactions/${id}`);
