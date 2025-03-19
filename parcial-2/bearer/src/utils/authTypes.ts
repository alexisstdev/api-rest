import type { User } from '@prisma/client';
import type { Request } from 'express';

export interface TokenPayload {
	id: number;
	email: string;
	role: string;
	iat?: number;
	exp?: number;
}

export interface AuthRequest extends Request {
	user?: TokenPayload;
}

export type UserWithoutPassword = Omit<User, 'password'>;
