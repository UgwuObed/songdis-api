import { Router } from "express";
import { UserControllers } from "../controllers";
import { authentication } from "../middlewares";

const router = Router();

const { registerUser, login } = UserControllers;



router.post("/register", registerUser);
router.post("/login", login);



export default router;
