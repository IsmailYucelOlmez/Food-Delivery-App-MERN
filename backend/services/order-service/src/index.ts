import express from "express"
import cors from "cors"
import "dotenv/config";
import mongoose from "mongoose";
import orderRoute from './routes/orderRoute'

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(()=>{
    console.log("Order Service connected to MongoDB")
})

const app=express();

app.use(cors())

app.use("/api/order/checkout/webhook", express.raw({ type: "*/*" }));

app.use(express.json())

app.use("/api/order", orderRoute)

const PORT = process.env.PORT || 3003;

app.listen(PORT,()=>{
    console.log(`Order Service started on port ${PORT}`)
})
