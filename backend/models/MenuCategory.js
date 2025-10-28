// backend/src/models/MenuCategory.js
import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  displayOrder: { type: Number, default: 0 },
  active: { type: Boolean, default: true },
}, { timestamps: true });

const MenuCategory = mongoose.model('MenuCategory', categorySchema);
export default MenuCategory;