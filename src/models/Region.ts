import mongoose from "mongoose";

export interface IRegionDocument {
	name: string;
}

const RegionSchema = new Schema<IRegionDocument>(
	{
		regionId: { type: String, required: true, unique: true },
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
