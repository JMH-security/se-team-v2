
import { connectDB } from '@/lib/db';
import mongoose, { Schema } from 'mongoose';


// Define Counter Schema
const counterSchema = new Schema({
  _id: String,
  prefix: String,
  sequence: Number,
});

const Counter = mongoose.models.Counter || mongoose.model('Counter', counterSchema);



export async function getNextJobNumber(): Promise<number> {
 
  await connectDB(); // Ensure the database connection is established
  // Set the minimum job number to 1000
  // ****** TO DO: NEED TO HANDLE UPDATE PREFIX AFTER 9999 **********
  try {
    const minJob = 1000
    const checkCounter = await Counter.findOne({ _id: 'jobCounter' });
    const checkCount = checkCounter?.sequence || 0; // Use optional chaining to avoid errors if checkCounter is null
    if (checkCount < minJob) {
      // If the counter document does not exist, create it with a sequence starting from minJob
      const newCounter = await Counter.findOneAndUpdate({
        _id: 'jobCounter',
        sequence: minJob,
      });
      
    }   
    
    // INCREMENT THE JOB NUMBER BY ONE
    const counter = await Counter.findOneAndUpdate(
      { _id: 'jobCounter' },
      { $inc: { sequence: 1 } },
      { 
        upsert: true,
        new: true
      }
    );

    return counter.sequence || 1;
  } catch (error) {
    console.error('Error getting next job number:', error);
    throw error;
  }
}

// ***********Call getNextJobNumber *******************
export async function addCounterIndex(): Promise<typeof Counter> {
  
  await connectDB(); 
  try {
    const jobNumberIndex = await getNextJobNumber(); 
    return {jobIndex: jobNumberIndex};
  } catch (error) {
    console.error('Error Getting Job Index', error);
    throw error;
  }
}