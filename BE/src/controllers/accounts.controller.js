import Account from "../models/account.model.js";
import jwt from "jsonwebtoken";
import { getAccountsService, getAccountsByOwnerService, getAccountService, createAccountService, deleteAccountService, updateAccountService } from "../services/accounts.service.js";


export const getAccounts = async (req, res) => {
    try {
        const accounts = await getAccountsService(req.user);
        res.json(accounts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getAccountsByOwner = async (req, res) => {
    try {
        const accounts = await getAccountsByOwnerService(req.params.ownerId);
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
        const { number, owners, accountType, balance } = req.body;
        const newAccount = new Account({ number, owners, accountType, balance });

        res.json(await createAccountService(newAccount, req.user));

        //await newAccount.save();
        //res.json(newAccount);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteAccount = async (req, res) => {
    try {
        await deleteAccountService(req.params.id, req.user);
        return res.sendStatus(204);
    } catch (error) {
        return res.status(error.statusCode ? error.statusCode : 500).json({ message: error.message });
    }
};

export const updateAccount = async (req, res) => {
    try {
        const accountUpdated = await updateAccountService(req.params.id, req.body, req.user);
        return res.json(accountUpdated);
    } catch (error) {
        return res.status(error.statusCode ? error.statusCode : 500).json({ message: error.message });
    }
};

