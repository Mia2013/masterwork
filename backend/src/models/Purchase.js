import mongoose from 'mongoose';

const purchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
  paidDate: {
    type: Date,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'cakes',
  },
  slice: {
    type: Number,
  },
  receiptDate: {
    type: Date,
  },
});

export default mongoose.model('purchase', purchaseSchema);
