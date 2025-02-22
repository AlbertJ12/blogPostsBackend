import express from "express";
import {getBlogPosts, getBlogPostById, postBlogPost, deleteBlogPost, deleteAllBlogPosts, putBlogPost } from "../controllers/blog.controller.js";

const router = express.Router();

router.get("/", getBlogPosts);
router.get("/:id", getBlogPostById);

router.post("/", postBlogPost);

router.delete("/:id", deleteBlogPost);
router.delete("/", deleteAllBlogPosts);

router.put("/:id", putBlogPost);

export default router;