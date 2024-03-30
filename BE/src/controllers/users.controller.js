import User from "../models/user.model.js";
import { getUsersService, updateUserService, deleteUserService } from "../services/users.service.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
    try {
        const { filter } = req.query;
        const users = await getUsersService(filter);
        res.json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById({ "_id": req.params.id });
        await user.populate("role");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.json(user);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createUser = async (req, res) => {
    try {
        const { givenName, lastName, email, role, password } = req.body;
        const newUser = new User({
            givenName,
            lastName,
            email,
            role,
            password: await bcrypt.hash(password, 10) // hashing the password
        });

        await newUser.save();
        res.json(newUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await deleteUserService(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateUser = async (req, res) => {
    try {
        const updatedUser = await updateUserService(req.params.id, req.body, req.body.updatePassword)

        return res.json(updatedUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

