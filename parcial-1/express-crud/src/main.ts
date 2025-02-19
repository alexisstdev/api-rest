import { createApp } from "./app";
import { ENV } from "./config/env";

const app = createApp();

app.listen(ENV.PORT, "::", async () => {
	console.log(
		`Server is running on port ${ENV.PORT} at ${new Date().toLocaleDateString()}`,
	);

	app.emit("listening");
});
