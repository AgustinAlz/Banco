import AccountType from "../models/accountType.model.js";
import jwt from "jsonwebtoken";

export const getAccountTypes = async (req, res) => {
    try {
        const { token } = req.cookies;
        const decodedToken = jwt.decode(token);
        // Only Admin can create, update and delete accounts
        if(!decodedToken.role.adminPermission){
            return res.status(401).json({ message: "Not Authorized." });
        }
        const accountTypes = await AccountType.find();
        res.json(accountTypes);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAccountType = async (req, res) => {
    try {
        const { token } = req.cookies;
        const decodedToken = jwt.decode(token);
        // Only Admin can create, update and delete accounts
        if(!decodedToken.role.adminPermission){
            return res.status(401).json({ message: "Not Authorized." });
        }
        const accountType = await AccountType.findById({ "_id": req.params.id });
        await accountType.populate("role");
        if (!accountType) {
            return res.status(404).json({ message: "AccountType not found" });
        }
        return res.json(accountType);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createAccountType = async (req, res) => {
    try {
        const { token } = req.cookies;
        const decodedToken = jwt.decode(token);
        // Only Admin can create, update and delete accounts
        if(!decodedToken.role.adminPermission){
            return res.status(401).json({ message: "Not Authorized." });
        }
        const { description, currency } = req.body;
        const newAccountType = new AccountType({
            description,
            currency
        });
        await newAccountType.save();
        res.json(newAccountType);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteAccountType = async (req, res) => {
    try {
        const { token } = req.cookies;
        const decodedToken = jwt.decode(token);
        // Only Admin can create, update and delete accounts
        if(!decodedToken.role.adminPermission){
            return res.status(401).json({ message: "Not Authorized." });
        }
        const deletedAccountType = await AccountType.findByIdAndDelete(req.params.id);
        if (!deletedAccountType) {
            return res.status(404).json({ message: "AccountType not found" });
        }
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateAccountType = async (req, res) => {
    try {
        const { token } = req.cookies;
        const decodedToken = jwt.decode(token);
        // Only Admin can create, update and delete accounts
        if(!decodedToken.role.adminPermission){
            return res.status(401).json({ message: "Not Authorized." });
        }
        const { description, currency } = req.body;
        const userUpdated = await User.findOneAndUpdate(
            { _id: req.params.id },
            { description, currency }, 
            { new: true }
        );
        return res.json(userUpdated);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

