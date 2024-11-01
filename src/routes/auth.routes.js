import { Router } from "express";
import * as authController from "../modules/auth/controllers/auth.controller.js";
import validateRequest from "../infra/middlewares/validateRequest.middleware.js";
import LoginSchema from "../modules/auth/schemas/login.schema.js";

const router = Router();

router.post('/login', validateRequest(LoginSchema), authController.login);

export default router;