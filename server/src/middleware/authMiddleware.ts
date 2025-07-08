import { Request, Response, NextFunction } from "express";
import { verifyTokenJWT } from "../utils/verifyTokenJWT";

export interface AuthRequest extends Request {
    userID?: number; 
}

export function verifyToken(req: AuthRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Access denied, token missing" });
        return;
    }

    const decoded = verifyTokenJWT(token);
    if (!decoded) {
        res.status(401).json({ message: "Invalid token" });
        return;
    }

    req.userID = decoded.userID; 
    next();
}