import { prisma } from "../utils/prisma/index.js";

export class PostsRepository {
  findAllPosts = async () => {
    // ORM인 Prisma에서 Posts 모델의 findMany 메서드를 사용해 데이터를 요청합니다.
    const posts = await prisma.posts.findMany();

    return posts;
  };

  createPost = async (nickname, password, title, content) => {
    // ORM인 Prisma에서 Posts 모델의 create 메서드를 사용해 데이터를 요청합니다.
    const createdPost = await prisma.posts.create({
      data: {
        nickname,
        password,
        title,
        content,
      },
    });

    return createdPost;
  };

  findDetailPosts = async (postId) => {
    const detailPost = await prisma.posts.findFirst({
      where: { postId: +postId },
    });

    return detailPost;
  };

  updatePosts = async (postId, password, title, content) => {
    const updatedPost = await prisma.posts.update({
      where: { postId: +postId },
      data: {
        password,
        title,
        content,
      },
    });

    return updatedPost;
  };

  deletePosts = async (postId, password) => {
    const deletedPost = await prisma.posts.delete({
      where: { postId: +postId, password: password },
    });

    return deletedPost;
  };
}
