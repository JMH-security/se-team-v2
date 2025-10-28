import mongoose, { Schema, model } from "mongoose";

export interface ITaxesInsuranceDocument {
	taxesInsuranceId: string;
	taxesInsuranceName: string;
}

const TaxesInsuranceSchema = new Schema<ITaxesInsuranceDocument>(
	{
		taxesInsuranceId: { type: String, required: true },
		taxesInsuranceName: { type: String, required: true },
	},
	{
		timestamps: true,
	}
);

const TaxesInsurance =
	mongoose.models.TaxesInsurance ||
	model<ITaxesInsuranceDocument>("TaxesInsurance", TaxesInsuranceSchema);
export default TaxesInsurance;
