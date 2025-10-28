// backend/src/routes/menuRoutes.js
import express from 'express';
import { createItem, getItems } from '../controllers/menuController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public: GET /api/menu/items
router.route('/items').get(getItems); 

// Admin Only: POST /api/menu/items
router.route('/items').post(createItem); 

// Public: GET /api/menu/categories
// Admin Only: POST/PUT/DELETE /api/menu/categories
// ... (Categories routes implementation using protect, restrictTo('admin')) ...

export default router;