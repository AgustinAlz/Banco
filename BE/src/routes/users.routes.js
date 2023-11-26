import { Router } from "express";
import { getUsers, createUser, getUser, updateUser, deleteUser } from "../controllers/users.controller.js";

const router = Router();

router.get("/users", getUsers);
router.post("/users/create", createUser);
router.get("/users/:id", getUser);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;