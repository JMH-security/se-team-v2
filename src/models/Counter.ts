import mongoose, { Schema, Document } from "mongoose";

export interface ICounter extends Document {
	_id: string;
	index: number;
	prefix: string;
	createdAt: Date;
	updatedAt: Date;
}

const CounterSchema = new Schema<ICounter>(
	{
		_id: {
			type: String,
			required: [true, "Counter Name is required"],
		},
		index: {
			type: Number,
			unique: true,
			required: [true, "Counter Index required"],
		},
		prefix: {
			type: String,
			default: "JNA-",
			required: [true, "Job Prefix is required"],
		},
	},
	{
		timestamps: true,
	}
);
export const Counter =
	(mongoose.models?.Counter as mongoose.Model<ICounter>) ||
	mongoose.model<ICounter>("Counter", CounterSchema);
