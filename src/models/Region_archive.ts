import mongoose, { Schema, model } from "mongoose";

export interface RegionDocument {
  _id: string;
  id: number;
  name: string;
  contact: string;
  createdAt: Date;
  updatedAt: Date;
}

const RegionSchema = new Schema<RegionDocument>(
  {
    id: {
      type: Number,
      unique: true,
      required: [true, "Region ID is required"]
    },
    name: {
      type: String,
      required: [true, "Region Name is required"]
    },
    contact: {
      type: String,
      required: [true, "Region Primary Contact is required"]
    },
  },
  {
    timestamps: true,
  }
);
const Region = mongoose.models?.Region || model<RegionDocument>("Region", RegionSchema);
export default Region;
