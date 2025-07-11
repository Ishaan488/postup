import express from "express";
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { Post } from "../Models/Post.js";


export const createPost =  async (req, res) => {
    // const storage = multer.diskStorage({
    //     destination: '../public/uploads',
    //     filename: function (req, file, cb) {
    //         const uniqueSuffix = Date.now() + path.extname(file.originalname);
    //         cb(null, file.fieldname + '-' + uniqueSuffix)
    //     }
    // })
    
    // const upload = multer({ storage: storage })
    try{

        const { titleContent, textContent, imageContent } = req.body;
        const username=req.params.username;
        const cloudinaryRes=await cloudinary.uploader.upload(imageContent,{
          folder:"/postup/postup_Posts"
        })
        console.log(cloudinaryRes);
        await Post.create({
            username,
            titleContent,
            textContent,
            imageContent:cloudinaryRes.secure_url
        })
        res.json({
            message:"Post created successfully",
            post:{Post}
        })
    }
    catch(error){
        res.json(error);
    }
    // upload.single('imageContent');
}
