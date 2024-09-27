import { PostsService } from "../services/posts.service";

export class PostsController {
  postsService = new PostsService(); // PostsService 인스턴스화

  // 게시글 조회 API
  getPosts = async (req, res, next) => {
    try {
      const posts = await this.postsService.findAllPosts();

      return res.status(200).json({ data: posts });
    } catch (err) {
      next(err);
    }
  };

  // 게시글 생성 API
  createPosts = async (req, res, next) => {
    try {
      const { nickname, password, title, content } = req.body;

      const createdPost = await this.postsService.createPosts(
        nickname,
        password,
        title,
        content
      );

      return res.status(201).json({ data: createdPost });
    } catch (err) {
      next(err);
    }
  };
}
