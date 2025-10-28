// backend/src/routes/tableRoutes.js
import express from 'express';
import { createTable, getTables, generateTableQR, getMenuByTable } from '../controllers/tableController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

// Admin Only: CRUD
router.route('/').post( createTable);
router.route('/').get(getTables);

// Admin Only: QR Generation
router.route('/:id/qr').get(generateTableQR);

// Public: QR Landing Page
router.route('/menu/by-table/:slug').get(getMenuByTable); // GET /api/tables/menu/by-table/:slug

export default router;