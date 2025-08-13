import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { User } from "../entities/User";
import { Goals } from "../entities/Goals";

const userRepo = AppDataSource.getRepository(User);
const goalsRepo = AppDataSource.getRepository(Goals);

export async function setGoals(req: Request, res: Response) {
    try {
        const userId = (req as any).user.userId;
        const currentUser = await userRepo.findOneBy({ userId: userId });
        const { steps, running, sleeping, weight, water } = req.body;

        const createGoals = new Goals();
        createGoals.steps = steps;
        createGoals.running = running;
        createGoals.sleeping = sleeping;
        createGoals.weight = weight;
        createGoals.water = water;
        if (!currentUser) {
            return res.status(404).json({ error: "User not found" });
        }
        createGoals.user = currentUser;

        const creation = await goalsRepo.save(createGoals);
        if (!creation) {
            return res.status(500).json({ error: "There is an error in creating the goals" });
        }

        return res.status(201).json({ success: "The goals is successfully created." });
    }
    catch (err) {
        return res.status(500).json(err);
    }
}


export async function editGoals(req: Request, res: Response) {
    try {
        const { steps, running, sleeping, weight, water } = req.body;
        const userId = (req as any).user.userId;

        const getUserGoals = await goalsRepo.findOne({
            where: { user: { userId: userId } },
            relations: ["user"],
        });

        if (!getUserGoals) {
            return res.status(404).json({ error: "Goals not found" });
        }

        await goalsRepo.update(getUserGoals.id, {
            steps: steps,
            running: running,
            sleeping: sleeping,
            weight: weight,
            water: water
        });

        res.status(200).json({ success: "The goals are successfully updated." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "There was an error updating the goals."+error });
    }
}

export async function getGoalsyId(req: Request, res: Response) {
    try {
        const userId = (req as any).user.userId;

        const getUserGoals = await goalsRepo.findOne({
            where: { user: { userId: userId } },
            relations: ["user"],
        });

        if (!getUserGoals) {
            return res.status(500).json({ error: "there is an error in finding the user's goals"});
        }

        return res.status(200).json(getUserGoals);
    }
    catch (err) {
        return res.status(500).json({ error: "There was an error updating the goals." });
    }
}