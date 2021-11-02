import { Router } from "express";
import authJWT from "../helpers/authJWT"
import IndexController from "../controllers/IndexController";

const router = Router();

router.get("/all", IndexController.ReserveCtrl.findAllReserve);
router.get("/", authJWT.ensureUser, IndexController.ReserveCtrl.findReserveByUserIdAndStatus);
router.post("/", authJWT.ensureUser, IndexController.ReserveCtrl.checkReserveExist, IndexController.ReserveLineCtrl.checkReserveLineExist, IndexController.ReserveLineCtrl.addReserveLine);
// router.delete("/")

export default router;