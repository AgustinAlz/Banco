import Account from "../models/account.model.js";
import { getUsersService } from "./users.service.js";
import { getTransactionsService } from "./transactions.service.js";

export const getAccountsService = async (user) => {
    return await Account.find().populate("accountType").populate("owners");
}

export const getAccountsByOwnerService = async (ownerId) => {
    const accounts = await Account.find({ "owners": ownerId }).populate("accountType").populate("owners");
    await Promise.all(accounts.map(async (account) => {
        return { ...account, balance: await calculateAccountBalance(account) };
    }));

    return accounts;
}

export const getAccountService = async (accountId) => {
    let account = await Account.findById({ "_id": accountId }).populate("accountType").populate("owners");
    account.balance = await calculateAccountBalance(account);

    return account
}

const calculateAccountBalance = async (account) => {
    const adminUser = await getUsersService('admninUsersOnly');
    //const accountTransactions = await getTransactionsService(account.id,adminUser[0]);
    const accountTransactions = await getTransactionsService(account.id, { role: { adminPermission: true } });
    account.balance = accountTransactions.reduce((n, { amount }) => n + amount, 0);

    return account.balance;
}

export const createAccountService = async (account, user) => {
    const accounts = await getAccountsService();
    const uniqueNumber = !accounts.some(x => x.number === account.number);



    if (!uniqueNumber) {
        throw { statusCode: 400, message: `El número de cuenta ya existe. El último número disponible es ${Math.max(...accounts.map(account => Number(account.number))) + 1}.` };
    }

    const adminUsers = await getUsersService('admninUsersOnly');
    const adminOnwer = adminUsers.filter((admin) => account.owners.includes(admin._id)).length > 0;

    if (adminOnwer) {
        throw { statusCode: 400, message: 'Un usuario administrador no puede ser titular de una cuenta.' };
    }

    return await account.save();
}

export const deleteAccountService = async (accountId, user) => {
    const accountTransactions = await getTransactionsService(accountId, user);
    if (accountTransactions.length > 0) {
        throw { statusCode: 400, message: `La cuenta ${accountId} no pudo se borrada porque posee transacciones asociadas.` };
    }
    const deletedAccount = await Account.findByIdAndDelete(accountId);
    if (!deletedAccount) {
        throw { statusCode: 404, message: `Cuenta ${accountId} no pudo se borrada porque no existe.` };
    }
}


export const updateAccountService = async (accountId, account, user) => {

    const accounts = await getAccountsService();
    const uniqueNumber = !accounts.some(x => x.number === Number(account.number) && x.id !== accountId);
    if (!uniqueNumber) {
        throw { statusCode: 400, message: `El número de cuenta ya existe. El último número disponible es ${Math.max(...accounts.map(account => Number(account.number))) + 1}.` };
    }

    const adminUsers = await getUsersService('admninUsersOnly');
    const adminOnwer = adminUsers.filter((admin) => account.owners.includes(admin._id)).length > 0;
    if (adminOnwer) {
        throw { statusCode: 400, message: 'Un usuario administrador no puede ser titular de una cuenta.' };
    }

    const accountUpdated = await Account.findOneAndUpdate(
        { _id: accountId },
        { number: account.number, owners: account.owners, accountType: account.accountType, balance: account.balance },
        { new: true }
    );

    return accountUpdated;
};

export const nextAccountService = async () => {
    const accounts = await getAccountsService();

    return 1 + Math.max(...accounts.map(account => Number(account.number)));
};