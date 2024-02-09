import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users.routes.js";
import rolesRoutes from "./routes/roles.routes.js";
import authRoutes from "./routes/auth.routes.js";
import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(cors({credentials: true, origin: FRONTEND_URL}));
//app.use(cors({origin: FRONTEND_URL}));
app.use(express.json());
app.use("/api", rolesRoutes);
app.use("/api", usersRoutes);
app.use("/api/auth", authRoutes);

export default app;