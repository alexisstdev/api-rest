import Fastify from "fastify";
import fastifyStatic from "@fastify/static";
import { join } from "node:path";

const fastify = Fastify();
const PORT = 3000;

fastify.register(fastifyStatic, {
	root: join(process.cwd(), "public"),
});

fastify.get("/", (_, reply) => {
	reply.status(200).sendFile("index.html");
});

fastify.listen({ port: PORT }, (err) => {
	if (err) {
		console.error(err);
		process.exit(1);
	}

	console.log(`Server 1 listening on http://localhost:${PORT}`);
});
