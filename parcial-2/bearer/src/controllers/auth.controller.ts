import type { Request, Response } from 'express';
import prisma from '@src/db/db';
import catchAsync from '@src/utils/catchAsync';
import {
	comparePassword,
	excludePassword,
	generateToken,
	hashPassword,
} from '@src/services/auth.service';

export const login = catchAsync(async (req: Request, res: Response) => {
	const { email, password } = req.body;

	if (!email || !password) {
		return res.status(400).json({ message: 'Email and password are required' });
	}

	const user = await prisma.user.findUnique({
		where: { email },
	});

	if (!user) {
		return res.status(401).json({ message: 'Invalid credentials' });
	}

	const isPasswordValid = await comparePassword(password, user.password);

	if (!isPasswordValid) {
		return res.status(401).json({ message: 'Invalid credentials' });
	}

	const token = generateToken(user);
	// Return token and user info without password
	return res.status(200).json({
		message: 'Login successful',
		token,
		user: excludePassword(user),
	});
});

export const register = catchAsync(async (req: Request, res: Response) => {
	const { email, password, firstName, lastName, username } = req.body;

	if (!email || !password || !firstName || !lastName || !username) {
		return res.status(400).json({
			message:
				'Email, password, firstName, lastName, and username are required',
		});
	}

	const existingUser = await prisma.user.findFirst({
		where: {
			OR: [{ email }, { username }],
		},
	});

	if (existingUser) {
		return res.status(409).json({
			message:
				existingUser.email === email
					? 'Email already registered'
					: 'Username already taken',
		});
	}

	const hashedPassword = await hashPassword(password);

	const newUser = await prisma.user.create({
		data: {
			email,
			password: hashedPassword,
			firstName,
			lastName,
			username,
			role: 'user',
		},
	});

	const token = generateToken(newUser);

	return res.status(201).json({
		message: 'User registered successfully',
		token,
		user: excludePassword(newUser),
	});
});

export const getProfile = catchAsync(async (req: Request, res: Response) => {
	const userId = req?.user?.id;

	const user = await prisma.user.findUnique({
		where: { id: userId },
	});

	if (!user) {
		return res.status(404).json({ message: 'User not found' });
	}

	return res.json({
		message: 'Profile data',
		user: excludePassword(user),
	});
});
