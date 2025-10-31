import mongoose from "mongoose";

const loanSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // ✅ link each loan to a user
      required: true,
    },
    fullname: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    company: { type: String },
    tax: { type: String, required: true },
    address: { type: String, required: true },
    employment: { type: String, required: true },
    income: { type: Number },
    amount: { type: Number, required: true },
    purpose: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const Loan = mongoose.models.Loan || mongoose.model("Loan", loanSchema);
export default Loan;


