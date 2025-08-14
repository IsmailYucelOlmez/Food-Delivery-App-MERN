import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import driverRoute from "./routes/driverRoute";
import Database from "./db";
import { initializeKafka, disconnectKafka } from './config/kafka';
import { startKafkaConsumers } from './services/kafkaConsumer';

dotenv.config();

const db = Database.getInstance();

const PORT = process.env.PORT || 3004;

const app=express();

app.use(cors())
app.use(express.json())

app.use("/api/driver", driverRoute)


const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING || 'mongodb://mongodb:27017/fooddelivery';


db.connect(mongoConnectionString);

// Initialize Kafka
initializeKafka();
startKafkaConsumers();

app.listen(PORT,()=>{
    console.log(`Driver Service started on port ${PORT}`)
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
