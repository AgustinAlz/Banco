import { Router } from "express";
import { getUsers, createUser, getUser, updateUser, deleteUser } from "../controllers/users.controller.js";
import { auth, authAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/:regularUsers", auth, getUsers);
router.post("/create", authAdmin, createUser);
router.get("/:id", auth, getUser);
router.put("/:id", authAdmin, updateUser);
router.delete("/:id", authAdmin, deleteUser);

export default router;