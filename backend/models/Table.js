// backend/src/models/Table.js
import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
  number: { type: Number, required: true, unique: true },
  qrSlug: { type: String, required: true, unique: true }, // For QR link
  isOccupied: { type: Boolean, default: false },
}, { timestamps: true });

const Table = mongoose.model('Table', tableSchema);
export default Table;