import { serve } from "bun";

serve({
	port: 3001,
	fetch(req) {
		if (req.method === "OPTIONS") {
			return new Response(null, {
				headers: {
					"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
					"Access-Control-Allow-Headers": "Content-Type",
				},
			});
		}

		const url = new URL(req.url);
		const enableCORS = url.searchParams.get("cors") === "true";

		const headers = new Headers({
			"Content-Type": "application/json",
		});

		if (enableCORS) {
			headers.set("Access-Control-Allow-Origin", "http://localhost:3000");
			headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
			headers.set("Access-Control-Allow-Headers", "Content-Type");
		}

		return new Response(JSON.stringify({ message: "Hello from Server 2!" }), {
			headers,
		});
	},
});

console.log("Server 2 running on http://localhost:3001");
