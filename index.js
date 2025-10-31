import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import loanRoutes from "./routes/loanRoutes.js";
import adminRoutes from './routes/adminRoutes.js';

dotenv.config();
connectDB();

const app = express();

// ✅ Middleware
app.use(cors({
  origin: ["http://localhost:5173", "http://127.0.0.1:5501"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.json()); // must come BEFORE routes

// ✅ Routes
app.use("/api/users", userRoutes);
app.use("/api/loans", loanRoutes);
app.use('/api/admin', adminRoutes);


app.get("/", (req, res) => {
  res.send("Welcome to Loan API 🚀");
});

const PORT = process.env.PORT || 5009;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
