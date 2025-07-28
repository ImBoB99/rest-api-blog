require("dotenv").config({ quiet: true });
require("module-alias/register"); // Enables path alias for @prisma globally
const express = require("express");
const postsRouter = require("./routes/postsRouter");
const userRouter = require("./routes/userRouter");
const app = express();

app.use("/api/posts", postsRouter);
app.use("/api/user", userRouter);

const PORT = process.env.APP_PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
