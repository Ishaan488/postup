import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import authRoutes from './Routes/auth.js'

const app=express();
app.use(express.json());

app.use('/api',authRoutes);

app.get('/',(req,res)=>{});

mongoose.connect(`${process.env.connectionString}`,{dbName:"postup"})
.then(()=>{console.log("MongoDB Connected")})
.catch((error)=>{console.log(error)});

const port=3000;
app.listen(port,(req,res)=>{console.log(`Server is running on port ${port}`)});