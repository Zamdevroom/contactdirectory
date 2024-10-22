import express from "express";
import cors from "cors";
import { signUp, signIn, getUser } from "../controllers/User.js";
import User from "../models/User.js";




const app = express.Router();



app.post("/signup",signUp);
app.post("/signin",signIn);
app.get("/current",getUser);



export default app;
