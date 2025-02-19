import express from "express";
import cors from "cors";
import { ENV } from "./config/env";
import { setupRoutes } from "./routes/routes";
import globalErrorHandler from "./middleware/globalErrorHandler";

export function createApp() {
	const app = express();

	app.use(
		cors({
			origin: [ENV.CLIENT_URL],
			credentials: true,
		}),
	);

	app.use(express.json());

	app.get("/", (_, res) => {
		res.send("Hello world");
	});

	setupRoutes(app);

	app.use((_, res) => {
		res.status(404).send("No se encontró la ruta");
	});

	app.use(globalErrorHandler);

	return app;
}
