import { Router } from "express";
import authJWT from "../helpers/authJWT";

const router = Router();

router.post("/sign-in", authJWT.authenticate, authJWT.login);

export default router;