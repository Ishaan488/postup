import {Post} from '../Models/Post.js'
export const posts=async (req,res)=>{
    const posts=await Post.find();
    res.json(posts);
}
