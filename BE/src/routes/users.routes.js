import { Router } from "express";
import { getUsers, createUser, getUser, updateUser, deleteUser } from "../controllers/users.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/users", auth, getUsers);
router.post("/users/create", auth, createUser);
router.get("/users/:id", auth, getUser);
router.put("/users/:id", auth, updateUser);
router.delete("/users/:id", auth, deleteUser);

export default router;