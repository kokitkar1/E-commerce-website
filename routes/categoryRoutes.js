import express from "express";
import {isAdmin, requireSignIn} from './../middlewares/authMiddleware.js'
// import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js";
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "./../controllers/categoryController.js";


const router = express.Router()


// Route

// 1. For create Category
router.post('/create-category', requireSignIn,isAdmin, createCategoryController)


// 2. For Update Category
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryController)


// 3. getAll Category
router.get('/get-category', categoryController)

// 4. get only one category
router.get('/single-category/:slug', singleCategoryController)

// 5. Delete Category
router.delete('/delete-category/:id', requireSignIn, isAdmin, deleteCategoryController )





export default router