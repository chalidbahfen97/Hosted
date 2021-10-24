import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

router.get("/rawSQL", IndexController.orderController.findOrderBySQL);
router.get("/", IndexController.orderController.findAllRows);
router.get("/:id", IndexController.orderController.findRowById);

router.post("/", IndexController.orderController.createRow);

router.put("/:id", IndexController.orderController.updateRow);

router.delete("/:id", IndexController.orderController.deleteRow);

export default router;
