import express from 'express';
import {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost,
  upvotePost
} from '../controllers/postController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/', getAllPosts);
router.get('/:id', getPostById);
router.post('/', verifyToken, createPost);
router.put('/:id/upvote', upvotePost);
router.put('/:id', verifyToken, updatePost);
router.delete('/:id', verifyToken, deletePost);

export default router;
