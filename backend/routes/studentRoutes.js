import express from 'express';
import { registerStudent, loginStudent } from '../controllers/studentController.js';
import upload from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/register', upload.single('profilePicture'), registerStudent);
router.post('/login', loginStudent);

export default router;
