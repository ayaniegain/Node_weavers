import express from "express";
const router = express.Router();

import {
  uploadMultiple,
  uploadSingle,
} from "../../../controllers/upload.controller.js";
import { uploadMiddleware } from "../../../middleware/upload.middleware.js";

router.post("/single", uploadMiddleware().single("file"), uploadSingle);
router.post("/multiple", uploadMiddleware().array('files', 5), uploadMultiple);

export default router;
