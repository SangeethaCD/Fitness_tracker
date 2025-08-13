import { Router } from "express";
import * as userControllers from "../controllers/userController"

const userRouter = Router();


userRouter.post('/register',userControllers.createUser);
userRouter.get('/',userControllers.getAllUsers);
userRouter.get('/:id',userControllers.getUserById)
userRouter.post('/login',userControllers.validataUser);

export default userRouter;

