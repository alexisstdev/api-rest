import "express";

declare module "express-serve-static-core" {
	interface Response {
		json(body: object, links: object[], removeLinks?: string[]): Response;
	}
}
