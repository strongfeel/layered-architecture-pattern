import express from "express";
import { PostsController } from "../controllers/posts.controller";

const router = express.Router();

const postsController = new PostsController(); // PostsController 를 인스턴스화 시킨다.

// 게시글 생성 API
router.post("/posts", postsController.createPosts);

// 게시글 조회 API
router.get("/posts", postsController.getPosts);

export default router;
