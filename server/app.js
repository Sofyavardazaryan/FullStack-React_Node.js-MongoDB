const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cors = require("cors");

const authRouter = require("./routes/auth");
const todoRouter = require("./routes/todo");

const app = express();

// DB
mongoose
  .connect("mongodb://127.0.0.1:27017/todo-app")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// MIDDLEWARE
app.use(express.json());

// CORS for React (Vite)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// SESSION
app.use(
  session({
    secret: "secret123",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb://127.0.0.1:27017/todo-app",
    }),
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// ROUTES
app.use("/auth", authRouter);
app.use("/todos", todoRouter);

// TEST
app.get("/", (req, res) => {
  res.json({ message: "API running 🚀" });
});

// ERROR HANDLER
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

module.exports = app;