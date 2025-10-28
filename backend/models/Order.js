// backend/models/Order.js
import mongoose from 'mongoose';

// 1. OrderItem Schema: What the customer bought (MUST be defined first)
// This schema is embedded within the main Order schema.
const orderItemSchema = new mongoose.Schema({
  menuItemId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'MenuItem', 
    required: true 
  },
  name: { type: String, required: true },
  quantity: { type: Number, required: true, default: 1 },
  price: { type: Number, required: true }, // Price at the time of order
  notes: { type: String }, // Special customer request (e.g., "extra spicy")
});


// 2. Order Schema: The main transaction schema
const orderSchema = new mongoose.Schema({
  // Customer Context
  tableId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Table', 
    required: true 
  },
  tableNumber: { type: Number, required: true }, // Redundancy for quick access

  // Items List: Uses the defined orderItemSchema
  items: [orderItemSchema], 

  // Order Totals
  subtotal: { type: Number, required: true, default: 0 },
  tax: { type: Number, default: 0 },
  totalPrice: { type: Number, required: true, default: 0 },

  // Status Tracking
  status: {
    type: String,
    enum: ['placed', 'preparing', 'ready', 'served', 'paid', 'cancelled'],
    default: 'placed', // Starting status
  },
  
  // Optional: Link to a logged-in User
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
}, { timestamps: true });

// Index for Staff Query: Sort by status and table
orderSchema.index({ status: 1, tableNumber: 1 });

const Order = mongoose.model('Order', orderSchema);
export default Order;