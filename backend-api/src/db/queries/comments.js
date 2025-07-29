const prisma = require("@prisma");

const getComments = async (postid) => {
  return await prisma.comment.findMany({
    where: {
      postId: postid,
    },
  });
};

const createComment = async (postid, content, email) => {
  return await prisma.comment.create({
    data: {
      postId: postid,
      email: email,
      content: content,
    },
  });
};

module.exports = { getComments, createComment };
