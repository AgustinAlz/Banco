import { Router } from "express";
import { getRoles, createRole, getRole, updateRole, deleteRole } from "../controllers/roles.controller.js";

const router = Router();

router.get("/roles", getRoles);
router.post("/roles/create", createRole);
router.get("/roles/:id", getRole);
router.put("/roles/:id", updateRole);
router.delete("roles/:id", deleteRole);

export default router;