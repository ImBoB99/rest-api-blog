const { check, param, validationResult } = require("express-validator");

const validateCommentCreation = [
  param("postid").isInt({ gt: 0 }).withMessage("Post ID must be a positive integer"),

  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email must not be empty")
    .isString()
    .withMessage("Email must be a string")
    .isEmail()
    .withMessage("Must be a valid email")
    .escape(),

  check("content")
    .isString()
    .withMessage("Comment must be a string")
    .trim()
    .notEmpty()
    .withMessage("Comment must not be empty"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

module.exports = { validateCommentCreation };
