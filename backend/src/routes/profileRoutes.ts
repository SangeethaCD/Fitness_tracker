import { Router } from "express";
import * as profileControllers from "../controllers/profileController";
import { authenticateToken } from "../middleware/middleware";

const profileRouter =Router();

profileRouter.post('/',authenticateToken,profileControllers.setProfile);
profileRouter.put('/',authenticateToken,profileControllers.editProfile);
profileRouter.get('/',authenticateToken,profileControllers.getProfilebyId);

export default profileRouter;