import type { RequestHandler } from 'express';
import prisma from '@src/db/db';
import 'express-hateoas-links';

/**
 * Gets all users and renders them using the 'users' template.
 *
 * @route GET /users
 * @returns {void} Renders the 'users' template with user data.
 */
export const get: RequestHandler = async (_, res) => {
	const users = await prisma.user.findMany();

	res.render('users', { users });
};

/**
 * Retrieves a specific user by ID.
 *
 * @route GET /users/:id
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - The ID of the user to retrieve.
 * @returns {Object} 200 - User object.
 * @returns {Object} 404 - Error message when user not found.
 */
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

/**
 * Updates an existing user.
 *
 * @route PUT /users/:id
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - The ID of the user to update.
 * @param {Object} req.body - The updated user data.
 * @returns {Object} 200 - Updated user object.
 * @returns {Object} 404 - Error message when user not found.
 */
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

/**
 * Deletes a user by ID.
 *
 * @route DELETE /users/:id
 * @param {Object} req - Express request object.
 * @param {Object} req.params - Request parameters.
 * @param {string} req.params.id - The ID of the user to delete.
 * @returns {Object} 200 - The deleted user object.
 */
export const remove: RequestHandler = async (req, res) => {
	const { id } = req.params;

	const deletedUser = await prisma.user.delete({
		where: { id: +id },
	});

	res.json(deletedUser);
};

/**
 * Creates a new user.
 *
 * @route POST /users
 * @param {Object} req - Express request object.
 * @param {Object} req.body - The user data.
 * @param {string} req.body.email - The user's email address.
 * @param {string} req.body.username - The user's username.
 * @param {string} req.body.firstName - The user's first name.
 * @param {string} req.body.lastName - The user's last name.
 * @returns {Object} 201 - The newly created user object.
 */
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
