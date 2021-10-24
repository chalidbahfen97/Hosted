import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

router.get("/rawSQL", IndexController.bankAccountController.findAccountBySQL);
router.get("/", IndexController.bankAccountController.findAllRows);
router.get("/:id", IndexController.bankAccountController.findRowById);

//create
router.post("/", IndexController.bankAccountController.createRow);
// put
router.put("/:id", IndexController.bankAccountController.updateRow);
// delete
router.delete("/:id", IndexController.bankAccountController.deleteRow);

export default router;
