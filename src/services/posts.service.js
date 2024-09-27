import { PostsRepository } from "../repositories/posts.repository.js";

export class PostsService {
  postsRepository = new PostsRepository();

  findAllPosts = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const posts = await this.postsRepository.findAllPosts();

    // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
    posts.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return posts.map((post) => {
      return {
        postId: post.postId,
        nickname: post.nickname,
        title: post.title,
        createdAt: post.createdAt,
        updatedAt: post.updatedAt,
      };
    });
  };

  createPost = async (nickname, password, title, content) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const createdPost = await this.postsRepository.createPost(
      nickname,
      password,
      title,
      content
    );

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return {
      postId: createdPost.postId,
      nickname: createdPost.nickname,
      title: createdPost.title,
      content: createdPost.content,
      createdAt: createdPost.createdAt,
      updatedAt: createdPost.updatedAt,
    };
  };

  detailPost = async (postId) => {
    const posts = await this.postsRepository.findDetailPosts(postId);

    return {
      postId: posts.postId,
      nickname: posts.nickname,
      title: posts.title,
      createdAt: posts.createdAt,
      updatedAt: posts.updatedAt,
    };
  };

  updatePost = async (postId, password, title, content) => {
    const post = await this.postsRepository.findDetailPosts(postId);
    if (!post) {
      throw new Error("존재하지 않는 게시글 입니다.");
    }

    // 저장소에게 데이터 수정 요청 // 원래 hashedPassword 사용
    await this.postsRepository.updatePosts(postId, password, title, content);

    // 변경된 데이터를 조회
    const updatedPost = await this.postsRepository.findDetailPosts(postId);

    return {
      postId: updatedPost.postId,
      nickname: updatedPost.nickname,
      title: updatedPost.title,
      content: updatedPost.content,
      createdAt: updatedPost.createdAt,
      updatedAt: updatedPost.updatedAt,
    };
  };

  deletePost = async (postId, password) => {
    const post = await this.postsRepository.findDetailPosts(postId);
    if (!post) {
      throw new Error("존재하지 않는 게시글 입니다.");
    }

    await this.postsRepository.deletePosts(postId, password);

    return {
      postId: post.postId,
      nickname: post.nickname,
      title: post.title,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
    };
  };
}
