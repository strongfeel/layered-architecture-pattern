import express from "express";
import { PostsController } from "../controllers/posts.controller.js";

const router = express.Router();

// PostsController의 인스턴스를 생성합니다.
const postsController = new PostsController();

/** 게시글 조회 API **/
router.get("/", postsController.getPosts);
/** 게시글 작성 API **/
router.post("/", postsController.createPost);

export default router;
