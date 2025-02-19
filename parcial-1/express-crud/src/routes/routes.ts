import type { Express } from "express";
import userRoutes from "./users/user.routes";

export function setupRoutes(app: Express) {
	app.use("/users", userRoutes);
}
