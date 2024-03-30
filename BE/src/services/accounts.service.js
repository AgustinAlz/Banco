import Account from "../models/account.model.js";
import { getUsersService } from "./users.service.js";

export const getAccountsService = async (user) => {
    // Only Admin get all accounts
    if (!user.role.adminPermission) {
        throw new Error('Not Authorized.');
    }
    return await Account.find().populate("accountType").populate("owners");
}

export const getAccountsByOwnerService = async (ownerId) => {
    return await Account.find({ "owners": ownerId }).populate("accountType").populate("owners");
}

export const getAccountService = async (accountId) => {
    return await Account.findById({ "_id": accountId }).populate("accountType").populate("owners");
}

export const createAccountService = async (account, user) => {
    // Only Admin can create, update and delete accounts
    if(!user.role.adminPermission){
        throw {statusCode: 401, message: 'Not Authorized.'};
    }
    
    const adminUsers = await getUsersService('admninUsersOnly');
    const adminOnwer = adminUsers.filter((admin) => account.owners.includes(admin._id)).length > 0;

    if (adminOnwer) {
        throw new Error('Admin cannot be set as owner of an acount');
    }

    return await account.save();
}

export const deleteAccountService = async (accountId, user) => {
    // Only Admin can create, update and delete accounts
    if(!user.role.adminPermission){
        throw {statusCode: 401, message: 'Not Authorized.'};
    }
    console.log("service",user);
    const deletedAccount = await Account.findByIdAndDelete(accountId);
    if (!deletedAccount) {
        throw {statusCode: 404, message: 'Account not found.'};
    }
}

export const updateAccountService = async (accountId, account, user) => {
    // Only Admin can create, update and delete accounts
    if(!user.role.adminPermission){
        throw {statusCode: 401, message: 'Not Authorized.'};
    }

    const accountUpdated = await Account.findOneAndUpdate(
        { _id: accountId },
        { number: account.number, owners: account.owners, accountType: account.accountType, balance: account.balance },
        { new: true }
    );

    return accountUpdated;
}
