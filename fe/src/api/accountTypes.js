import axios from "./axios";

export const getAccountTypesRequest = async () => axios.get("/accountsTypes");
export const getAccountTypeRequest = async (id) => axios.get(`/accountsTypes/${id}`);
