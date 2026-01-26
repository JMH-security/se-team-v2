import mongoose, { Schema, model } from "mongoose";

export interface UserDocument {
	_id: string;
	id: string;
	email: string;
	password: string;
	name: string;
	phone: string;
	image: string;
	role: string;
	profile: string;
	lastLogin: Date;
	createdAt: Date;
	updatedAt: Date;
}

const UserSchema = new Schema<UserDocument>(
	{
		email: {
			type: String,
			unique: true,
			required: [true, "Email is required"],
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				"Email is invalid",
			],
		},
		password: {
			type: String,
			required: false, // Changed to false to accommodate OAuth users
		},
		name: {
			type: String,
			required: [true, "Name is required"],
		},
		image: {
			type: String,
			required: false,
		},
		profile: {
			type: String,
			required: false,
		},
		lastLogin: {
			type: Date,
			required: false,
		},
		role: {
			type: String,
			default: "user",
			required: true,
		},
	},
	{
		timestamps: true,
	}
);
const User = mongoose.models?.User || model<UserDocument>("User", UserSchema);
export default User;
