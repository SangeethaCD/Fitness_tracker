import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { User } from "../entities/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();


const userRepo = AppDataSource.getRepository(User);

export async function createUser(req: Request, res: Response) {
    try {
        const { userName, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        if (!userName || !email || !password) {
            return res.status(400).json({ error: "All fields are mandatory required" });
        }

        const existingUser = await userRepo.findOneBy({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists ." });
        }

        const newUser = new User();
        newUser.userName = userName;
        newUser.email = email;
        newUser.password = hashedPassword;

        await userRepo.save(newUser);

        return res.status(201).json(newUser);
    } catch (err) {
        console.error("There is an error creating user:", err);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export async function getUserById(req: Request, res: Response) {
    try {
        const Id = parseInt(req.params.id);
        const currentUser = await userRepo.findOneBy({ userId: Id });
        if (!currentUser) {
            return res.status(500).json({ error: "The user does not exist" });
        }

        return res.status(200).json(currentUser);
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
}


export async function getAllUsers(req: Request, res: Response) {
    try {
        const allUser = await userRepo.find();
        if (allUser.length === 0) {
            return res.status(500).json({ error: "There is no users " });
        }

        return res.status(200).json(allUser);
    }
    catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
}


export async function validataUser(req: Request, res: Response) {
    try {
        const { userName, password } = req.body;
        const currentUser = await userRepo.findOne({
            where:
                { userName: userName }
        });

        if (!currentUser) {
            return res.status(500).json({ error: "The user does not exists." });
        }
        const hashedPassword = currentUser.password;
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        if (!isPasswordValid) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { userId: currentUser.userId, email: currentUser.email },
            String(process.env.JWT_SECRET),
            { expiresIn: '1h' }
        );

        res.json({ token });
    }
    catch (err) {
        return res.status(500).json(err);
    }
}