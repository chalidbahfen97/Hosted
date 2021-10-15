import { Router } from "express";
import IndexController from "../contoller/IndexController";

const router = Router();

router.get("/rawSQL",IndexController.hostedController.findHostedBySQL);
router.get("/",IndexController.hostedController.findAllRows);
router.get("/:id",IndexController.hostedController.findRowById);

router.post("/",IndexController.hostedController.createRow);

router.put("/:id",IndexController.hostedController.updateRow);

router.delete("/:id",IndexController.hostedController.deleteRow);

export default router;