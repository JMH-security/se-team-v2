import mongoose, { Schema, model } from "mongoose";

export interface SalestaxstateidDocument {
  _id: string;
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

const SalestaxstateidSchema = new Schema<SalestaxstateidDocument>(
  {
    id: {
      type: Number,
      unique: true,
      required: [true, "Sales Tax State ID is required"]
    },
    name: {
      type: String,
      required: [true, "Sales Tax State Name is required"]
    },
  },
  {
    timestamps: true,
  }
);
const Salestaxstateid = mongoose.models?.Salestaxstateid || model<SalestaxstateidDocument>("Salestaxstateid", SalestaxstateidSchema);
export default Salestaxstateid;
