import express from "express";
import {getORS} from "../controllers/ORSController.js";

const router = express.Router();

router.get('/ors', getORS);

export default router;