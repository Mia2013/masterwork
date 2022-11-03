import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  message: {
    type: String,
  },
  subject: {
    type: String,
  },
  userId: {
    type: String,
  },
  sendDate: {
    type: Date,
  },
});

export default mongoose.model('contact', contactSchema);
