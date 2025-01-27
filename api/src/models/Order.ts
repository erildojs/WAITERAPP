import { model, Schema } from "mongoose";

export const Order = model('orders', new Schema({
  table: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['WAITING', 'IN_PRODUCTION', 'DONE'],
    default: 'WAITING'
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  products: {
    required: true,
    type: [{
      product: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'products'
      },
      quantity: {
        type: Number,
        default: 1
      }
    }]
  },
}))