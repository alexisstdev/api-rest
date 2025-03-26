import type { RequestHandler } from 'express';
import prisma from '@src/db/db';
import 'express-hateoas-links';

export const get: RequestHandler = async (_, res) => {
	const users = await prisma.user.findMany();

	res.render('users', { users });
};

export const getById: RequestHandler = async (req, res) => {
	const { id } = req.params;

	const user = await prisma.user.findUnique({
		where: { id: +id },
	});

	if (!user) {
		res.status(404).json({ error: 'User not found' });
		return;
	}

	res.json(user);
};

export const update: RequestHandler = async (req, res) => {
	const { id } = req.params;
	const userData = req.body;

	const userToEdit = await prisma.user.findUnique({
		where: { id: +id },
	});

	if (!userToEdit) {
		res.status(404).json({ error: 'User not found' });
		return;
	}

	const updatedUser = await prisma.user.update({
		where: { id: +id },
		data: { ...userData, updatedAt: new Date() },
	});

	res.json(updatedUser);
};

export const remove: RequestHandler = async (req, res) => {
	const { id } = req.params;

	const deletedUser = await prisma.user.delete({
		where: { id: +id },
	});

	res.json(deletedUser);
};

export const create: RequestHandler = async (req, res) => {
	const userData = req.body;

	const newUser = await prisma.user.create({
		data: {
			email: userData.email,
			username: userData.username,
			firstName: userData.firstName,
			lastName: userData.lastName,
		},
	});

	res.status(201).json(newUser);
};
