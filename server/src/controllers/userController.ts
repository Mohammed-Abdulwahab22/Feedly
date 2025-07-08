import { Request, Response } from "express";
import prisma from "../config/prismaClient";
import bcrypt from "bcrypt";


export async function getAllUsers(req: Request, res: Response) {
    try {
        const users = await prisma.user.findMany({
            include: {
                posts: true,
                comments: true,
            },

        });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
}

export async function registerUser(req: Request, res: Response) {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: {
                name: username,
                email,
                password: hashedPassword,
            },
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: "Failed to register user" });
    }
}

export async function loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        // ✅ Here you can generate a JWT token if needed
        res.json({ message: "Login successful", userId: user.id });
    } catch (error) {
        res.status(500).json({ error: "Failed to login" });
    }
}
