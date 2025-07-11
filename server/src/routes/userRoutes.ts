import express from 'express';
import {registerUser, loginUser} from '../controllers/userController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
// router.get('/profile', verifyToken, getUserProfile); 

export default router;