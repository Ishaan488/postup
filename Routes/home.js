import express from "express";
import {posts} from '../Controllers/posts.js'
import {createPost} from '../Controllers/createPost.js'
import { myPosts } from "../Controllers/myPosts.js";


const router=express.Router();

router.post('/:username/home/createPost',createPost);
router.get('/:username/home/posts',posts);
router.get('/:username/home/myPosts',myPosts);

export default router;