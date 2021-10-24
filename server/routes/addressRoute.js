import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

router.get("/rawSQL", IndexController.addressController.findAddressBySQL);
router.get("/", IndexController.addressController.findAllRows);
router.get("/:id", IndexController.addressController.findRowById);

router.post("/", IndexController.addressController.createRow);

router.put("/:id", IndexController.addressController.updateRow);

router.delete("/:id", IndexController.addressController.deleteRow);

export default router;
