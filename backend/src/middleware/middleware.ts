import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
dotenv.config();


interface JwtPayload {
    userId: number;
    email: string;
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
    const token = authHeader?.startsWith('Bearer ')
  ? authHeader.split(' ')[1]
  : authHeader;


    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
        if (err) return res.status(403).json({ message: 'Invalid token.' });
        (req as any).user = decoded as JwtPayload;
        next();
    });
}
