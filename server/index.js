const express = require("express");
const app = new express();
const connectMongoDB = require("./connection.js");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const routes = require("./Routes/routes");
connectMongoDB();
const globalErrorHandler = require("./controller/errorController");
const cookieParser = require("cookie-parser");

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
