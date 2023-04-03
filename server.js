// for use this syntax remove type=module from package.json file  103.250.45.151/32
// const express = require('express');
// const colors = require('colors')


import  express  from "express";
import  color  from "colors";
import dotenv from "dotenv"
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js"
import categoryRoutes from './routes/categoryRoutes.js'
import cors from "cors"
import productRoutes from './routes/productRoutes.js'

//Configure .env file
dotenv.config();

//Database Config
connectDB();

// Rest Object
const app = express();

//Middleware
app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

//routes
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes)

// Rest API
app.get('/' , (req,res)=>{
    res.send("<h1> welcome to ecom app </h1>")
})

// PORT
const PORT = process.env.PORT;

// PORT listen 
app.listen(PORT , ()=>{
    console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.black)
})


