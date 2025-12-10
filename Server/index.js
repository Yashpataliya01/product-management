import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'

// import db connection
import connectDB from './config/db.js';

// import routes
import authRoutes from './routes/Auth.route.js';
import productRoutes from './routes/Product.route.js';
import AiRoutes from './routes/Ai.route.js';

dotenv.config();
const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/ai", AiRoutes);

connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
