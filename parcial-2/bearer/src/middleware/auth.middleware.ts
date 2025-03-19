import type { Response, NextFunction } from 'express';
import * as authService from '@src/services/auth.service';
import type { AuthRequest } from '@src/utils/authTypes';

export const authenticate = (
	req: AuthRequest,
	res: Response,
	next: NextFunction,
): void => {
	try {
		const authHeader = req.headers.authorization;

		if (!authHeader) {
			res.status(401).json({ message: 'No authorization header provided' });
			return;
		}

		if (!authHeader.startsWith('Bearer ')) {
			res.status(401).json({ message: 'Invalid token format' });
			return;
		}

		const token = authHeader.substring(7);

		const decoded = authService.verifyToken(token);

		if (!decoded) {
			res.status(401).json({ message: 'Invalid or expired token' });
			return;
		}

		req.user = decoded;

		next();
	} catch (error) {
		const err = error as Error;
		res.status(500).json({
			message: 'Authentication error',
			error: err.message,
		});
	}
};

export const optionalAuth = (req: AuthRequest, next: NextFunction): void => {
	try {
		const authHeader = req.headers.authorization;

		if (authHeader?.startsWith('Bearer ')) {
			const token = authHeader.substring(7);
			const decoded = authService.verifyToken(token);

			if (decoded) {
				req.user = decoded;
			}
		}

		next();
	} catch (error) {
		next();
	}
};

export const authorize = (roles: string | string[]) => {
	return (req: AuthRequest, res: Response, next: NextFunction): void => {
		if (!req.user) {
			res.status(401).json({ message: 'Authentication required' });
			return;
		}

		if (!roles) {
			next();
			return;
		}

		const userRole = req.user.role;
		const requiredRoles = Array.isArray(roles) ? roles : [roles];

		if (!requiredRoles.includes(userRole)) {
			res.status(403).json({ message: 'Insufficient permissions' });
			return;
		}

		next();
	};
};
