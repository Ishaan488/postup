import {Post} from '../Models/Post.js'
export const posts=async (req,res)=>{
    const posts=await Post.find();
    const username=req.params.username;
    // const myPosts=await Post.find({username});
    const filteredPosts = posts
            .filter(post => post.username !== username) // filter out posts by username
            .reverse(); 
    // for(let i=0;i<posts.length;i++){
    //     if(posts[i].find({username})){
    //         posts.splice(i, 1);
    //     }
    // }
    res.json(filteredPosts);
}
