import { Request, Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import prisma from "../config/prismaClient";

export async function getAllComments(req: Request, res: Response) {
    try {
        const comments = await prisma.comment.findMany({
            include: {
                user: true,
                post: true,
            },
        });
        res.json(comments);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch comments" });
    }
}

export async function getCommentById(req: Request, res: Response) {
    const commentId = req.params.id;
    try {
        const comment = await prisma.comment.findUnique({
            where: { id: commentId },
            include: {
                user: true,
                post: true,
            },
        });
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }
        res.json(comment);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch comment" });
    }
}

export async function createComment(req: AuthRequest, res: Response) {
    const { content, postId } = req.body;
    const userId = req.userID;

    if (!content || !postId) {
        return res.status(400).json({ error: "Content and post ID are required" });
    }

    try {
        const newComment = await prisma.comment.create({
            data: {
                content,
                postId,
                userId,
            },
        });
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: "Failed to create comment" });
    }
}

export async function updateComment(req: AuthRequest, res: Response) {
    const commentId = req.params.id;
    const userId = req.userID;

    const { content } = req.body;

    const comment = await prisma.comment.findUnique({ where: { id: commentId } });

    if (comment?.userId !== userId) {
        return res.status(403).json({ error: "Not authorized" });
    }

    if (!content) {
        return res.status(400).json({ error: "Content is required" });
    }

    try {
        const updatedComment = await prisma.comment.update({
            where: { id: commentId },
            data: { content },
        });
        res.json(updatedComment);
    } catch (error) {
        res.status(500).json({ error: "Failed to update comment" });
    }
}

export async function deleteComment(req: AuthRequest, res: Response) {
    const commentId = req.params.id;
    const userId = req.userID;

    const comment = await prisma.comment.findUnique({ where: { id: commentId } });

    if (comment?.userId !== userId) {
        return res.status(403).json({ error: "Not authorized" });
    }

    try {
        await prisma.comment.delete({
            where: { id: commentId },
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: "Failed to delete comment" });
    }
}

