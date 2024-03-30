import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import rolesRoutes from "./routes/roles.routes.js";
import accountsRoutes from "./routes/accounts.routes.js";
import accountTypesRoutes from "./routes/accountTypes.routes.js";
import transactionsRoutes from "./routes/transactions.routes.js";
import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(cors({credentials: true, origin: FRONTEND_URL}));
app.use(cookieParser());
//app.use(cors({origin: FRONTEND_URL}));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/users", usersRoutes);
app.use("/api", rolesRoutes);
app.use("/api/accounts", accountsRoutes);
app.use("/api/accountsTypes", accountTypesRoutes);
app.use("/api/transactions", transactionsRoutes);

export default app;