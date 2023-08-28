import { Router } from "express";
import { signIn, signUp, signOut } from "../controllers/auth.controller.js";
import { schemaValidation } from "../middlewares/schemaValidation.js";
import { loginSchema, userSchema } from "../schemas/authSchemas.js";
import { authValidation } from "../middlewares/authValidation.js";

const authRouter = Router();

authRouter.post("/sign-up", schemaValidation(userSchema), signUp);
authRouter.post("/sign-in", schemaValidation(loginSchema), signIn);
authRouter.post("/sign-out", authValidation, signOut);

export default authRouter;
