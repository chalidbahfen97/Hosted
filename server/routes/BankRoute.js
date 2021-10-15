import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

router.get("/rawSQL",IndexController.BankController.findBankBySQL);
router.get("/",IndexController.BankController.findAllRows);
router.get("/:id",IndexController.BankController.findRowById);

//create
router.post("/",IndexController.BankController.createRow);
// put
router.put("/:id",IndexController.BankController.updateRow);
// delete
router.delete("/:id",IndexController.BankController.deleteRow);

export default router;