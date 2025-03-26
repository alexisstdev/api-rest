import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { ENV } from '@src/config/env';
import type { TokenPayload, UserWithoutPassword } from '@src/utils/authTypes';
import type { User } from '@prisma/client';

export const generateToken = (user: User): string => {
	const payload: TokenPayload = {
		id: user.id,
		email: user.email,
		role: user.role || 'user',
	};

	return jwt.sign(payload, ENV.JWT_SECRET, {
		expiresIn: '1h',
	});
};

export const verifyToken = (token: string): TokenPayload | null => {
	try {
		return jwt.verify(token, ENV.JWT_SECRET) as TokenPayload;
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
