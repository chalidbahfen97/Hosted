import { Router } from "express";
import IndexController from "../controller/IndexController";

const router = Router();

router.get(
  "/rawSQL",
  IndexController.houseReserveLinesController.findHritBySQL
);
router.get("/", IndexController.houseReserveLinesController.findAllRows);
router.get("/:id", IndexController.houseReserveLinesController.findRowById);

router.post("/", IndexController.houseReserveLinesController.createRow);

router.put("/:id", IndexController.houseReserveLinesController.updateRow);

router.delete("/:id", IndexController.houseReserveLinesController.deleteRow);

export default router;
