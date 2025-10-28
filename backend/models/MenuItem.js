// backend/src/models/MenuItem.js
import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuCategory', required: true },
  imageUrl: { type: String, default: '/uploads/menu/default.jpg' }, // ⬅️ Image Path/URL
  availability: { type: Boolean, default: true },
  tags: [String],
}, { timestamps: true });

// Indexing for performance
menuItemSchema.index({ categoryId: 1, name: 1 }); 
menuItemSchema.index({ name: 'text', tags: 'text' });
const MenuItem = mongoose.model('MenuItem', menuItemSchema);
export default MenuItem;