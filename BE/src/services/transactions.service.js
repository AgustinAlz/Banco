import Transaction from "../models/transaction.model.js";
import { getAccountService } from "./accounts.service.js";

export const getTransactionsService = async (accountId, user) => {
    
    if (!user.role.adminPermission) {
        const account = await getAccountService(accountId);
        const owner = account.owners.filter((owner) => owner == user._id)
        const isUserOwner = account.owners.filter((owner) => owner._id == user.id).length > 0;
        if (!isUserOwner) {
            throw { statusCode: 401, message: `El usuario no posee ${user.fullName} no posee acceso.` };
        }
    }
    const transactions = (await Transaction.find().populate("account")).filter((transaction) => transaction.account._id == accountId);

    transactions.sort(function(a,b){
        // Turn your strings into dates, and then subtract them
        // to get a value that is either negative, positive, or zero.
        return new Date(b.date) - new Date(a.date);
      });

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
    transaction.amount = transaction.transType == 'deposit' ? Math.abs(transaction.amount) : -Math.abs(transaction.amount);
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
        transType: transaction.transType,
        amount: transaction.transType == 'deposit' ? Math.abs(transaction.amount) : -Math.abs(transaction.amount),
        notes: transaction.notes
    }, { new: true });

    return updatedTransaction
}

export const deleteTransactionService = async (transactionId) => {
    console.log("No esta permitido borrar transacciones. Por favor reversela.")
}