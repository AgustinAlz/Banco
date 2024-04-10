import { Router } from "express";
import { getTransactions, createTransaction, getTransaction, updateTransaction, deleteTransaction } from "../controllers/transactions.controller.js";
import { auth, authAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/account/:accountId", auth, getTransactions);
router.get("/:id", auth, getTransaction);
router.post("/create", auth, createTransaction);
router.put("/:id", authAdmin, updateTransaction);
router.delete("/:id", authAdmin, deleteTransaction);

export default router;