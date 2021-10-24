import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

// method post
router.post("/signup", IndexController.userController.signup);
router.get("/signin", IndexController.userController.signin);

export default router;
