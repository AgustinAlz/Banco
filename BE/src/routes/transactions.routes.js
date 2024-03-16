import { Router } from "express";
import { getTransactions, createTransaction, getTransaction, updateTransaction, deleteTransaction } from "../controllers/transactions.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/account/:accountId/transactions", auth, getTransactions);
router.get("/account/:accountId/transactions/:id", auth, getTransaction);
router.post("/account/:accountId/transactions/create", auth, createTransaction);
router.put("/account/:accountId/transactions/:id", auth, updateTransaction);
router.delete("/account/:accountId/transactions/:id", auth, deleteTransaction);

export default router;