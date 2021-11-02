import { Router } from "express";
import IndexController from "../controllers/IndexController";
import authJWT from "../helpers/authJWT";

const router = Router();

// router.post("/", authJWT.ensureUser, checkSaldo, createOrder)