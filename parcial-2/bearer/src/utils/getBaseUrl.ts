import type { Request } from "express";

export const getBaseUrl = (req: Request): string => {
	const protocol = req.protocol;

	const host = req.get("host");

	return `${protocol}://${host}`;
};
