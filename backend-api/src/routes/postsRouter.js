const { Router } = require("express");
const postController = require("../controllers/postController");

const postsRouter = Router();

// posts

postsRouter.post("/", postController.createPost);

postsRouter.get("/", postController.getPosts);

postsRouter.get("/:postid", (req, res) => {
  res.send(`GET /${req.params.postid} - get single post`);
});

postsRouter.put("/:postid", (req, res) => {
  res.send(`PUT /${req.params.postid} - update post`);
});

postsRouter.delete("/:postid", (req, res) => {
  res.send(`DELETE /${req.params.postid} - delete post`);
});

// comments

postsRouter.post("/:postid/comments", (req, res) => {
  res.send(`POST /posts/${req.params.postid}/comments - create a new comment`);
});

postsRouter.get("/:postid/comments", (req, res) => {
  res.send(`GET /posts/${req.params.postid}/comments - list comments`);
});

module.exports = postsRouter;
