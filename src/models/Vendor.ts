import mongoose, { Schema, Document, Model } from "mongoose";

export interface IVendorContact {
	DisplayName?: string;
	FirstName?: string;
	LastName?: string;
	Email?: string;
	BusinessPhone?: number;
	RoleId?: number;
	TypeId?: number;
}

export interface IVendorAddress {
	Address1?: string;
	Address2?: string;
	City?: string;
	State?: string;
	Zip?: string;
}

export interface IVendorCustomField {
	fieldNumber?: number;
	value?: string;
}

export interface IVendor extends Document {
	VendorNumber?: number;
	VendorName: string;
	VendorTypeId?: number;
	VendorStatus: boolean;
	Address?: IVendorAddress;
	Phone?: string;
	Fax?: string;
	ParentVendorNumber?: number;
	AccountNumber?: string;
	TaxID?: string;
	ContactsInformation?: IVendorContact[];
	CustomFields?: IVendorCustomField[];
	wtSynced?: boolean;
	wtSyncedAt?: Date;
	createdAt?: Date;
	updatedAt?: Date;
}

const VendorContactSchema = new Schema<IVendorContact>(
	{
		DisplayName: { type: String },
		FirstName: { type: String },
		LastName: { type: String },
		Email: { type: String },
		BusinessPhone: { type: Number },
		RoleId: { type: Number },
		TypeId: { type: Number },
	},
	{ _id: false }
);

const VendorAddressSchema = new Schema<IVendorAddress>(
	{
		Address1: { type: String },
		Address2: { type: String },
		City: { type: String },
		State: { type: String },
		Zip: { type: String },
	},
	{ _id: false }
);

const VendorCustomFieldSchema = new Schema<IVendorCustomField>(
	{
		fieldNumber: { type: Number },
		value: { type: String },
	},
	{ _id: false }
);

const VendorSchema = new Schema<IVendor>(
	{
		VendorNumber: { type: Number },
		VendorName: { type: String, required: true },
		VendorTypeId: { type: Number },
		VendorStatus: { type: Boolean, default: true },
		Address: { type: VendorAddressSchema },
		Phone: { type: String },
		Fax: { type: String },
		ParentVendorNumber: { type: Number },
		AccountNumber: { type: String },
		TaxID: { type: String },
		ContactsInformation: { type: [VendorContactSchema], default: [] },
		CustomFields: { type: [VendorCustomFieldSchema], default: [] },
		wtSynced: { type: Boolean, default: false },
		wtSyncedAt: { type: Date },
	},
	{
		timestamps: true,
	}
);

const Vendor: Model<IVendor> =
	mongoose.models.Vendor || mongoose.model<IVendor>("Vendor", VendorSchema);

export default Vendor;
