// routes/adminRoutes.js
import express from "express";
import { getAllUsers, getAllLoans, approveLoan, rejectLoan } from "../controllers/adminController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import User from "../models/User.js"; // ✅ Added for admin lookup
import jwt from "jsonwebtoken"; // ✅ For generating token
import bcrypt from "bcryptjs"; // ✅ For password check

const router = express.Router();

/* ✅ Admin Login Route */
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await User.findOne({ email });

    // Check if admin exists and has admin role
    if (!admin || admin.role !== "admin") {
      return res.status(403).json({ message: "Not authorized as admin" });
    }

    // Validate password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      message: "Admin login successful",
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/* ✅ Protected Admin Routes */
router.get("/users", protectAdmin, getAllUsers);
router.get("/loans", protectAdmin, getAllLoans);
router.put("/loans/:loanId/approve", protectAdmin, approveLoan);
router.put("/loans/:loanId/reject", protectAdmin, rejectLoan);

export default router;
