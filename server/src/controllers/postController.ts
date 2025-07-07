import { Request, Response } from 'express';
import prisma from '../config/prismaClient';

export async function getAllPosts(req: Request, res: Response) {
  const posts = await prisma.post.findMany({
    include: {
      user: true,
      comments: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  res.json(posts);
}

export async function createPost(req: Request, res: Response) {
  const { title, description, category, userId } = req.body;

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        description,
        category,
        userId,
      },
    });

    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: "Failed to create post" });
  }
}

export async function upvotePost(req: Request, res: Response) {
  const { id } = req.params;

  try {
    const updated = await prisma.post.update({
      where: { id },
      data: {
        upvotes: { increment: 1 },
      },
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to upvote" });
  }
}
