import express from "express";
import {feed} from '../Controllers/feed.js'
import {createPost} from '../Controllers/createPost.js'
import { myPosts } from "../Controllers/myPosts.js";

const router=express.Router();

router.post('/:username/home/createPost',createPost);
router.get('/:username/home/feed',feed);
router.get('/:username/home/myPosts',myPosts);

export default router;