import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPTORequest extends Document {
	userId: string;
	userEmail: string;
	userName: string;
	startDate: Date;
	endDate: Date;
	totalHours: number;
	reason?: string;
	status: "pending" | "approved" | "denied";
	reviewedBy?: string;
	reviewedByName?: string;
	reviewedAt?: Date;
	reviewNotes?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IPTORequestLog extends Document {
	ptoRequestId: mongoose.Types.ObjectId;
	action: "created" | "approved" | "denied" | "updated";
	performedBy: string;
	performedByName: string;
	performedByEmail: string;
	details?: string;
	createdAt?: Date;
}

const PTORequestSchema = new Schema<IPTORequest>(
	{
		userId: { type: String, required: true },
		userEmail: { type: String, required: true },
		userName: { type: String, required: true },
		startDate: { type: Date, required: true },
		endDate: { type: Date, required: true },
		totalHours: { type: Number, required: true },
		reason: { type: String },
		status: {
			type: String,
			enum: ["pending", "approved", "denied"],
			default: "pending",
		},
		reviewedBy: { type: String },
		reviewedByName: { type: String },
		reviewedAt: { type: Date },
		reviewNotes: { type: String },
	},
	{
		timestamps: true,
	}
);

const PTORequestLogSchema = new Schema<IPTORequestLog>(
	{
		ptoRequestId: {
			type: Schema.Types.ObjectId,
			ref: "PTORequest",
			required: true,
		},
		action: {
			type: String,
			enum: ["created", "approved", "denied", "updated"],
			required: true,
		},
		performedBy: { type: String, required: true },
		performedByName: { type: String, required: true },
		performedByEmail: { type: String, required: true },
		details: { type: String },
	},
	{
		timestamps: true,
	}
);

// Add index for efficient queries
PTORequestSchema.index({ userId: 1, status: 1 });
PTORequestSchema.index({ status: 1, createdAt: -1 });
PTORequestLogSchema.index({ ptoRequestId: 1, createdAt: -1 });

const PTORequest: Model<IPTORequest> =
	mongoose.models.PTORequest ||
	mongoose.model<IPTORequest>("PTORequest", PTORequestSchema);

const PTORequestLog: Model<IPTORequestLog> =
	mongoose.models.PTORequestLog ||
	mongoose.model<IPTORequestLog>("PTORequestLog", PTORequestLogSchema);

export { PTORequest, PTORequestLog };
export default PTORequest;
