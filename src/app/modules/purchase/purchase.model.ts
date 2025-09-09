import { Schema, model, Types } from 'mongoose';
import { IPurchase } from './purchase.interface';

const PurchaseSchema = new Schema<IPurchase>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export const Purchase = model<IPurchase>('Purchase', PurchaseSchema);
