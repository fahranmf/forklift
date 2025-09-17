// index.js (ESM)
import 'dotenv/config'; 
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import forkliftRoutes from './routes/forklifts.js';
import authRoutes from './routes/auth.js';


const app = express();

app.use(cors({
  origin: process.env.APP_URL, // atau array kalau multi-origin
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// route import (ESM)
app.use('/auth', authRoutes);
app.use("/api/forklifts", forkliftRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
