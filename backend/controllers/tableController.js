// backend/src/controllers/tableController.js
import Table from '../models/Table.js';
import generateSlug from '../utils/slugGenerator.js';
import qrcode from 'qrcode'; // QR Code generation package

// --- Admin Only: Create Table ---
const createTable = async (req, res) => {
  const { number } = req.body;
  const qrSlug = generateSlug(8);
  const table = await Table.create({ number, qrSlug });
  res.status(201).json(table);
};

// --- Admin Only: Generate QR Code ---
const generateTableQR = async (req, res) => {
    const table = await Table.findById(req.params.id);
    if (!table) return res.status(404).json({ message: 'Table not found' });
    
    // Frontend URL: Yahan frontend ka port 3000 use kiya hai
    const url = `http://localhost:3000/m/${table.qrSlug}`; 
    const qrDataUrl = await qrcode.toDataURL(url); // Generates QR image string

    res.json({ qrCodeUrl: qrDataUrl, slug: table.qrSlug });
};

// --- Public: Resolve Table Context (QR Landing) ---
const getMenuByTable = async (req, res) => {
    const table = await Table.findOne({ qrSlug: req.params.slug });
    if (!table) return res.status(404).json({ message: 'Invalid QR slug.' });
    
    // Yahan hum menu items return kar sakte hain
    // For now, only return table context
    res.json({ tableId: table._id, tableNumber: table.number, message: 'Table context resolved.' }); 
};
const getTables = async (req, res) => {
    try {
        const tables = await Table.find({});
        res.json(tables);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching tables' });
    }
};

export { createTable, generateTableQR, getMenuByTable, getTables };