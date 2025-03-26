import { createApp } from "./app";
import { ENV } from "./config/env";
import * as https from "node:https";
import * as fs from "node:fs";
import * as path from "node:path";

const app = createApp();

const key = fs.readFileSync(path.join(__dirname, "../certs/key.pem"), "utf8");
const cert = fs.readFileSync(path.join(__dirname, "../certs/cert.pem"), "utf8");

const server = https.createServer({ key, cert }, app);

server.listen(ENV.PORT, "::", async () => {
	console.log(
		`Server is running on port https://localhost:${ENV.PORT} at ${new Date().toLocaleDateString()}`,
	);

	app.emit("listening");
});
