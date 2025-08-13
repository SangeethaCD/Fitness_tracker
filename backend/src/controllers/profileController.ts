import { Request, Response } from "express";
import { AppDataSource } from "../config/db";
import { User } from "../entities/User";
import { Profile } from "../entities/Profile";

const userRepo = AppDataSource.getRepository(User);
const profileRepo = AppDataSource.getRepository(Profile);

export async function setProfile(req: Request, res: Response) {
    try {
        const userId = (req as any).user.userId;
        const currentUser = await userRepo.findOneBy({ userId: userId });
        const { fullName, userLocation, dateOfBirth, userHeight, userWeight } = req.body;

        const createProfile = new Profile();
        createProfile.name = fullName;
        createProfile.location = userLocation;
        createProfile.birthDate = dateOfBirth;
        createProfile.height = userHeight;
        createProfile.weight = userWeight;
        if (!currentUser) {
            return res.status(404).json({ error: "User not found" });
        }
        createProfile.user = currentUser;

        const creation = await profileRepo.save(createProfile);
        if (!creation) {
            return res.status(500).json({ error: "There is an error in creating the profile." });
        }

        return res.status(201).json({ success: "The profile is successfully created." });
    }
    catch (err) {
        return res.status(500).json(err);
    }
}


export async function editProfile(req: Request, res: Response) {
  try {
    const { fullName, userLocation, dateOfBirth, userHeight, userWeight } = req.body;
     const userId = (req as any).user.userId;

    const getProfile = await profileRepo.findOne({
            where: { user: { userId: userId } },
            relations: ["user"], 
     });

    if (!getProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    await profileRepo.update(getProfile.id, {
      name: fullName,
      location: userLocation,
      birthDate: new Date(dateOfBirth),
      height: userHeight,
      weight: userWeight,
    });

    res.status(200).json({ success: "The profile is successfully updated." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There was an error updating the profile." });
  }
}

export async function getProfilebyId(req: Request, res: Response) {
    try {
        const userId = (req as any).user.userId;

        const getUserProfile = await profileRepo.findOne({
            where: { user: { userId: userId } },
            relations: ["user"], 
        });

        if (!getUserProfile) {
            return res.status(404).json({ error: "there is an error in finding the user's profile" });
        }

        return res.status(200).json(getUserProfile);
    }
    catch(err)
    {
         return res.status(500).json({error:"There was an error updating the profile."});
    }
}