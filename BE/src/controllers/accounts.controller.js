import Account from "../models/account.model.js";
import jwt from "jsonwebtoken";
import { getAccountService, createAccountService } from "../services/accounts.service.js";


export const getAccounts = async (req, res) => {
    try {
        // Only Admin get all accounts
        const { token } = req.cookies;
        const user = jwt.decode(token);
        if(!user.role.adminPermission){
            return res.status(401).json({ message: "Not Authorized." });
        }
        const accounts = await Account.find().populate("accountType").populate("owners");
        res.json(accounts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAccountsByOwner = async (req, res) => {
    try {
        //const accounts = await Account.find({"owners": req.params.ownerId}).populate("accountType").populate("owners");
        
        const accounts = await Account.find({"owners": req.params.ownerId}).populate("accountType").populate("owners");
        res.json(accounts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAccount = async (req, res) => {
    try {
        //const account = await Account.findById({ "_id": req.params.id }).populate("accountType").populate("owners");
        const account = await getAccountService(req.params.id);
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        return res.json(account);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createAccount = async (req, res) => {
    try {
        const { token } = req.cookies;
        const decodedToken = jwt.decode(token);
        // Only Admin can create, update and delete accounts
        if(!decodedToken.role.adminPermission){
            return res.status(401).json({ message: "Not Authorized." });
        }
        const { number, owners, accountType, balance } = req.body;
        const newAccount = new Account({number, owners, accountType, balance });

        res.json( await createAccountService(newAccount));

        //await newAccount.save();
        //res.json(newAccount);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteAccount = async (req, res) => {
    try {
        const { token } = req.cookies;
        const decodedToken = jwt.decode(token);
        // Only Admin can create, update and delete accounts
        if(!decodedToken.role.adminPermission){
            return res.status(401).json({ message: "Not Authorized." });
        }
        const deletedAccount = await Account.findByIdAndDelete(req.params.id);
        if (!deletedAccount) {
            return res.status(404).json({ message: "Account not found" });
        }
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateAccount = async (req, res) => {
    try {
        const { token } = req.cookies;
        const decodedToken = jwt.decode(token);
        // Only Admin can create, update and delete accounts
        if(!decodedToken.role.adminPermission){
            return res.status(401).json({ message: "Not Authorized." });
        }
        const { number, owners, accountType, balance} = req.body;
        const accountUpdated = await Account.findOneAndUpdate(
                { _id: req.params.id },
                { number, owners, accountType, balance},
                { new: true }
            );
        
        return res.json(accountUpdated);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

