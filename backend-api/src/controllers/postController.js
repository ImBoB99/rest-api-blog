const db = require("../db/queries/posts");

const getPosts = async (req, res) => {
  try {
    const posts = await db.getPosts();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: "Could not fetch posts" });
  }
};

module.exports = { getPosts };
