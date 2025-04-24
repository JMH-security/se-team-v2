import mongoose, { Schema, model } from "mongoose";

export interface CounterDocument {
  _id: string;
  index: number;
  prefix: string;
  createdAt: Date;
  updatedAt: Date;
}

const CounterSchema = new Schema<CounterDocument>(
  {
    index: {
      type: Number,
      unique: true,
      required: [true, "Counter ID is required"]
    },
    prefix: {
      type: String,
      required: [true, "Job Prefix is required"]
    },
  },
  {
    timestamps: true,
  }
);
const Counter = mongoose.models?.Counter || model<CounterDocument>("Counter", CounterSchema);
export default Counter;
