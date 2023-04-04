import express from "express";
import { forgotPasswordController, loginController, registerController, testController } from "../controllers/authController.js"
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

//Router object
const router = express.Router();


//Routing

//1. Register || POST Method
router.post('/register', registerController)

//2. Login  || POST Method
router.post('/login', loginController)

//3. Forgot Password || Post Method
router.post('/forgot-password', forgotPasswordController)

//4. Test Routes || GET Method
router.get('/test',requireSignIn,isAdmin, testController)

//5. Protected Route for USER || GET Method
router.get("/user-auth", requireSignIn, (req,res) =>{
    res.status(200).send({ok: true})
})

//5. Protected Route for ADMIN|| GET Method
router.get("/admin-auth", requireSignIn, isAdmin, (req,res) =>{
    res.status(200).send({ok: true})
})

export default router
