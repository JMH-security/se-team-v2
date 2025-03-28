import mongoose, { Schema, model } from "mongoose";

export interface SupervisorDocument {
  _id: string;
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const SupervisorSchema = new Schema<SupervisorDocument>(
  {
    id: {
      type: Number,
      unique: true,
      required: [true, "Supervisor ID is required"]
    },
    name: {
      type: String,
      required: [true, "Supervisor Name is required"]
    },
  },
  {
    timestamps: true,
  }
);
const Supervisor = mongoose.models?.Supervisor || model<SupervisorDocument>("Supervisor", SupervisorSchema);
export default Supervisor;
