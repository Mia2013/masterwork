import mongoose from 'mongoose';

const cakeSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  price: {
    type: String,
  },
  allergenic: {
    type: String,
  },
  description: {
    type: String,
  },
});

export default mongoose.model('cakes', cakeSchema);
