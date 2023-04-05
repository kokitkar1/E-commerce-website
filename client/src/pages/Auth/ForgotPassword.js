import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";



const ForgotPassword = () => {

    const [email,setEmail] = useState("")
    const [newPassword,setNewPassword] = useState("")
    const [answer,setAnswer] = useState("")


    //for navigation 
    const navigate = useNavigate()

    // Form Function for enable Submit without refresh
    const handleSubmit =async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/forgot-password',{email,newPassword,answer})
            if(res && res.data.success){
                toast.success(res.data && res.data.message);

                navigate("/login");  
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }




  return (
    <Layout title={"Forgot Password - E-Wish"}>
        <div className="form-container" style={{ minHeight: "80vh" }}>
        <form onSubmit={handleSubmit}>
                    <h4 className="title">RESET PASSWORD</h4>

                    <div className="mb-3">
                        {/* <label htmlFor="exampleInputName" className="form-label">Email</label> */}
                        <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" placeholder='Enter Your Email' required />
                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>

                    <div className="mb-3">
                        {/* <label htmlFor="exampleInputName" className="form-label">Email</label> */}
                        <input value={answer} onChange={(e)=> setAnswer(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" placeholder='Enter Your Favorite Sport Name' required />
                    </div>

                    <div className="mb-3">
                        {/* <label htmlFor="exampleInputPassword1" className="form-label">Password</label> */}
                        <input value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter Your New Password' required />
                    </div>

                    <button type="submit" className="btn btn-primary">RESET</button>
                </form>
        </div>
    </Layout>
  )
}

export default ForgotPassword