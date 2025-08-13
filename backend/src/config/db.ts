import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/User";
import { Profile } from "../entities/Profile";
import dotenv from 'dotenv';
import { Goals } from "../entities/Goals";
dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username:process.env.DB_NAME,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_DATABASE,
  synchronize: true,
  logging: false,
  entities: [User,Profile,Goals],
  migrations: [],
  subscribers: [],
});

AppDataSource.initialize()
.then(()=>{
    console.log("the database is connected successfully");
})
.catch((error)=>{
    console.log("there is an error in connectin to the db!",error);
})


