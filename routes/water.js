import express from 'express';
import { drinkWater, getAllDetails } from '../controllers/waterManagementController.js';

const router = express.Router();

router.post('/drinkWater', drinkWater);
router.post('/getAllDetails', getAllDetails)

export default router;