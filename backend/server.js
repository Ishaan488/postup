import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import multer from 'multer';
import cors from 'cors'
import { v2 as cloudinary } from 'cloudinary';
import authRoutes from './Routes/auth.js'
import homeRoutes from './Routes/home.js'
import cookieParser from 'cookie-parser'

const app=express();
app.use(express.json({limit:'10mb'}));
app.use(cors({origin:"http://127.0.0.1:3000",
    credentials: true}));
app.use(cookieParser());

cloudinary.config({ 
        cloud_name: `${process.env.cloud_name}`, 
        api_key: `${process.env.api_key}`, 
        api_secret: `${process.env.api_secret}` // Click 'View API Keys' above to copy your API secret
    });

app.use('/api',authRoutes);
app.use('/api',homeRoutes);

app.get('/',(req,res)=>{});

mongoose.connect(`${process.env.connectionString}`,{dbName:"postup"})
.then(()=>{console.log("MongoDB Connected")})
.catch((error)=>{console.log(error)});

const port=5000;
app.listen(port,(req,res)=>{console.log(`Server is running on port ${port}`)});