import { createContext, useContext, useState } from "react";
import { createRoleRequest, deleteRoleRequest, getRolesRequest, getRoleRequest, updateRoleRequest } from "../api/roles";

const RoleContext = createContext();

export const useRoles = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRoles must be used within a RoleProvider");
  }
  return context;
};

export function RoleProvider({ children }) {
  const [roles, setRoles] = useState([]);

  const getRoles = async () => {
    const res = await getRolesRequest();
    setRoles(res.data);
  };

  const deleteRole = async (id) => {
    try {
      const res = await deleteRoleRequest(id);
      if (res.status === 204) {
        setRoles(roles.filter((role) => role._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createRole = async (role) => {
    try {
      const res = await createRoleRequest(role);
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getRole = async (id) => {
    try {
      const res = await getRoleRequest(id);
      return res.data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateRole = async (id, role) => {
    try {
      await updateRoleRequest(id, role);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <RoleContext.Provider
      value={{
        roles,
        getRoles,
        deleteRole,
        createRole,
        getRole,
        updateRole,
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}
