import express from "express";
import bodyParser from "body-parser";
import userRouter from "./src/routes/userRoutes";
import profileRouter from "./src/routes/profileRoutes";
import goalsRouter from "./src/routes/goalsRoutes";
import cors from "cors";

const app = express();
app.use(cors({
   origin:"http://localhost:5173"
}
))

app.use(bodyParser.json());
app.use("/user",userRouter);
app.use("/user/profile",profileRouter);
app.use('/user/goals',goalsRouter);

app.listen(3000);