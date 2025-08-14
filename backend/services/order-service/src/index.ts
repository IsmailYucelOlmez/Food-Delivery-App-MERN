import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import orderRoute from './routes/orderRoute'
import Database from "./db";
import { initializeKafka, disconnectKafka } from './config/kafka';
import { startKafkaConsumers } from './services/kafkaConsumer';

dotenv.config();

const db = Database.getInstance();

const PORT = process.env.PORT || 3003;

const app=express();

app.use(cors())

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json())

app.use("/api/order", orderRoute)

const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING || 'mongodb://mongodb:27017/fooddelivery';

db.connect(mongoConnectionString);

// Initialize Kafka
initializeKafka();
startKafkaConsumers();

app.listen(PORT,()=>{
    console.log(`Order Service started on port ${PORT}`)
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
