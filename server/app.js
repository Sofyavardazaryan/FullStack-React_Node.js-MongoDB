const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo").default;
const cors = require("cors");
const authRouter = require("./routes/auth");
const todoRouter = require("./routes/todo");

const app = express();

const mongoUrl =
  "mongodb://vardazaryansofya_db_user:7S6iLdxCvlp0b2wB@ac-f9bfoqk-shard-00-00.s5i96nt.mongodb.net:27017,ac-f9bfoqk-shard-00-01.s5i96nt.mongodb.net:27017,ac-f9bfoqk-shard-00-02.s5i96nt.mongodb.net:27017/todo-app?ssl=true&replicaSet=atlas-qpga6z-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0";

mongoose
  .connect(mongoUrl)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB error:", err));

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(
  session({
    secret: "secret123",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: mongoUrl,
    }),
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.use("/auth", authRouter);
app.use("/todos", todoRouter);

app.get("/", (req, res) => {
  res.json({ message: "API running" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Server Error",
  });
});

module.exports = app;