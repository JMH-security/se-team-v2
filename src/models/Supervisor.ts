import mongoose from "mongoose";

const SupervisorSchema = new mongoose.Schema({
	supervisorId: { type: String, required: true, unique: true },
	supervisorName: { type: String, required: true },
	supervisorEmail: { type: String, required: true },
	supervisorCell: { type: String },
});

export default mongoose.models.Supervisor ||
	mongoose.model("Supervisor", SupervisorSchema);
