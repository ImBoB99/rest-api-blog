const { Router } = require("express");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const {
  validatePostCreation,
  validatePostUpdate,
  validatePostDeletion,
} = require("../middleware/postValidation");

const postsRouter = Router();

// posts

postsRouter.post("/", validatePostCreation, postController.createPost);

postsRouter.get("/", postController.getPosts);

postsRouter.get("/:postid", postController.getPostById);

postsRouter.put("/:postid", validatePostUpdate, postController.updatePostById);

postsRouter.delete("/:postid", validatePostDeletion, postController.deletePostById);

// comments

postsRouter.post("/:postid/comments", commentController.createComment);

postsRouter.get("/:postid/comments", commentController.getComments);

module.exports = postsRouter;
