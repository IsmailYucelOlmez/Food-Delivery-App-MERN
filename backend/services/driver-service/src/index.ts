import express from "express"
import cors from "cors"
import driverRoute from "./routes/driverRoute";
import Database from "./db";

const db = Database.getInstance();

const PORT = process.env.PORT || 3004;

const app=express();

app.use(cors())
app.use(express.json())

app.use("/api/driver", driverRoute)


const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING || 'mongodb://mongodb:27017/fooddelivery';


db.connect(mongoConnectionString);

app.listen(PORT,()=>{
    console.log(`Driver Service started on port ${PORT}`)
})
