import express from "express";
import {posts} from '../Controllers/posts.js'
import {createPost} from '../Controllers/createPost.js'
import { myPosts } from "../Controllers/myPosts.js";
import authenticateToken from "../Middleware/authenticateToken.js";
import { userDetails } from "../Controllers/userDetails.js";


const router=express.Router();

router.post('/:username/home/createPost',createPost);
router.get('/:username/home/posts',authenticateToken,posts);
router.get('/:username/home/myPosts',myPosts);
router.get('/:username/home/userDetails',userDetails);

export default router;