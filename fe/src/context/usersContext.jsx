import { createContext, useContext, useState } from "react";
import { createUserRequest, deleteUserRequest, getUsersRequest, getUserRequest, updateUserRequest } from "../api/users";

const UserContext = createContext();

export const useUsers = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};

export function UserProvider({ children }) {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const res = await getUsersRequest();
    setUsers(res.data);
  };

  const deleteUser = async (id) => {
    try {
      const res = await deleteUserRequest(id);
      if (res.status === 204) {
        setUsers(users.filter((user) => user._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createUser = async (user) => {
    try {
      const res = await createUserRequest(user);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async (id) => {
    try {
      const res = await getUserRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateUser = async (id, user) => {
    try {
      await updateUserRequest(id, user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        users,
        getUsers,
        deleteUser,
        createUser,
        getUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
