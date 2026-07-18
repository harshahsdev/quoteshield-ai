import express from 'express';
import { RegisterUser, LoginUser, handleRefreshToken } from '../controllers/userController.js';
import { verifyRefresh } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', RegisterUser);
router.post('/login', LoginUser);
router.get('/token', verifyRefresh, handleRefreshToken);

export default router;

