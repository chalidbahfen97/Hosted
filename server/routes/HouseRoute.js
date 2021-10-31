import { Router } from "express";
import IndexController from "../controllers/IndexController";
import UpDownloadHelper from "../helpers/UpDownloadHelper";
import authJWT from "../helpers/authJWT";

const router = Router();

// router houses_bedrooms
router.get("/bedrooms", IndexController.HouseBedroomCtrl.findAllRows);
router.get("/bedrooms/:hobedId", IndexController.HouseBedroomCtrl.findBedroomById);
router.post("/bedrooms", IndexController.HouseBedroomCtrl.addBedroom);
router.put("/bedrooms/:hobedId", IndexController.HouseBedroomCtrl.updateBedroom);
router.delete("/bedrooms/:hobedId", IndexController.HouseBedroomCtrl.deleteBedroom);

// router houses_reviews
router.get("/reviews", IndexController.HouseReviewCtrl.findAllRows);
router.get("/reviews/:houseId", IndexController.HouseReviewCtrl.findReviewsByHouseId);
router.post("/reviews/:houseId", authJWT.ensureUser, IndexController.HouseReviewCtrl.createHouseReview);
router.put("/reviews/:houseId", authJWT.ensureUser, IndexController.HouseReviewCtrl.updateHouseReview);
router.delete("/reviews/:houseId", authJWT.ensureUser, IndexController.HouseReviewCtrl.deleteHouseReview);

// router houses
router.get("/", IndexController.HouseCtrl.findAllRows);
router.get("/:houseId", IndexController.HouseCtrl.findHouseById);
router.get("/images/:filename", UpDownloadHelper.showHouseImage);
router.post("/", authJWT.ensureHosted, IndexController.HostedCtrl.findHostedAcc, IndexController.HouseCtrl.createHouse);
router.post("/multipart", authJWT.ensureHosted, IndexController.HostedCtrl.findHostedAcc, IndexController.HouseCtrl.createHouseImage, IndexController.HouseImageCtrl.createHouseImage);
router.delete("/:houseId", authJWT.ensureHosted, IndexController.HouseCtrl.deleteHouse);


export default router;