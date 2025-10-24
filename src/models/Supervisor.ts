import mongoose, { Schema, model } from "mongoose";

export interface ISupervisorDocument {
	supervisorId: string;
	supervisorDescription: string;
	supervisorGroup1: string;
	supervisorGroup2: string;
	supervisorGroup3: string;
	supervisorName: string;
	supervisorEmail: string;
	supervisorCell: string;
}

const SupervisorSchema = new Schema<ISupervisorDocument>(
	{
		supervisorId: { type: String, required: true },
		supervisorDescription: { type: String },
		supervisorGroup1: { type: String },
		supervisorGroup2: { type: String },
		supervisorGroup3: { type: String },
		supervisorName: { type: String, required: true },
		supervisorEmail: { type: String, required: true },
		supervisorCell: { type: String },
	},
	{
		timestamps: true,
	}
);

const Supervisor =
	mongoose.models.Supervisor ||
	model<ISupervisorDocument>("Supervisor", SupervisorSchema);
export default Supervisor;
