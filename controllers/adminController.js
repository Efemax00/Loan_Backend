// controllers/adminController.js
import Loan from "../models/loanModel.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import sendEmail from "../utils/sendEmail.js";

// ✅ Get all users (Admin only)
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password"); // Exclude password
  res.status(200).json(users);
});

// ✅ Get all loans (optionally filter by status)
export const getAllLoans = asyncHandler(async (req, res) => {
  const { status } = req.query;
  const filter = {};
  if (status) filter.status = status;

  const loans = await Loan.find(filter);
  res.json(loans);
});

// ✅ Approve loan
export const approveLoan = asyncHandler(async (req, res) => {
  const { loanId } = req.params;
  const loan = await Loan.findById(loanId);
  if (!loan) return res.status(404).json({ message: "Loan not found" });

  // Send email notification
  await sendEmail(
    loan.email,
    "Loan Approved ✅",
    `Hi ${loan.fullname},\n\nYour loan application has been approved!\n\nAmount: ${loan.amount}\nStatus: ${loan.status}\n\n- LoanApp Team`
  );

  loan.status = "approved";
  await loan.save();
  res.json({ message: "Loan approved", loan });
});

// ✅ Reject loan
export const rejectLoan = asyncHandler(async (req, res) => {
  const { loanId } = req.params;
  const loan = await Loan.findById(loanId);
  if (!loan) return res.status(404).json({ message: "Loan not found" });

  // Send email notification
  await sendEmail(
    loan.email,
    "Loan Rejected ❌",
    `Hi ${loan.fullname},\n\nWe regret to inform you that your loan application has been rejected.\n\n- LoanApp Team`
  );
  
  loan.status = "rejected";
  await loan.save();
  res.json({ message: "Loan rejected", loan });
});
