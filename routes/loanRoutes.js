import express from "express";
import {
  applyLoan,
  getMyLoans,
  getAllLoans,
  updateLoan,
  deleteLoan,
} from "../controllers/loanController.js";
import { protect } from "../middleware/authMiddleware.js";
import { admin } from "../middleware/adminMiddleware.js";  // 👈 import it

const router = express.Router();

router.post("/apply", protect, applyLoan);
router.get("/myloans", protect, getMyLoans);
router.get("/all", protect, admin, getAllLoans);  // 👈 admin only
router.put("/:id", protect, updateLoan);
router.delete("/:id", protect, deleteLoan);

export default router;

