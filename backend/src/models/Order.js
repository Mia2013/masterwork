import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  status: {
    type: String,
  },
  orderDate: {
    type: Date,
  },
  slice: {
    type: Number,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'cakes',
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

export default mongoose.model('order', orderSchema);
