import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import {recipeRouter}from "./Routes/recipeRoutes.js";
import {userRouter}from "./Routes/userRoutes.js";

dotenv.config();

const app = express();
const corsOptions = {
    origin: process.env.FRONTEND_URL,
  };
  

//middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use('/recipe',recipeRouter)
app.use('/user',userRouter)

const PORT = process.env.PORT || 5000;
const mongoDBUrl = process.env.MONGO_URL;

console.log("MongoDB URL:", process.env.MONGO_URL);

app.listen(PORT,()=>{
    console.log(`listening on ${PORT}`)
});

mongoose.connect(mongoDBUrl).then(()=>{
    console.log("connected to database")
}).catch((error)=>{
    console.log(error)
});