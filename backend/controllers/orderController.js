import Order from '../models/Order.js';
import MenuItem from '../models/MenuItem.js';
import Table from '../models/Table.js';

// Helper function to calculate total price
const calculateOrderTotals = (items) => {
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const taxRate = 0.05; // 5% Tax example
    const tax = subtotal * taxRate;
    const totalPrice = subtotal + tax;
    return { subtotal, tax, totalPrice };
};

// --- 1. Customer: Place New Order (POST /api/orders) ---
const placeOrder = async (req, res) => {
    const { tableId, items } = req.body; // items: [{ menuItemId, quantity, note }]

    try {
        if (!tableId || !items || items.length === 0) {
            return res.status(400).json({ message: 'Table ID and items are required.' });
        }

        // 1. Table context fetch
        const table = await Table.findById(tableId);
        if (!table) {
            return res.status(404).json({ message: 'Table not found.' });
        }

        // 2. Fetch menu details for validation and price calculation
        const itemIds = items.map(item => item.menuItemId);
        const menuItems = await MenuItem.find({ 
            _id: { $in: itemIds }, 
            availability: true 
        }).select('_id name price');

        if (menuItems.length !== itemIds.length) {
            return res.status(400).json({ message: 'One or more menu items are invalid or unavailable.' });
        }

        // 3. Construct the final list of items with price and name
        const orderItems = items.map(inputItem => {
            const menuItem = menuItems.find(m => m._id.toString() === inputItem.menuItemId);
            return {
                menuItemId: menuItem._id,
                name: menuItem.name,
                quantity: inputItem.quantity,
                price: menuItem.price, // Use current price
                notes: inputItem.note || '',
            };
        });

        // 4. Calculate final totals
        const totals = calculateOrderTotals(orderItems);

        // 5. Create the order
        const order = await Order.create({
            tableId,
            tableNumber: table.number,
            items: orderItems,
            ...totals,
        });
        
        // 🎯 Real-time Event: Staff ko naye order ki notification bhejo
        // 'newOrder' event 'staffs' room mein broadcast karo
        // Populate items with full details before sending via socket
        const populatedOrder = await Order.findById(order._id).lean(); 
        
        if (req.io && populatedOrder) {
            req.io.to('staffs').emit('newOrder', populatedOrder);
        }
        
        res.status(201).json(order);

    } catch (error) {
        console.error("Order placement failed:", error);
        res.status(500).json({ message: 'Server error during order placement.' });
    }
};

// --- 2. Staff/Admin: Get Orders Queue (GET /api/orders?status=...) ---
const getOrdersQueue = async (req, res) => {
    const { status, limit = 50 } = req.query; 

    // Filter by status if provided, else fetch all non-finalized orders
    const filter = status 
        ? { status: status.toLowerCase() } 
        : { status: { $in: ['placed', 'preparing', 'ready', 'served'] } }; 

    try {
        const orders = await Order.find(filter)
            .sort({ createdAt: -1 }) // Newest first
            .limit(parseInt(limit));
            // .populate('tableId', 'number'); // Populate table number if needed, but we save it directly

        res.json(orders);
    } catch (error) {
        console.error("Error fetching orders queue:", error);
        res.status(500).json({ message: 'Failed to fetch order queue.' });
    }
};

// --- 3. Staff: Update Order Status (PATCH /api/orders/:id/status) ---
const updateOrderStatus = async (req, res) => {
    const orderId = req.params.id;
    const { newStatus } = req.body;
    
    // Simple validation
    if (!['placed', 'preparing', 'ready', 'served', 'paid', 'cancelled'].includes(newStatus)) {
        return res.status(400).json({ message: 'Invalid status update.' });
    }

    try {
        const order = await Order.findByIdAndUpdate(
            orderId,
            { status: newStatus },
            { new: true } // Returns the updated document
        ).lean(); 

        if (!order) {
            return res.status(404).json({ message: 'Order not found.' });
        }
        
        // 🎯 Real-time Event: Customer ko status change ki notification bhejo
        // 'orderUpdated' event specific table room mein broadcast karo
        if (req.io) {
            // Customer (Table room)
            req.io.to(order.tableId.toString()).emit('orderUpdated', order);
            // Staff (Dashboard update)
            req.io.to('staffs').emit('statusChange', order); 
        }

        res.json(order);

    } catch (error) {
        console.error("Error updating order status:", error);
        res.status(500).json({ message: 'Failed to update order status.' });
    }
};

// --- 4. Customer: Get My Orders (GET /api/orders/me?tableId=...) ---
const getMyOrders = async (req, res) => {
    const { tableId } = req.query; 

    if (!tableId) {
        return res.status(400).json({ message: 'Table ID is required to fetch orders.' });
    }

    try {
        // Fetch orders for this specific table that are not yet finalized (paid/cancelled)
        const orders = await Order.find({ 
            tableId: tableId,
            status: { $in: ['placed', 'preparing', 'ready', 'served'] }
        })
        .sort({ createdAt: -1 })
        .lean(); 

        res.json(orders);
    } catch (error) {
        console.error("Error fetching customer orders:", error);
        res.status(500).json({ message: 'Failed to fetch orders for the table.' });
    }
};


export { 
    placeOrder, 
    getOrdersQueue, 
    updateOrderStatus,
    getMyOrders
};