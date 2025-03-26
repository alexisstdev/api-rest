import { createApp } from './app';
import { ENV } from './config/env';
import * as https from 'node:https';
import * as fs from 'node:fs';
import * as path from 'node:path';

const app = createApp();

const options = {
	key: fs.readFileSync(path.join(__dirname, '../certs/key.pem')),
	cert: fs.readFileSync(path.join(__dirname, '../certs/cert.pem')),
};

const server = https.createServer(options, app);

server.listen(ENV.PORT, '::', async () => {
	console.log(
		`HTTPS Server is running on port https://localhost:${ENV.PORT} at ${new Date().toLocaleDateString()}`,
	);

	app.emit('listening');
});
