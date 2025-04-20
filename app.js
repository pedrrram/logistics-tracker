const express = require("express");
const connectDB = require("./config/db");
require("dotenv").config();
const cookieParser = require("cookie-parser");

const app = express();
app.use(express.json());
app.use(cookieParser())

// Database connection
connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));