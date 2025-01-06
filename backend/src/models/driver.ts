import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
        
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },  

    location: {type: String, required: true, },
 
    licence_type: { type: [String], required: true },

    experience_years: { type: Number, required: true }, 

    languages: { type: [String],  required: true, },
    
    have_vehicle_type: { type: [String], required: false, }, 

    additional_info: { type: String,  required: false, },

    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
});

const Driver = mongoose.model("Driver", driverSchema);

export default Driver;