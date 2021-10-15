import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

// method post
router.post("/signup",IndexController.UsersController.signup);
router.get("/signin",IndexController.UsersController.signin);

export default router;