import { Post } from "../Models/Post.js";

export const myPosts=async (req,res)=>{
    const username=req.params.username;
    const myPosts=await Post.find({username});
    res.json(myPosts);
}