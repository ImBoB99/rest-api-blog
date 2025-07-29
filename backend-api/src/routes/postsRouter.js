const { Router } = require("express");
const postController = require("../controllers/postController");

const postsRouter = Router();

// posts

postsRouter.post("/", postController.createPost);

postsRouter.get("/", postController.getPosts);

postsRouter.get("/:postid", postController.getPostById);

postsRouter.put("/:postid", postController.updatePostById);

postsRouter.delete("/:postid", postController.deletePostById);

// comments

postsRouter.post("/:postid/comments", (req, res) => {
  res.send(`POST /posts/${req.params.postid}/comments - create a new comment`);
});

postsRouter.get("/:postid/comments", (req, res) => {
  res.send(`GET /posts/${req.params.postid}/comments - list comments`);
});

module.exports = postsRouter;
