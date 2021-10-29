import { Router } from "express";
import authJWT from "../helpers/authJWT";
import IndexController from "../controllers/IndexController";

const router = Router();

router.post("/signin", authJWT.authenticate, authJWT.login);

// router.post("/signup", IndexController.UsersCtrl.signup);

export default router;