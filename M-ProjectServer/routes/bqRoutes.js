import express from "express";
import { GetBQData, CreateBQData } from "../controllers/bqController.js";

const router = express.Router();

router.get("/bq", GetBQData);
router.post("/bq", CreateBQData);

export default router;
