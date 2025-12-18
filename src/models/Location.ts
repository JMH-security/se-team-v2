import mongoose, { Schema, model } from "mongoose";

export interface ILocationDocument {
	locationId: string;
	locationDescription: string;
}

const LocationSchema = new Schema<ILocationDocument>(
	{
		locationId: { type: String, required: true },
		locationDescription: { type: String },
	},
	{
		timestamps: true,
	}
);

const Location =
	mongoose.models.Location ||
	model<ILocationDocument>("Location", LocationSchema);
export default Location;
