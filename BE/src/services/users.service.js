import User from "../models/user.model.js";

export const getUsersService = async (filter) => {
    var users = users = await User.find().populate("role");
    console.log("antes de filtrar",filter);
    if (filter == 'regularUsersOnly') {
        console.log("Only Regulars", filter);
        //ver de hacerlo por mongoose
        users = users.filter(user => !(user.role.adminPermission));
    }

    if (filter == 'admninUsersOnly') {
        console.log("Only Admin", filter);
        //ver de hacerlo por mongoose
        users = users.filter(user => (user.role.adminPermission));
    }

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