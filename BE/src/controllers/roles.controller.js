import Role from "../models/role.model.js";

export const getRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        res.json(roles);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createRole = async (req, res) => {
    try {
        const { roleName, adminPermission } = req.body;
        const newRole = new Role({
            roleName,
            adminPermission
        });
        await newRole.save();
        res.json(newRole);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteRole = async (req, res) => {
    try {
        const deletedRole = await Role.findByIdAndDelete(req.params.id);
        if (!deletedRole) {
            return res.status(404).json({ message: "Role not found" });
        }
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateRole = async (req, res) => {
    try {
        const { roleName, adminPermission } = req.body;
        const roleUpdated = await Role.findOneAndUpdate(
            { _id: req.params.id },
            { roleName, adminPermission  },
            { new: true }
        );
        return res.json(roleUpdated);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getRole = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) {
            return res.status(404).json({ message: "Role not found" });
        }
        return res.json(role);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};