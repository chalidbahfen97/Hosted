import { Router } from "express";
import IndexController from "../controllers/IndexController";
import authJWT from "../helpers/authJWT";

const router = Router();

router.post("/sign-in", authJWT.authenticate, authJWT.login);
router.post("/sign-up", IndexController.UserCtrl.signUp);

export default router;