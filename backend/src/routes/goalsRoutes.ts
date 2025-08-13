import { Router } from "express";
import * as goalsController from "../controllers/goalsController"
import { authenticateToken } from "../middleware/middleware";

const goalsRouter = Router();

goalsRouter.post("/",authenticateToken,goalsController.setGoals);
goalsRouter.put("/",authenticateToken,goalsController.editGoals);
goalsRouter.get("/",authenticateToken,goalsController.getGoalsyId);

export default goalsRouter;