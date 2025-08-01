const { Router } = require("express");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const {
  validatePostCreation,
  validatePostUpdate,
  validatePostDeletion,
} = require("../middleware/postValidation");
const { validateCommentCreation } = require("../middleware/commentValidation");
const passport = require("passport");
const postsRouter = Router();

// posts

postsRouter.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validatePostCreation,
  postController.createPost,
);

postsRouter.get("/", postController.getPosts);

postsRouter.get("/:postid", postController.getPostById);

postsRouter.put(
  "/:postid",
  passport.authenticate("jwt", { session: false }),
  validatePostUpdate,
  postController.updatePostById,
);

postsRouter.delete(
  "/:postid",
  passport.authenticate("jwt", { session: false }),
  validatePostDeletion,
  postController.deletePostById,
);

// comments

postsRouter.post("/:postid/comments", validateCommentCreation, commentController.createComment);

postsRouter.get("/:postid/comments", commentController.getComments);

module.exports = postsRouter;
