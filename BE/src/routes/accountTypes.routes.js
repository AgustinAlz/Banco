import { Router } from "express";
import { getAccountTypes, createAccountType, getAccountType, updateAccountType, deleteAccountType } from "../controllers/accountsType.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", auth, getAccountTypes);
router.post("/create", auth, createAccountType);
router.get("/:id", auth, getAccountType);
router.put("/:id", auth, updateAccountType);
router.delete("/:id", auth, deleteAccountType);

export default router;