import { Request, Response } from "express";
import prisma from "../config/prismaClient";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";


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

    const token = jwt.sign({ userID: newUser.id }, JWT_SECRET, { expiresIn: "7d" });

    res.status(201).json({
      message: "User registered successfully",
      token,
      userId: newUser.id,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to register user" });
  }
}

export async function loginUser(req: Request, res: Response) {
  const { identifier, password } = req.body; 

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { name: identifier }
        ]
      }
    });

    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign({ userID: user.id }, JWT_SECRET, { expiresIn: "7d" });

    res.json({ message: "Login successful", token, userId: user.id });
  } catch (error) {
    res.status(500).json({ error: "Failed to login" });
  }
}
