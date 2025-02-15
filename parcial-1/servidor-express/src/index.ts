import express, { type RequestHandler } from "express";
import { join } from "node:path";
import rateLimit from "express-rate-limit";
import xmlparser from "express-xml-bodyparser";
import multer from "multer";
import { extname } from "node:path";

const storage = multer.diskStorage({
	destination: (_, __, cb) => {
		cb(null, "uploads/");
	},
	filename: (_, file, cb) => {
		cb(null, `${Date.now()}${extname(file.originalname)}`);
	},
});

const upload = multer({ storage });

const app = express();
const PORT = 3003;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(xmlparser());
app.use(express.static(join(process.cwd(), "public")));

const limiterMiddleware = rateLimit({
	windowMs: 1 * 15 * 1000,
	max: 5,
	message: { error: "Demasiadas solicitudes, intenta más tarde." },
	standardHeaders: true,
	legacyHeaders: false,
});

app.get("/api/v1/query", limiterMiddleware, (req, res) => {
	const { name, age } = req.query;
	res.json({ message: "Query params", params: { name, age } });
});

app.get("/api/v1/users/:id", limiterMiddleware, (req, res) => {
	const { id } = req.params;
	res.json({ message: "URL params", params: { id } });
});

app.post("/api/v1/body", limiterMiddleware, (req, res) => {
	const data = req.body;
	res.json({ message: "Body params", data });
});

app.post("/api/v1/xml", limiterMiddleware, (req, res) => {
	const xmlData = req.body;

	console.log(xmlData);

	res.type("application/xml");
	res.send(`<?xml version="1.0"?>
					<response>
							<message>XML received</message>
							<data>${JSON.stringify(xmlData)}</data>
					</response>`);
});

app.post("/api/v1/upload", [limiterMiddleware, upload.single("file")], ((
	req,
	res,
) => {
	const formData = req.body;
	const file = req.file;

	if (!file) {
		return res.status(400).json({ error: "No file uploaded" });
	}

	res.json({
		message: "Form received",
		fields: formData,
		file: {
			filename: file.filename,
			path: file.path,
			mimetype: file.mimetype,
			size: file.size,
		},
	});
}) as RequestHandler);

app.get("/", limiterMiddleware, (_, res) => {
	res.status(200).sendFile(join(process.cwd(), "public", "index.html"));
});

app.get("/api/v1/data", limiterMiddleware, (req, res) => {
	res.status(200).json([
		{ id: 1, name: "John Doe" },
		{ id: 2, name: "Jane Doe" },
		{ id: 3, name: "Bob Smith" },
	]);
});

app.listen(PORT, () => {
	console.log(`Server listening on http://localhost:${PORT}`);
});
