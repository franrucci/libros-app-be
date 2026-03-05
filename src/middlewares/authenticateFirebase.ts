import { Request, Response, NextFunction } from "express";
import admin from "../firebase";

// Este middleware chequea que venga un token de usuario y que sea valido
export const authenticateFirebase = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No se proporcionó token" });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        (req as any).firebaseUser = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Token invalido o expirado" });
    }
};