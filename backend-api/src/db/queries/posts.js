const prisma = require("@prisma");

const createPost = async (title, authorId = 1, isPublished, content) => {
  return await prisma.post.create({
    data: {
      title: title,
      authorId: authorId,
      ...(typeof isPublished === "boolean" && { published: isPublished }),
      ...(typeof content === "string" && { content: content }),
    },
  });
};

const getPosts = async () => {
  return await prisma.post.findMany();
};

const getPostById = async (postid) => {
  return await prisma.post.findUnique({
    where: {
      id: postid,
    },
  });
};

const updatePostById = async (postid, title, isPublished, content) => {
  return await prisma.post.update({
    where: {
      id: postid,
    },
    data: {
      title: title,
      ...(typeof isPublished === "boolean" && { published: isPublished }),
      ...(typeof content === "string" && { content: content }),
    },
  });
};

const deletePostById = async (postid) => {
  return await prisma.post.delete({
    where: {
      id: postid,
    },
  });
};

module.exports = { createPost, getPosts, getPostById, updatePostById, deletePostById };
