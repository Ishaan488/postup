import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import authRoutes from './Routes/auth.js'
import homeRoutes from './Routes/home.js'

const app=express();
app.use(express.json());

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

const port=3000;
app.listen(port,(req,res)=>{console.log(`Server is running on port ${port}`)});