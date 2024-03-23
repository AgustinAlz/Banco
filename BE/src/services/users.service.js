import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getUsersService = async (filter) => {
    var users = users = await User.find().populate("role");
    if (filter == 'regularUsersOnly') {
        //ver de hacerlo por mongoose
        users = users.filter(user => !(user.role.adminPermission));
    }

    if (filter == 'admninUsersOnly') {
        //ver de hacerlo por mongoose
        users = users.filter(user => (user.role.adminPermission));
    }

    return users;
}

export const updateUserService = async (id, user, updatePassword) => {
    let userUpdated = [];
    if (updatePassword) {
        userUpdated = await User.findOneAndUpdate({ _id: id }, {
            givenName: user.givenName,
            lastName: user.lastName,
            fullName: user.givenName + " " + user.lastName,
            email: user.email,
            roele: user.role,
            password: await bcrypt.hash(user.password, 10)// hashing the password },
        },
            { new: true }
        );
    } else {
        userUpdated = await User.findOneAndUpdate({ _id: id }, {
            givenName: user.givenName,
            lastName: user.lastName,
            fullName: user.givenName + " " + user.lastName,
            email: user.email,
            roel: user.role
        },
            { new: true }
        );
    }

    return userUpdated;
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