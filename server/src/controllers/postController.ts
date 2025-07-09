import { Request, Response } from 'express';
import { AuthRequest } from '../middleware/authMiddleware';
import prisma from '../config/prismaClient';

export async function getAllPosts(req: Request, res: Response) {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: true,
        comments: true,
      },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch posts" });
  }
}

export async function getPostById(req: Request, res: Response) {
  const postId = req.params.id;
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        user: true,
        comments: true,
      },
    });
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch post" });
  }
}

export async function createPost(req: AuthRequest, res: Response) {
  const { title, description, category } = req.body;
  const userId = req.userID;

  if (!title || !description || !category) {
    return res.status(400).json({ error: "Title, description, and category are required" });
  }

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        description,
        category,
        userId: userId,
      },
    });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to create post" });
  }
}

export async function updatePost(req: AuthRequest, res: Response) {
  const postId = req.params.id;
  const { title, description, category } = req.body;
  const userId = req.userID;

  try {
    const updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        description,
        category,
        userId: userId,
      },
    });
    res.json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: "Failed to update post" });
  }
}

export async function deletePost(req: AuthRequest, res: Response) {
  const postId = req.params.id;

  try {
    await prisma.post.delete({
      where: { id: postId },
    });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete post" });
  }
}

export async function upvotePost(req: AuthRequest, res: Response) {
  const postId = req.params.id;
  const userId = req.userID;

  try {
    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        upvotes: {
          increment: 1,
        },
      },
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: "Failed to upvote post" });
  }
}