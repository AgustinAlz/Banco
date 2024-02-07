import User from "../models/user.model.js";

export const getUsers = async (req, res) => {
    try {
        //console.log(req);
        //res.json(req);
        const users = await User.find().populate("role");
        res.json(users);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getUser = async (req, res) => {
    try {
        const user = await User.findById({"_id": req.params.id});
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
            password
        });
        await newUser.save();
        res.json(newUser);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
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
        const { givenName, lastName, email, role, password } = req.body;
        const userUpdated = await User.findOneAndUpdate(
            { _id: req.params.id },
            { givenName, lastName, email, role, password },
            { new: true }
        );
        return res.json(userUpdated);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};