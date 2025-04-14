import mongoose, { Schema, model } from "mongoose";
import { Job } from "@/models/Job";

interface Address {
  Address1: string;
  Address2: string;
  City: string;
  State: string;
  Zip: string;
}

interface Contacts {
  Id: number;
  RoleId: number;
  ContactId: number;
  PrimaryContact: boolean;
  EmailAddress: string;
  Business: string;
  ContactChanged: boolean;
}

interface CustomFields {
  FieldNumber: number;
  Value: string;
}

export interface CustomerDocument {
  _id: string;
  CustomerId: string;
  CustomerName: string;
  Address: Address;
  Phone: string;
  CustomerTypeId: number; 
  SalesmanId: number;
  Fax: string;
  CustomFields: CustomFields[]
  Active: boolean;
  ParentCustomerNumber: string;
  Attention: string;
  DeliveryOption: number;
  Terms: number;
  Notes: string;
  Contacts: Contacts[]
  createdAt: Date;
  updatedAt: Date;
}


const customerSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  customerNumber: { type: String, required: true },
  customerName: { type: String, required: true },
  jobs: [{ type: mongoose.Schema.Types.ObjectId, ref: Job }],
});

export const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);
