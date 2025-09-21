import { Router } from 'express';
import { forkliftController } from '../controllers/forkliftController.js';

const router = Router();

router.get("/status", forkliftController.getForkliftsStatus);
router.get("/", forkliftController.getForklifts);
router.get("/:id", forkliftController.getForkliftsDetail);

export default router; 
