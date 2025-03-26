import { z } from 'zod';

const envSchema = z.object({
	CLIENT_URL: z.string().url(),
	PORT: z.string().transform((port) => +port),
	ENVIRONMENT: z.enum(['development', 'production']),
	DATABASE: z.object({
		DATABASE_URL: z.string().url(),
	}),
	JWT_SECRET: z.string().min(10),
});

const parsedEnv = envSchema.safeParse({
	CLIENT_URL: process.env.CLIENT_URL,
	PORT: process.env.PORT,
	ENVIRONMENT: process.env.ENVIRONMENT,
	DATABASE: {
		DATABASE_URL: process.env.DATABASE_URL,
	},
	JWT_SECRET: process.env.JWT_SECRET,
});

if (!parsedEnv.success) {
	console.error(
		'❌ Error en las variables de entorno:',
		JSON.stringify(parsedEnv.error, null, 2),
	);

	process.exit(1);
}

export const ENV = parsedEnv.data;
