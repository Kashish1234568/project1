// --- Using ES Module (ESM) Syntax (import) instead of CommonJS (require) ---
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

// Database connection (Note: .js extension is mandatory for local file imports in ESM)
import connectDB from './config/db.js'; 

// Routes (You will need to create these files separately)
import userRoutes from './routes/userRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import tableRoutes from './routes/tableRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB(); 

const app = express();
// Use port from environment variable, default to 5000
const PORT = process.env.PORT || 5000;

// --- Socket.io Setup ---
// Create an HTTP server instance using the Express app
const httpServer = createServer(app);

// Initialize Socket.io server and configure CORS for real-time connection
const io = new Server(httpServer, {
  cors: {
    // Frontend URL where the React App is running
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// --- Middleware ---
// CORS for REST API requests (Express middleware)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// Body parser for JSON data
app.use(express.json()); 

// Socket.io Middleware: Attach IO instance to the request object 
// so controllers can emit real-time updates (req.io.emit)
app.use((req, res, next) => {
    req.io = io; 
    next();
});

// --- API Routes ---
// Health check route
app.get('/', (req, res) => {
    res.send('Welcome to Scan & Dine Lite Backend API');
});

// Route handlers for different parts of the application
app.use('/api/auth', userRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/tables', tableRoutes);
app.use('/api/orders', orderRoutes);

// --- Socket.io Connection Logic ---
io.on('connection', (socket) => {
    console.log(`A user connected: ${socket.id}`);

    // Logic to manage rooms based on user role or table ID
    const { role, tableId } = socket.handshake.query;

    // Staff/Admin joins the 'staffs' room for receiving all new/updated orders
    if (role === 'staff' || role === 'admin') {
        socket.join('staffs');
        console.log(`Staff/Admin joined the 'staffs' room.`);
    }

    // Customer joins a table-specific room for tracking their own order status
    if (tableId) {
        socket.join(tableId);
        console.log(`Customer joined room for Table ID: ${tableId}`);
    }

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});


// --- Server Start ---
// Use httpServer.listen (instead of app.listen) to integrate Socket.io
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
