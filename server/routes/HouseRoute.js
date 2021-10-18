import { Router } from "express";
import IndexController from "../controllers/IndexController"
import UpDownloadHelper from "../helpers/UpDownloadHelper";

const router = Router();

// router houses_bedrooms
router.get("/bedrooms", IndexController.HouseBedroom.findAllRows);
router.get("/bedrooms/:hobedId", IndexController.HouseBedroom.findBedroomById);
router.post("/bedrooms/create", IndexController.HouseBedroom.addBedroom);
router.put("/bedrooms/:hobedId", IndexController.HouseBedroom.updateBedroom);
router.delete("/bedrooms/:hobedId", IndexController.HouseBedroom.deleteBedroom);

// router houses_reviews
router.get("/reviews", IndexController.HouseReviewCtrl.findAllRows);
router.get("/reviews/:houseId", IndexController.HouseReviewCtrl.findReviewsByHouseId);
router.post("/reviews/create", IndexController.HouseReviewCtrl.createHouseReview);
router.put("/reviews/update", IndexController.HouseReviewCtrl.updateHouseReview);
router.delete("/reviews/delete", IndexController.HouseReviewCtrl.deleteHouseReview);

// router houses
router.get("/", IndexController.HouseCtrl.findAllRows);
router.get("/:houseId", IndexController.HouseCtrl.findHouseById);
router.get("/images/:filename", UpDownloadHelper.showHouseImage);
router.post("/", IndexController.HouseCtrl.createHouse);
router.post("/multipart", IndexController.HouseCtrl.createHouseImage, IndexController.HouseImageCtrl.createHouseImage);
router.delete("/:houseId", IndexController.HouseCtrl.deleteHouse);


export default router;