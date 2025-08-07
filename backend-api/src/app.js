require("dotenv").config({ quiet: true });
require("module-alias/register"); // Enables path alias for @prisma globally
const express = require("express");
const cors = require("cors");
const postsRouter = require("./routes/postsRouter");
const userRouter = require("./routes/userRouter");

// Login Passport & JWT
const jwt = require("jsonwebtoken");
const passport = require("passport");

// Need to require the entire Passport config module so app.js knows about it
require("../config/passport");

const app = express();

app.use(cors()); // Allow all origins by default

// Optionally: Restrict to the frontend
// app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.urlencoded());
app.use(express.json());

app.use("/api/posts", postsRouter);
app.use("/api/user", userRouter);

app.post("/api/login", passport.authenticate("local", { session: false }), (req, res) => {
  jwt.sign({ id: req.user.id, username: req.user.username }, process.env.SECRET_KEY, (error, token) => {
    res.json({
      token: token,
    });
  });
});

app.get("/api/verify", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.sendStatus(200)
})

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
