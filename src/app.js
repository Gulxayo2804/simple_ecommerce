require('dotenv').config();
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const adminRoutes = require('./routes/adminRoutes');

const app = express();

// Connect DB
connectDB();

// Set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(express.static(path.join(__dirname, "public")));
app.use('/uploads', express.static(path.join(__dirname, "public", "uploads")));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/admin', adminRoutes);
console.log("Serving static from:", path.join(__dirname, "public"));


app.get('/', (req, res) => res.redirect('/api/products'));

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack || err);
  if (req.path.startsWith('/api/')) {
    return res.status(500).json({ message: err.message });
  }
  res.status(500).render('error', { message: err.message });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
