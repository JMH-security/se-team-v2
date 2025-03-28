import mongoose, { Schema, model } from "mongoose";

export interface BranchDocument {
  _id: string;
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const BranchSchema = new Schema<BranchDocument>(
  {
    id: {
      type: Number,
      unique: true,
      required: [true, "Branch ID is required"]
    },
    name: {
      type: String,
      required: [true, "Branch Name is required"]
    },
  },
  {
    timestamps: true,
  }
);
const Branch = mongoose.models?.Branch || model<BranchDocument>("Branch", BranchSchema);
export default Branch;
