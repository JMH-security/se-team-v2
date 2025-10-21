import mongoose, { Schema, model } from "mongoose";

export interface ISupervisorDocument {
	supervisorId: string;
	supervisorName: string;
	supervisorEmail: string;
	supervisorCell: string;
}

const SupervisorSchema = new Schema<ISupervisorDocument>(
	{
		supervisorId: { type: String, required: true },
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
