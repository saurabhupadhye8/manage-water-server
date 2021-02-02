import express from 'express';
import { drinkWater } from '../controllers/waterManagementController.js';

const router = express.Router();

router.post('/drinkWater', drinkWater);

export default router;