import type { User } from "@prisma/client";
import type { TokenPayload, UserWithoutPassword } from "@src/utils/authTypes";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import fs from "node:fs";
import path from "node:path";

const PRIVATE_KEY = fs.readFileSync(
	path.join(process.cwd(), "keys/private.pem"),
);

const PUBLIC_KEY = fs.readFileSync(path.join(process.cwd(), "keys/public.pem"));

export const generateToken = (user: User): string => {
	const payload: TokenPayload = {
		id: user.id,
		email: user.email,
		role: user.role || "user",
	};

	return jwt.sign(payload, PRIVATE_KEY, {
		algorithm: "RS256",
		expiresIn: "1h",
	});
};

export const verifyToken = (token: string): TokenPayload | null => {
	try {
		return jwt.verify(token, PUBLIC_KEY, {
			algorithms: ["RS256"],
		}) as TokenPayload;
	} catch (error) {
		return null;
	}
};

export const hashPassword = async (password: string): Promise<string> => {
	return bcrypt.hash(password, 10);
};

export const comparePassword = async (
	password: string,
	hashedPassword: string,
): Promise<boolean> => {
	return bcrypt.compare(password, hashedPassword);
};

export const excludePassword = (user: User): UserWithoutPassword => {
	const { password, ...userWithoutPassword } = user;
	return userWithoutPassword;
};
