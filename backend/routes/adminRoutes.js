import express from "express";
import adminAuth from "../middleware/adminAuth.js";
import {
    registerAdmin,
    adminLogin,
    getAllStudents,
    deleteUser,
  } from "../controllers/adminController.js";

const router = express.Router();

router.post("/register", registerAdmin)
router.post("/login", adminLogin);
router.get("/students", adminAuth, getAllStudents);
router.delete("/delete/:role/:id", adminAuth, deleteUser);

export default router;
