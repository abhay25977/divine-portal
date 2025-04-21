import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

import studentRoutes from './routes/studentRoutes.js';
import adminRoutes from "./routes/adminRoutes.js";
import teacherRoutes from "./routes/teacherRoutes.js";

dotenv.config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
app.use(express.json());

app.use('/api/student', studentRoutes);
app.use('/api/teacher', teacherRoutes);
app.use("/api/admin", adminRoutes);


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected Successfully'))
.catch(err => console.error('MongoDB Connection Error:', err));


app.get('/', (req, res) => {
  res.send('Student Registration API is Running');
});


const PORT = process.env.PORT || 4010;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
