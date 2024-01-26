import mongoose from 'mongoose';

const PurchasesSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'Users',
    required: true,
  },
  gameId: {
    type: mongoose.Types.ObjectId,
    ref: 'Games',
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ['credit', 'paypal', 'balance']
  },
  total: {
    type: Number,
    required: true,
  },
  refundedAt: {
    type: Date,
    default: undefined,
  },
}, { timestamps: true });

export default mongoose.model('Purchases', PurchasesSchema);
