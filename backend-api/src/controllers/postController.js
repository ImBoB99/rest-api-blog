const db = require("../db/queries/posts");

const getPosts = async (req, res) => {
  try {
    const posts = await db.getPosts();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch posts" });
  }
};

const createPost = async (req, res) => {
  const { title, content, authorId = 1, isPublished } = req.body;

  if (!title || typeof title !== "string" || title.trim() === "") {
    return res.status(400).json({ error: "Title is required." });
  }

  // Enforce that published posts must have content
  if (isPublished === true && (!content || content.trim() === "")) {
    return res.status(400).json({ error: "Published posts must have content." });
  }

  try {
    const post = await db.createPost(title, authorId, isPublished, content);
    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error);
    res.status(500).json({ error: "Could not create the post" });
  }
};

module.exports = { createPost, getPosts };
