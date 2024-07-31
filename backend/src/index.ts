
import express , { Express ,Request , Response } from "express";
import cors from 'cors';
import { PORT } from "./config";
import { clientRouter } from "./routes/client";

const app:Express=express();
app.use(cors())
app.use(express.json());

app.use('/api/v1/client',clientRouter)


app.listen(PORT)
