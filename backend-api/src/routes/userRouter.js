const { Router } = require("express");

const userRouter = Router();

userRouter.post("/login", (req, res) => {
  res.send("POST / - log the user in");
});

userRouter.post("/logout", (req, res) => {
  res.send("POST / - log the user out");
});

module.exports = userRouter;
