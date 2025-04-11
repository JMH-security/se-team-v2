import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  jobNumber: { type: String, required: true },
  jobName: { type: String, required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: false },
});

export const Job = mongoose.models.Job || mongoose.model('Job', jobSchema);