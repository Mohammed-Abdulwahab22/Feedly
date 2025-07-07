import express from 'express';
import { getAllPosts, createPost, upvotePost } from '../controllers/postController';

const router = express.Router();

router.get('/', getAllPosts);
router.post('/', createPost);
router.patch('/:id/upvote', upvotePost); // Optional

export default router;
