export class PostsRepository {
  constructor(prisma) {
    this.prisma = prisma;
  }

  findAllPosts = async () => {
    // ORM인 Prisma에서 Posts 모델의 findMany 메서드를 사용해 데이터를 요청합니다.
    const posts = await this.prisma.posts.findMany();

    return posts;
  };

  createPosts = async (nickname, password, title, content) => {
    // ORM인 Prisma에서 Posts 모델의 create 메서드를 사용해 데이터를 요청합니다.
    const createdPost = await this.prisma.posts.create({
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
    const detailPost = await this.prisma.posts.findUnique({
      where: { postId: +postId },
    });

    return detailPost;
  };

  updatePosts = async (postId, password, title, content) => {
    const updatedPost = await this.prisma.posts.update({
      where: { postId: +postId, password: password },
      data: {
        title,
        content,
      },
    });

    return updatedPost;
  };

  deletePosts = async (postId, password) => {
    const deletedPost = await this.prisma.posts.delete({
      where: { postId: +postId, password: password },
    });

    return deletedPost;
  };
}
