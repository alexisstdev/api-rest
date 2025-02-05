export interface ServerResponse {
	message: string;
	data?: unknown;
}

export interface CORSOptions {
	origin: string | string[];
	methods: string[];
	allowedHeaders: string[];
}
