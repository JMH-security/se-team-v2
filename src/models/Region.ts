import mongoose from "mongoose";

const RegionSchema = new mongoose.Schema({
	regionId: { type: String, required: true, unique: true },
	regionName: { type: String, required: true },
	regionDescription: { type: String },
});

export default mongoose.models.Region || mongoose.model("Region", RegionSchema);
