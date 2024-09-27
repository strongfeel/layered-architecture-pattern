import { PostsService } from "../services/posts.service.js";

// Post의 컨트롤러(Controller)역할을 하는 클래스
export class PostsController {
  postsService = new PostsService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getPosts = async (req, res, next) => {
    try {
      // 서비스 계층에 구현된 findAllPosts 로직을 실행합니다.
      const posts = await this.postsService.findAllPosts();

      return res.status(200).json({ data: posts });
    } catch (err) {
      next(err);
    }
  };

  createPost = async (req, res, next) => {
    try {
      const { nickname, password, title, content } = req.body;

      // 서비스 계층에 구현된 createPost 로직을 실행합니다.
      const createdPost = await this.postsService.createPost(
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

  detailPost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const posts = await this.postsService.detailPost(postId);

      return res.status(200).json({ data: posts });
    } catch (err) {
      next(err);
    }
  };

  updatePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { password, title, content } = req.body;

      const updatedPost = await this.postsService.updatePost(
        postId,
        password,
        title,
        content
      );

      return res.status(200).json({ data: updatedPost });
    } catch (err) {
      next(err);
    }
  };

  deletePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { password } = req.body;
      const deletePost = await this.postsService.deletePost(postId, password);

      return res.status(200).json({ data: deletePost });
    } catch (err) {
      next(err);
    }
  };
}
