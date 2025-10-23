import mongoose, { Schema, model } from "mongoose";

export interface IRegionDocument {
	regionId: string;
	regionName: string;
	regionDescription: string;
}

const RegionSchema = new Schema<IRegionDocument>(
	{
		regionId: { type: String, required: true },
		regionName: { type: String, required: true },
		regionDescription: { type: String },
	},
	{
		timestamps: true,
	}
);

const Region =
	mongoose.models.Region || model<IRegionDocument>("Region", RegionSchema);
export default Region;
