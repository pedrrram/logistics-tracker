const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth");
const packageRoutes = require("./routes/packages");

const app = express();
app.use(express.json());
app.use(cookieParser());

// Database connection
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/packages", packageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
