import mongoose from "mongoose";

const postSchema= new mongoose.Schema({
    username:{type:String},
    titleContent:{type:String,require:true},
    textContent:{type:String,require:true},
    imageContent:{type:String},
    likeCount:{type:Number},
    dislikeCount:{type:Number},
    postedAt:{type:String, default: new Date().toLocaleString()},
})

export const Post =mongoose.model("post",postSchema);