import { Router } from "express";
import { getAccounts, getAccountsByOwner, createAccount, getAccount, updateAccount, deleteAccount, getNextAccount } from "../controllers/accounts.controller.js";
import { auth, authAdmin } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { accountSchema } from "../schemas/account.schema.js";

const router = Router();

router.get("/", authAdmin, getAccounts);
router.get("/nextAccount/", authAdmin, getNextAccount);
router.get("/owner/:ownerId", auth, getAccountsByOwner);
router.post("/create", authAdmin, validateSchema(accountSchema), createAccount);
router.get("/:id", auth, getAccount);
router.put("/:id", authAdmin, updateAccount);
router.delete("/:id", authAdmin, deleteAccount);


export default router;