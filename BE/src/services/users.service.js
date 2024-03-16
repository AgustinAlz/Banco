import User from "../models/user.model.js";

export const getUsersService = async (onlyRegularUsers, onlyAdminUsers) => {
    var users = users = await User.find().populate("role");
    if (onlyRegularUsers != 'undefined' && onlyRegularUsers) {
        //console.log("Only Regulars", onlyRegularUsers);
        //ver de hacerlo por mongoose
        users = users.filter(user => !(user.role.adminPermission));
    }

    if (onlyAdminUsers != 'undefined' && onlyAdminUsers) {
        //console.log("Only Admin", onlyAdminUsers);
        //ver de hacerlo por mongoose
        users = users.filter(user => (user.role.adminPermission));
    }
    //console.log("users", onlyRegularUsers, onlyAdminUsers, users);
    return users;
}

export const deleteUserService = async (id) => {
    const users = await User.find().populate("role");
    const adminUsers = users.filter(user => (user.role.adminPermission));
    const isUserToDeleteAdmin = adminUsers.filter((user) => user._id == id).length > 0;

    if (adminUsers.length == 1 && isUserToDeleteAdmin) {
        throw new Error("You are trying to delete the only Admin User left. Create another Admin User befor deleting this one.");
    }

    return await User.findByIdAndDelete(id);
}