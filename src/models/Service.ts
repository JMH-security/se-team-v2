import mongoose, { Schema, model } from "mongoose";

export interface ServiceDocument {
  _id: string;
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<ServiceDocument>(
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
const Service = mongoose.models?.Service || model<ServiceDocument>("Service", ServiceSchema);
export default Service;
