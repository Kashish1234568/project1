// backend/src/controllers/menuController.js
import MenuCategory from '../models/MenuCategory.js';
import MenuItem from '../models/MenuItem.js';

// --- Admin Only: Create Item ---
const createItem = async (req, res) => {
  const { name, description, price, categoryId, availability, tags } = req.body;
  // NOTE: Image handling logic removed, only saving path
  const imageUrl = '/uploads/menu/path/to/image.jpg'; // Dummy path

  const item = await MenuItem.create({ name, description, price, categoryId, imageUrl, availability, tags });
  res.status(201).json(item);
};

// --- Public: Get Items (with Search/Pagination) ---
const getItems = async (req, res) => {
    const { search, category, limit = 10, page = 1 } = req.query;
    const query = { availability: true }; // Only active items
    
    // Add search and category filter logic here... (as discussed before)
    // ...
    const items = await MenuItem.find(query).limit(limit).skip(limit * (page - 1)).populate('categoryId', 'name');
    res.json({ items, page, pages: 1 });
};

// ... (Other CRUD for Categories and Items) ...
export { createItem, getItems, /* ... other functions ... */ };