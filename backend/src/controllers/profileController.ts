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
        const { name, location, birthDate, height, weight} = req.body;

        const createProfile = new Profile();
        createProfile.name = name;
        createProfile.location = location;
        createProfile.birthDate = birthDate;
        createProfile.height = height;
        createProfile.weight = weight;
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
    const { Name, location, birthDate, height, weight } = req.body;
     const userId = (req as any).user.userId;

    const getProfile = await profileRepo.findOne({
            where: { user: { userId: userId } },
            relations: ["user"], 
     });

    if (!getProfile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    await profileRepo.update(getProfile.id, {
      name: Name,
      location: location,
      birthDate: new Date(birthDate),
      height: height,
      weight: weight,
    });

    res.status(200).json({ success: "The profile is successfully updated." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "There was an error updating the profile." });
  }
}

export async function getProfilebyId(req: Request, res: Response) {
  try {
    const Id = parseInt(req.params.id);

    const newUser = await userRepo.findOneBy({ userId: Id });

    if (!newUser) {
      return res.status(404).json({ error: "User not found" });
    }

    const getUserProfile = await profileRepo.findOne({
      where: { user: newUser }
    });

    if (!getUserProfile) {
      return res.status(404).json({ error: "Profile not found for this user" });
    }

    return res.status(200).json(getUserProfile);
  } catch (err) {
    console.error("Error fetching profile:", err);
    return res.status(500).json({ error: "Internal server error", details: err });
  }
}
