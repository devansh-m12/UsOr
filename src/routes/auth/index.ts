import { Router } from "express";
import Auth from "../../controllers/auth/auth.controllers";

const authRouter = Router();
const authController = new Auth();

authRouter.route("/register").post(
    authController.registerUser
);

export default authRouter;
