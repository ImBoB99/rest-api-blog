const prisma = require("@prisma");

const getPosts = async () => {
  return await prisma.post.findMany();
};

const createPost = async (title, authorId = 1, isPublished = undefined, content = undefined) => {
  return await prisma.post.create({
    data: {
      title: title,
      authorId: authorId,
      ...(typeof isPublished === "boolean" && { published: isPublished }),
      ...(typeof content === "string" && { content: content }),
    },
  });
};

module.exports = { createPost, getPosts };
