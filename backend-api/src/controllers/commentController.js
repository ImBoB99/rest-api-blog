const db = require("../db/queries/comments");

const getComments = async (req, res) => {
  const postid = Number(req.params.postid);

  try {
    const comments = await db.getComments(postid);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch comments" });
  }
};

const createComment = async (req, res) => {
  const postid = Number(req.params.postid);
  const { content, email } = req.body;

  // TODO: Replace with express validator
  if (!email || typeof email !== "string" || email.trim() === "") {
    return res.status(400).json({ error: "Email is required." });
  }

  if (!content || typeof content !== "string" || content.trim() === "") {
    return res.status(400).json({ error: "Content is required." });
  }

  try {
    const comment = await db.createComment(postid, content, email);
    res.status(200).json(comment);
  } catch (error) {
    res.status(500).json({ error: "Could not post the comment" });
  }
};

module.exports = { getComments, createComment };
