// index.js (ESM)
import 'dotenv/config'; // ini langsung load .env tanpa const dotenv

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

app.use(cors({
  origin: process.env.APP_URL, // atau array kalau multi-origin
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// route import (ESM)
import authRoutes from './routes/auth.js';
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
