import { Router } from "express";
import IndexController from "../controllers/IndexController";

const router = Router();

router.get("/rawSQL", IndexController.BankCtrl.findBankBySQL);
router.get("/", IndexController.BankCtrl.findAllRows);
router.get("/:id", IndexController.BankCtrl.findRowById);

//create
router.post("/", IndexController.BankCtrl.createRow);
// put
router.put("/:id", IndexController.BankCtrl.updateRow);
// delete
router.delete("/:id", IndexController.BankCtrl.deleteRow);

export default router;