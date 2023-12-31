import express from "express";
import cors from "cors";
import usersRoutes from "./routes/users.routes.js";
import rolesRoutes from "./routes/roles.routes.js";
import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(cors({credentials: true, origin: FRONTEND_URL}));
app.use(express.json());
app.use("/api", rolesRoutes);
app.use("/api", usersRoutes);

export default app;