// testMongo.js
import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

const uri = process.env.MONGO_URI;
console.log('Using URI:', uri);

mongoose.connect(uri)
  .then(() => { console.log('Connected OK'); process.exit(0); })
  .catch(err => {
    console.error('Connection error (full):', err);
    process.exit(1);
  });
