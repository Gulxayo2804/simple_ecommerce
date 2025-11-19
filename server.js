require('dotenv').config();
const express = require('express');
const connectDB = require('./src/config/db');
const productRoutes = require('./src/routes/productRoutes');
const errorMiddleware = require('./src/middlewares/errorMiddleware');

const app = express();

// Connect DB
connectDB();

// Middleware
app.use(express.json());
app.use('/api/products', productRoutes);

// Error middleware
app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
