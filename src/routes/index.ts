import { Router } from "express";
import { authentication } from "../middlewares";

import UserRoutes from "./user";


const router = Router();



router.use("/user", UserRoutes);



export default router;
