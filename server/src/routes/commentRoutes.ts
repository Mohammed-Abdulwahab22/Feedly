import express from 'express';
import {
  getAllComments,
  getCommentById,
  createComment,
  updateComment,
  deleteComment,
  getCommentsByPost 
} from '../controllers/commentController';

import { verifyToken } from '../middleware/authMiddleware';
const router = express.Router();

router.get('/', getAllComments);
router.get('/:id', getCommentById);
router.post('/', verifyToken, createComment);
router.put('/:id', verifyToken, updateComment);
router.delete('/:id', verifyToken, deleteComment);
router.get('/post/:postId', getCommentsByPost);


export default router;