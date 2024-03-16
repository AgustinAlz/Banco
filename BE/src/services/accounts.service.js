import Account from "../models/account.model.js";
import { getUsersService } from "./users.service.js";

export const createAccountService = async (account) => {
    const adminUsers = await getUsersService(false, true);
    const adminOnwer = adminUsers.filter((admin) => account.owners.includes(admin._id)).length > 0;

    if (adminOnwer) {
        throw new Error('Admin cannot be set as owner of an acount');
    }

    return await account.save();;
}

export const getAccountService = async (accountId) => {
    return await Account.findById({ "_id": accountId }).populate("accountType").populate("owners");
}