import mongoose, { Schema, model } from "mongoose";

export interface SalesTaxStateIdDocument {
	salesTaxStateId: string;
	salesTaxStateName: string;
}

const SalesTaxStateSchema = new Schema<SalesTaxStateIdDocument>(
	{
		salesTaxStateId: {
			type: String,
			required: true,
			unique: [true, "Sales Tax State ID Number in Use"],
		},
		salesTaxStateName: {
			type: String,
			required: [true, "Sales Tax State Name is required"],
		},
	},
	{
		timestamps: true,
	}
);
const SalesTaxState =
	mongoose.models?.SalesTaxState ||
	model<SalesTaxStateIdDocument>("SalesTaxState", SalesTaxStateSchema);
export default SalesTaxState;
