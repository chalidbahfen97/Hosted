import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

router.get("/rawSQL", IndexController.bankController.findBankBySQL);
router.get("/", IndexController.bankController.findAllRows);
router.get("/:id", IndexController.bankController.findRowById);

//create
router.post("/", IndexController.bankController.createRow);
// put
router.put("/:id", IndexController.bankController.updateRow);
// delete
router.delete("/:id", IndexController.bankController.deleteRow);

export default router;
