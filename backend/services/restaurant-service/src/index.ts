import express from "express"
import cors from "cors"
import dotenv from "dotenv";
import restaurantRoute from "./routes/restaurantRoute";
import { v2 as cloudinary } from "cloudinary";
import searchRestaurantRoute from './routes/searchRestaurantRoute'
import Database from "./db";
import { initializeKafka, disconnectKafka } from './config/kafka';
import { startKafkaConsumers } from './services/kafkaConsumer';
import { initializeElasticsearchIndex, testElasticsearchConnection } from './config/elasticsearch';

dotenv.config();

const db = Database.getInstance();

const PORT = process.env.PORT || 3002;

const app=express();

app.use(cors())
app.use(express.json())

app.use("/api/my/restaurant", restaurantRoute);
app.use("/api/restaurant", searchRestaurantRoute)

const mongoConnectionString = process.env.MONGODB_CONNECTION_STRING || 'mongodb://mongodb:27017/fooddelivery';

db.connect(mongoConnectionString);

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

// Initialize Kafka
initializeKafka();
startKafkaConsumers();

// Initialize Elasticsearch
const initializeServices = async () => {
    try {
        // Test Elasticsearch connection
        const esConnected = await testElasticsearchConnection();
        if (esConnected) {
            // Initialize Elasticsearch index
            await initializeElasticsearchIndex();
        } else {
            console.warn('Elasticsearch connection failed. Search functionality will fallback to MongoDB.');
        }
    } catch (error) {
        console.error('Failed to initialize Elasticsearch:', error);
        console.warn('Search functionality will fallback to MongoDB.');
    }
};

initializeServices();

app.listen(PORT,()=>{
    console.log(`Restaurant Service started on port ${PORT}`)
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
