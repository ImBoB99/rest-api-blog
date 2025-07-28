const prisma = require("@prisma");

const getPosts = async () => {
  return await prisma.post.findMany({ where: { published: true } });
};

module.exports = { getPosts };
