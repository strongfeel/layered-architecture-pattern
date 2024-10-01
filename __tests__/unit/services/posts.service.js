import { expect, jest } from "@jest/globals";
import { PostsService } from "../../../src/services/posts.service.js";

// PostsRepository는 아래의 5개 메서드만 지원하고 있습니다.
let mockPostsRepository = {
  findAllPosts: jest.fn(),
  findDetailPosts: jest.fn(),
  createPosts: jest.fn(),
  updatePosts: jest.fn(),
  deletePosts: jest.fn(),
};

// postsService의 Repository를 Mock Repository로 의존성을 주입합니다.
let postsService = new PostsService(mockPostsRepository);

describe("Posts Service Unit Test", () => {
  // 각 test가 실행되기 전에 실행됩니다.
  beforeEach(() => {
    jest.resetAllMocks(); // 모든 Mock을 초기화합니다.
  });

  test("findAllPosts Method", async () => {
    const samplePosts = [
      {
        postId: 1,
        nickname: "test",
        title: "제목",
        createdAt: "2024-09-27T09:35:43.410Z",
        updatedAt: "2024-09-27T09:35:43.410Z",
      },
      {
        postId: 2,
        nickname: "test",
        title: "제목",
        createdAt: "2024-09-28T09:35:43.410Z",
        updatedAt: "2024-09-28T09:35:43.410Z",
      },
    ];

    mockPostsRepository.findAllPosts.mockReturnValue(samplePosts);

    const allPosts = await postsService.findAllPosts();

    expect(allPosts).toEqual(
      samplePosts.sort((a, b) => {
        return b.createdAt - a.createdAt;
      })
    );

    expect(mockPostsRepository.findAllPosts).toHaveBeenCalledTimes(1);
  });

  test("deletePost Method By Success", async () => {
    const samplePost = {
      postId: 2,
      nickname: "test",
      password: "1234",
      title: "제목",
      content: "테스트 코드용 내용입니다.",
      createdAt: "2024-09-28T09:35:43.410Z",
      updatedAt: "2024-09-28T09:35:43.410Z",
    };

    mockPostsRepository.findDetailPosts.mockReturnValue(samplePost);

    const deletedPost = await postsService.deletePost(2, "1234");

    expect(mockPostsRepository.findDetailPosts).toHaveBeenCalledTimes(1);
    expect(mockPostsRepository.findDetailPosts).toHaveBeenCalledWith(
      samplePost.postId
    );

    expect(mockPostsRepository.deletePosts).toHaveBeenCalledTimes(1);
    expect(mockPostsRepository.deletePosts).toHaveBeenCalledWith(
      samplePost.postId,
      samplePost.password
    );

    expect(deletedPost).toEqual({
      postId: samplePost.postId,
      nickname: samplePost.nickname,
      title: samplePost.title,
      content: samplePost.content,
      createdAt: samplePost.createdAt,
      updatedAt: samplePost.updatedAt,
    });
  });

  test("deletePost Method By Not Found Post Error", async () => {
    const samplePost = null;
    mockPostsRepository.findDetailPosts.mockReturnValue(samplePost);

    try {
      await postsService.deletePost(121312321, "1231231");
    } catch (err) {
      expect(mockPostsRepository.findDetailPosts).toHaveBeenCalledTimes(1);
      expect(mockPostsRepository.findDetailPosts).toHaveBeenCalledWith(
        121312321
      );

      expect(mockPostsRepository.deletePosts).toBeCalledTimes(0);

      expect(err.message).toEqual("존재하지 않는 게시글 입니다.");
    }
  });
});
