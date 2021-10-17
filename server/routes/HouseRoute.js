import { Router } from "express";
import IndexController from "../controllers/IndexController"
import UpDownloadHelper from "../helpers/UpDownloadHelper";

const router = Router();

router.get("/", IndexController.HouseCtrl.findAllRows);
router.get("/images/:filename", UpDownloadHelper.showHouseImage);
router.post("/", IndexController.HouseCtrl.createHouse);
router.post("/multipart", IndexController.HouseCtrl.createHouseImage, IndexController.HouseImageCtrl.createHouseImage);
router.delete("/:houseId", IndexController.HouseCtrl.deleteHouse);

export default router;