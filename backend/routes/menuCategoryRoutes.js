// backend/src/routes/menuCategoryRoutes.js
import express from 'express';
import {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} from '../controllers/menuCategoryController.js';

const router = express.Router();

router.post('/', createCategory);          // Create
router.get('/', getCategories);            // Read
router.put('/:id', updateCategory);        // Update
router.delete('/:id', deleteCategory);     // Delete

export default router;

