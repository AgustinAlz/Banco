import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { getAccountsByOwnerService } from "./accounts.service.js";

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

export const createUsersService = async (newUser) => {
    const users = await getUsersService();
    const uniqueEmail = !users.some(user => user.email == newUser.email);
    if (!uniqueEmail) {
        throw { statusCode: 400, message: 'El correo electrónico ya se encuentra utilizado.' };
    }
    await newUser.save();

    return newUser;
}

export const updateUserService = async (id, user, updatePassword) => {
    const users = await getUsersService();
    const uniqueEmail = !users.some(x => x.email == user.email && x._id != id);
    if (!uniqueEmail) {
        throw { statusCode: 400, message: ['El correo electrónico ya se encuentra utilizado.' ]};
        //throw new Error('El correo electrónico ya se encuentra utilizado.');
    }

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

    const userAccounts = await getAccountsByOwnerService(id);
    if(userAccounts.length >0 ) {
        throw { statusCode: 400, message: `El usuario ${id} no pudo se borrado porque posee cuentas asociadas.` }
    }

    if (adminUsers.length == 1 && isUserToDeleteAdmin) {
        throw { statusCode: 400, message: ['No se puede eliminar el usuario administrador porque es el único que queda.' ]};
    }

    return await User.findByIdAndDelete(id);
}