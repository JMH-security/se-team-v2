import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  jobNumber: { type: String, required: true },
  jobDescription: { type: String, required: true },
  customerId: { type: String, required: true }
  
});

export const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);



// customer2: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: false },