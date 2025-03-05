import type { RequestHandler } from "express";
import prisma from "@src/db/db";
import "express-hateoas-links";
import { getBaseUrl } from "@src/utils/getBaseUrl";

export const get: RequestHandler = async (_, res) => {
	const users = await prisma.user.findMany();
	res.json(users);
};

export const getById: RequestHandler = async (req, res) => {
	const { id } = req.params;

	const user = await prisma.user.findUnique({
		where: { id: +id },
	});

	if (!user) {
		res.status(404).json({ error: "User not found" });
		return;
	}

	res.json(user, [
		{ rel: "self", method: "GET", href: `${getBaseUrl(req)}/users/${id}` },
		{ rel: "collection", method: "GET", href: `${getBaseUrl(req)}/users` },
		{ rel: "update", method: "PUT", href: `${getBaseUrl(req)}/users/${id}` },
		{ rel: "delete", method: "DELETE", href: `${getBaseUrl(req)}/users/${id}` },
	]);
};

export const update: RequestHandler = async (req, res) => {
	const { id } = req.params;
	const userData = req.body;

	const userToEdit = await prisma.user.findUnique({
		where: { id: +id },
	});

	if (!userToEdit) {
		res.status(404).json({ error: "User not found" });
		return;
	}

	const updatedUser = await prisma.user.update({
		where: { id: +id },
		data: { ...userData, updatedAt: new Date() },
	});

	res.json(updatedUser, [
		{ rel: "self", method: "GET", href: `${getBaseUrl(req)}/users/${id}` },
		{ rel: "collection", method: "GET", href: `${getBaseUrl(req)}/users` },
		{ rel: "update", method: "PUT", href: `${getBaseUrl(req)}/users/${id}` },
		{ rel: "delete", method: "DELETE", href: `${getBaseUrl(req)}/users/${id}` },
	]);
};

export const remove: RequestHandler = async (req, res) => {
	const { id } = req.params;

	const deletedUser = await prisma.user.delete({
		where: { id: +id },
	});

	res.json(deletedUser, [
		{ rel: "collection", method: "GET", href: `${getBaseUrl(req)}/users` },
		{ rel: "create", method: "POST", href: `${getBaseUrl(req)}/users` },
	]);
};

export const create: RequestHandler = async (req, res) => {
	const userData = req.body;

	const newUser = await prisma.user.create({
		data: userData,
	});

	res.status(201).json(newUser, [
		{
			rel: "self",
			method: "GET",
			href: `${getBaseUrl(req)}/users/${newUser.id}`,
		},
		{ rel: "collection", method: "GET", href: `${getBaseUrl(req)}/users` },
		{
			rel: "update",
			method: "PUT",
			href: `${getBaseUrl(req)}/users/${newUser.id}`,
		},
		{
			rel: "delete",
			method: "DELETE",
			href: `${getBaseUrl(req)}/users/${newUser.id}`,
		},
	]);
};
