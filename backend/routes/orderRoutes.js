// backend/src/routes/orderRoutes.js
import express from 'express';
import { placeOrder, getOrdersQueue, updateOrderStatus, getMyOrders } from '../controllers/orderController.js';
import { protect, restrictTo } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- Public / Customer Routes ---

// POST /api/orders: Customer places a new order (Public/Guest flow)
router.post('/', placeOrder);

// GET /api/orders/me: Customer history (Guest flow tied to table slug/session)
router.get('/me', getMyOrders); 

// --- Staff / Admin Routes ---

// GET /api/orders?status=&table=: Staff gets the orders queue/dashboard
router.get('/',getOrdersQueue);

// PATCH /api/orders/:id/status: Staff updates order status
router.patch('/:id/status',  updateOrderStatus);

export default router;