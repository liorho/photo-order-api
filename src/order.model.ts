import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  fullName: { type: String, required: true },
  address: { type: String, required: true },
  imageUrls: { type: [String], required: true },
  frameColor: { type: String, required: true },
  user: { type: String, required: true },
});

export default mongoose.model('Order', orderSchema);
