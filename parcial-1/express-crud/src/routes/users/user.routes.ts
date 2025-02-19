import { Router } from "express";
import * as controller from "./user.controller";
import catchAsync from "@src/utils/catchAsync";

export const userRoutes = Router();

userRoutes.get("/", catchAsync(controller.get));

userRoutes.get("/:id", catchAsync(controller.getById));

userRoutes.delete("/:id", catchAsync(controller.remove));

userRoutes.post("/", catchAsync(controller.create));

userRoutes.put("/:id", catchAsync(controller.update));

export default userRoutes;
