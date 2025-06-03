require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
const port = process.env.PORT;

const authRoute = require("./src/routes/auth.route");
const connectDatabase = require("./src/config/mongodb.config");

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

connectDatabase();

app.use(express.json());

app.use("/api/auth", authRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
