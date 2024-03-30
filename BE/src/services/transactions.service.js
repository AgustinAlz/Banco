import Transaction from "../models/transaction.model.js";
import { getAccountService } from "./accounts.service.js";

export const getTransactionsService = async (accountId, user) => {
    const account = await getAccountService(accountId);
    const owner = account.owners.filter((owner) => owner == user._id)
    const isUserOwner = account.owners.filter((owner) => owner._id == user.id).length > 0;  

    if (!user.role.adminPermission && !isUserOwner) {
        throw new Error('User does not have permission to create transaction.');
    }

    const transactions = (await Transaction.find().populate("account")).filter((transaction) => transaction.account._id == accountId);


    return transactions;
}

export const getTransactionService = async (transactionId, user) => {
    const transaction = await Transaction.findById({ "_id": transactionId }).populate({ path: "account", populate: { path: "owners" } });
    const isUserOwner = transaction.account.owners.filter((owner) => owner._id == user.id).length > 0;

    if (!user.role.adminPermission && !isUserOwner) {
        throw new Error('User does not have permission to create transaction.');
    }
    return transaction
}

export const createTransactionService = async (transaction, user) => {
    const account = await getAccountService(transaction.account);
    const isUserOwner = account.owners.filter((owner) => owner._id == user.id).length > 0;

    if (!user.role.adminPermission && !isUserOwner) {
        throw new Error('User does not have permission to create transaction.');
    }
    return await transaction.save();
}

export const updateTransactionService = async (transactionId, transaction, user) => {
    const originalTransaction = await Transaction.findById({ "_id": transactionId }).populate({ path: "account", populate: { path: "owners" } });
    const isUserOwner = originalTransaction.account.owners.filter((owner) => owner._id == user.id).length > 0;

    if (!user.role.adminPermission && !isUserOwner) {
        throw new Error('User does not have permission to create transaction.');
    }
    const updatedTransaction = await Transaction.findOneAndUpdate({ _id: transactionId }, {
        account: transaction.account,
        date: transaction.date,
        amount: transaction.amount,
        notes: transaction.notes
    }, { new: true });

    return updatedTransaction
}

export const deleteTransactionService = async (transactionId) => {
    console.log("delete transactions")
}