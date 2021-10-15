import { Router } from "express";


const auth = require ("../helpers/auth");

const router = Router();

router.post("/login",auth.authenticate,auth.login);

export default router;