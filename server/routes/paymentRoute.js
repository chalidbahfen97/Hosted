import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

router.post("/topup", IndexController.payment.topUp);
router.post("/order", IndexController.payment.payOrder);
router.post("/refund", IndexController.payment.cancelOrder);
router.post("/transfer", IndexController.payment.tarikUang);

export default router;
