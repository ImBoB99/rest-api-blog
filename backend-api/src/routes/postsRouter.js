const { Router } = require("express");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

const postsRouter = Router();

// posts

postsRouter.post("/", postController.createPost);

postsRouter.get("/", postController.getPosts);

postsRouter.get("/:postid", postController.getPostById);

postsRouter.put("/:postid", postController.updatePostById);

postsRouter.delete("/:postid", postController.deletePostById);

// comments

postsRouter.post("/:postid/comments", commentController.createComment);

postsRouter.get("/:postid/comments", commentController.getComments);

module.exports = postsRouter;
