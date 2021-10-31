import { Router } from "express";
import jwt from "jsonwebtoken";
import IndexController from "../controllers/IndexController";

const router = Router();

async function verifyToken(req, res, next) {
  const accessToken = req.header("Authorization")
  try {
    const payload = jwt.verify(accessToken, process.env.TOKEN_SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(400).json({ error });
  }
}

router.get("/", IndexController.ReserveCtrl.findAllReserve);
router.get("/:user_id", IndexController.ReserveCtrl.findReserveByUserIdAndStatus);
router.post("/", verifyToken, IndexController.ReserveCtrl.checkReserveExist, IndexController.ReserveLineCtrl.addReserveLine);

export default router;