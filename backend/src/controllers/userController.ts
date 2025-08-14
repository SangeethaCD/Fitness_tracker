import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { User } from "../entities/User";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Profile } from "../entities/Profile";
import { Goals } from "../entities/Goals";
dotenv.config();


const userRepo = AppDataSource.getRepository(User);
const profileRepo = AppDataSource.getRepository(Profile);
const goalsRepo =AppDataSource.getRepository(Goals);

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

        if (!userName || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }

        const currentUser = await userRepo.findOne({
            where: { userName },
            relations: ['profile', 'goals'],
        });

        if (!currentUser) {
            return res.status(404).json({ message: "The user does not exist." });
        }

        const isPasswordValid = await bcrypt.compare(password, currentUser.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        
        if (!currentUser.profile) {
            const emptyProfile = profileRepo.create({
                name: "",
                location: "",
                weight: 0,
                height: 0,
                user: currentUser
            });
            await profileRepo.save(emptyProfile);
        }

    
        if (!currentUser.goals) {
            const emptyGoals = goalsRepo.create({
                running: 0,
                steps: 0,
                sleeping: 0,
                weight: 0,
                water: 0,
                user: currentUser
            });
            await goalsRepo.save(emptyGoals);
        }

        const token = jwt.sign(
            { userId: currentUser.userId, email: currentUser.email },
            String(process.env.JWT_SECRET),
            { expiresIn: '1h' }
        );

        return res.status(200).json({ token });

    } catch (err) {
        console.error("Login error:", err);
        return res.status(500).json({ message: "Internal server error" });
    }
}
