import asyncHandler from "express-async-handler";
import Loan from "../models/loanModel.js";

// @desc   Apply for a loan
// @route  POST /api/loans/apply
// @access Private
export const applyLoan = asyncHandler(async (req, res) => {
  const { fullname, email, phone, dob, country, state, company, tax, address, employment, income, amount, purpose } = req.body;

  if (!fullname || !email || !phone || !dob || !country || !state || !tax || !address || !employment || !amount || !purpose) {
    res.status(400);
    throw new Error("All required fields must be filled");
  }

  const loan = await Loan.create({
    user: req.user._id,
    fullname,
    email,
    phone,
    dob,
    country,
    state,
    company,
    tax,
    address,
    employment,
    income,
    amount,
    purpose,
  });

  res.status(201).json(loan);
});

// @desc   Get user’s loans
// @route  GET /api/loans/myloans
// @access Private
export const getMyLoans = asyncHandler(async (req, res) => {
  const loans = await Loan.find({ user: req.user._id });
  res.json(loans);
});

// @desc   Update a loan
// @route  PUT /api/loans/:id
// @access Private
export const updateLoan = asyncHandler(async (req, res) => {
  const loan = await Loan.findById(req.params.id);

  if (!loan) {
    res.status(404);
    throw new Error("Loan not found");
  }

  if (loan.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to update this loan");
  }

  const updatedLoan = await Loan.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedLoan);
});

// @desc   Delete a loan
// @route  DELETE /api/loans/:id
// @access Private
export const deleteLoan = asyncHandler(async (req, res) => {
  const loan = await Loan.findById(req.params.id);

  if (!loan) {
    res.status(404);
    throw new Error("Loan not found");
  }

  if (loan.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("Not authorized to delete this loan");
  }

  await loan.deleteOne();
  res.json({ message: "Loan deleted successfully" });
});

// ✅ ADMIN SECTION BELOW

// @desc   Get all loans (Admin only)
// @route  GET /api/loans/all
// @access Private/Admin
export const getAllLoans = asyncHandler(async (req, res) => {
  const loans = await Loan.find().populate("user", "name email");
  res.json(loans);
});
