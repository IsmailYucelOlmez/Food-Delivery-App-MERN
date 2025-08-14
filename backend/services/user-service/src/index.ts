import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import userRoute from './routes/userRoute'
import Database from "./db";
import { initializeKafka, disconnectKafka } from './config/kafka';

dotenv.config();

const db = Database.getInstance();

const PORT = process.env.PORT || 3001;

const app=express();

app.use(cors())
app.use(express.json())

app.use("/api/my/user",userRoute)

const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING || 'mongodb://mongodb:27017/fooddelivery';

db.connect(mongoConnectionString);

// Initialize Kafka
initializeKafka();

app.listen(PORT,()=>{
    console.log(`User Service started on port ${PORT}`)
})

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down gracefully');
    await disconnectKafka();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('SIGINT received, shutting down gracefully');
    await disconnectKafka();
    process.exit(0);
});
