const { check, param, validationResult } = require("express-validator");

const validatePostCreation = [
  check("title")
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .notEmpty()
    .withMessage("Title must not be empty")
    .escape(),

  check("content")
    .if((value, { req }) => req.body.isPublished === true)
    .isString()
    .withMessage("Content must be a string")
    .trim()
    .notEmpty()
    .withMessage("Content must not be empty if post is being published"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

const validatePostUpdate = [
  param("postid").isInt({ gt: 0 }).withMessage("Post ID must be a positive integer"),
  check("title")
    .isString()
    .withMessage("Title must be a string")
    .trim()
    .notEmpty()
    .withMessage("Title must not be empty")
    .escape(),

  check("content")
    .if((value, { req }) => req.body.isPublished === true)
    .isString()
    .withMessage("Content must be a string")
    .trim()
    .notEmpty()
    .withMessage("Content must not be empty if post is being published")
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

const validatePostDeletion = [
  param("postid").isInt({ gt: 0 }).withMessage("Post ID must be a positive integer"),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    next();
  },
];

module.exports = { validatePostCreation, validatePostUpdate, validatePostDeletion };
