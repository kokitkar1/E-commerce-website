import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import userModel  from "../models/userModel.js";
import orderModel from "../models/orderModel.js";
import  JWT  from "jsonwebtoken";


//-------------------------  Register a new user || POST Method ------------------------------
export const registerController = async(req,res) =>
{
    try 
    {
        const {name,email,password,phone,address,answer} = req.body
        
        //validations
        if(!name){
            return res.send({error: 'Name is Required'})
        }
        if(!email){
            return res.send({message: 'email is Required'})
        }
        if(!password){
            return res.send({message: 'password is Required'})
        }
        if(!phone){
            return res.send({message: 'phone is Required'})
        }
        if(!address){
            return res.send({message: 'address is Required'})
        }
        if(!answer){
            return res.send({message: 'Answer is Required'})
        }


        //check user
        const existingUser = await userModel.findOne({email})

        //Existing user
        if(existingUser)
        {
            return res.status(200).send({
                success:false,
                message:'Already Register please login',
            })
        }

        //Register user
        const hashedPassword = await hashPassword(password);

        //Save
        const user = await new userModel({name,email,phone,address,password:hashedPassword,answer}).save()

        res.status(201).send({
            success:true,
            message: "User Register Successfully",
            user
        })

    } 
    catch (error) 
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error in Registration',
            error
        })
    }
};




//------------------ Login User || Post Method ---------------------------------
export const loginController = async (req,res) =>
{
    try 
    {
        const {email,password} = req.body;

        // Validation
        if(!email || !password){
            return res.status(404).send({
                success:false,
                message: 'Invalid email or Password',
            })
        }

        // Check user
        const user = await userModel.findOne({email})
        if(!user){
            return res.status(404).send({
                success:false,
                message: 'Email is not registered',
            })
        }

        // Compare Password
        const match = await comparePassword(password,user.password)
        if(!match){
            return res.status(200).send({
                success: false,
                message: 'Invalid Password'
            })
        }
        
        // Token
        const token = await JWT.sign({_id : user._id}, process.env.JWT_SECRET, {expiresIn: "1h"})

        res.status(200).send({
            success: true,
            message: "Login Successfully",
            user:{
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token,
        });
    }
    catch (error) 
    {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Error in login',
            error
        })
    }
};





//------------------ Forgot-PasswordController Route || POST Method  ------------------------------
export const forgotPasswordController = async (req,res)=>{
    try {
        const {email,answer,newPassword} = req.body;

        // validation for user enter
        if(!email){
            res.status(400).send({message: "Email is required"})
        }
        if(!answer){
            res.status(400).send({message: "Answer is required"})
        }
        if(!newPassword){
            res.status(400).send({message: "New Password is required"})
        }


        // Check email and answer if correct then only go for change the password
        const user = await userModel.findOne({email,answer})
        // validation for email and answer
        if(!user){
            return res.status(404).send({
                success: false,
                message: "Wrong Email or Answer!"
            })
        }

        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, {password: hashed});
        res.status(200).send({
            success: true,
            message: 'Password Reset Successfully',
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message: 'Something went wrong',
            error
        })
    }
}






//---------------------- Test Controller || GET method  -------------------------------
export const testController = (req,res) =>{
    try {
        res.send("Protected Routes");
    } catch (error) {
        console.log(error);
        res.send({ error});
    }
}




//--------------------------- Update Profile Controller  || PUT Method -------------------------
export const updateProfileController = async (req,res) =>{
    try {
        
        const {name,email,password,address, phone} = req.body;

        const user = await userModel.findById(req.user._id)

        // Check password
        if(password && password.length < 6){
            return res.json({error: 'Password is required and minimum 6 characters long'})
        }

        const hashedPassword = password ? await hashPassword(password) : undefined

        const updatedUser = await userModel.findByIdAndUpdate(req.user._id,
        {
            name: name || user.name,
            password: hashedPassword || user.password,
            phone: phone || user.phone,
            address: address || user.address,
        }, 
        {new:true})

        res.status(200).send({
            success: true,
            message: 'Profile Updated Successfully',
            updatedUser,
        })


    } catch (error) {
        console.log(error)
        res.status(400).send({
            success: false,
            message: 'Error While Updating Profile',
            error,
        })
    }
};



//------------------------------ Orders Controller || GET Method  ----------------------------------------

export const getOrdersController = async (req,res) =>{
    try {
        const orders = await orderModel.find({ buyer:req.user._id }).populate("products", "-photo").populate("buyer","name");
        res.json(orders);

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error While getting Orders',
            error,
        })
    }
};



//------------------------------ All Orders Controller || GET Method  ----------------------------------------

export const getAllOrdersController = async (req,res) =>{
    try {
        const orders = await orderModel.find({}).populate("products", "-photo").populate("buyer","name").sort({createdAt: "-1"});
        res.json(orders);

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error While getting Orders',
            error,
        })
    }
};




// -----------------------------Order Status Controller || PUT Method  ---------------------------------

export const orderStatusController = async (req,res) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;

        const orders = await orderModel.findByIdAndUpdate(
            orderId,
            {status},
            {new: true}
        );
        res.json(orders); 



    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'Error While Updating Order',
            error,
        })
    }
}
