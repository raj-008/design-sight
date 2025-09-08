const express = require("express");
const app = new express();
const connectMongoDB = require("./connection.js");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const routes = require("./routes/routes");
connectMongoDB();
const globalErrorHandler = require("./controller/errorController");
const cookieParser = require("cookie-parser");

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  console.log("Uncaught Exception occured! Shutting down...");
  process.exit(1);
});

app.use(cors()); // configure frontend URL
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static("public"));

app.use("/api/v1", routes);

app.all("*name", (req, res, next) => {
  res.status(404).json({ message: `Can't find ${req.originalUrl}` });
});

app.use(globalErrorHandler);

app.listen(process.env.PORT || 9000, () => {
  console.log(`Server is running on Port : ${process.env.PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("Unhandled rejection occured! Shutting down...");

  server.close(() => {
    process.exit(1);
  });
});
