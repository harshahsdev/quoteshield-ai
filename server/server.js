import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

// middleware
app.use(
  cors({
    origin: "https://quoteshield-ai-eight.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/job', jobRoutes);

// console.log("MONGO_URI =", process.env.MONGO_URI);
// console.log("PORT =", process.env.PORT);

// connect to database
connectDB();



app.get('/', (req, res)=>{
    res.send('QuoteShield AI API is running...');
});
const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
});