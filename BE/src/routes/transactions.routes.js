import { Router } from "express";
import { getTransactions, createTransaction, getTransaction, updateTransaction, deleteTransaction } from "../controllers/transactions.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/account/:accountId", auth, getTransactions);
router.get("/:id", auth, getTransaction);
router.post("/create", auth, createTransaction);
router.put("/:id", auth, updateTransaction);
router.delete("/:id", auth, deleteTransaction);

export default router;