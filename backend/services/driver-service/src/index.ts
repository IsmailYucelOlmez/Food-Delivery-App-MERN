import express from "express"
import cors from "cors"
import "dotenv/config";
import mongoose from "mongoose";
import driverRoute from "./routes/driverRoute";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>{
    console.log("Driver Service connected to MongoDB")
})

const app=express();

app.use(cors())
app.use(express.json())

app.use("/api/driver", driverRoute)

const PORT = process.env.PORT || 3004;

app.listen(PORT,()=>{
    console.log(`Driver Service started on port ${PORT}`)
})
