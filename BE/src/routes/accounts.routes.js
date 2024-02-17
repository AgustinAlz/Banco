import { Router } from "express";
import { getAccountsByOwner, createAccount, getAccount, updateAccount, deleteAccount } from "../controllers/accounts.controller.js";
import { auth } from "../middlewares/auth.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { accountSchema } from "../schemas/account.schema.js";

const router = Router();

router.get("/owner/:id", auth, getAccountsByOwner);
router.post("/create", auth, validateSchema(accountSchema), createAccount);
router.get("/:id", auth, getAccount);
router.put("/:id", auth, updateAccount);
router.delete("/:id", auth, deleteAccount);

export default router;