import { getTransactionsService, getTransactionService, createTransactionService, updateTransactionService, deleteTransactionService } from "../services/transactions.service.js";
import Transaction from "../models/transaction.model.js"
import jwt, { decode } from "jsonwebtoken";

export const getTransactions = async (req, res) => {
    try {
        const transactions = await getTransactionsService(req.params.accountId, req.user);
        return res.json(transactions);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


export const getTransaction = async (req, res) => {
    try {
        const transaction = await getTransactionService(req.params.id, req.user)

        if (!transaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        return res.json(transaction);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const createTransaction = async (req, res) => {
    try {
        const { account, date, amount, notes } = req.body;
        const newTransaction = new Transaction({ account, date, amount, notes });
        res.json(await createTransactionService(newTransaction, req.user));
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const updateTransaction = async (req, res) => {
    try {
        const transactionUpdated = await updateTransactionService(req.params.id, req.body, req.user)
        return res.json(transactionUpdated);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const deleteTransaction = async (req, res) => {
    try {
        const { token } = req.cookies;
        const decodedToken = jwt.decode(token);
        // Only Admin can create, update and delete accounts
        if (!decodedToken.role.adminPermission) {
            return res.status(401).json({ message: "Not Authorized." });
        }
        const deletedTransaction = await Transaction.findByIdAndDelete(req.params.id);
        if (!deletedTransaction) {
            return res.status(404).json({ message: "Transaction not found" });
        }
        return res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};