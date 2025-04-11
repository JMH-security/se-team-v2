import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  customerName: { type: String, required: true },
});

export const Customer = mongoose.models.Customer || mongoose.model('Customer', customerSchema);
