import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import "../../styles/AuthStyles.css";
import { useAuth } from "../../context/auth";

const Login = () => {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const [auth, setAuth] = useAuth()

    //for navigation 
    const navigate = useNavigate()

    //for redirection -- use location
    const location = useLocation()

    // Form Function for enable Submit without refresh
    const handleSubmit =async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/login',{email,password})
            if(res && res.data.success){
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                })
                localStorage.setItem('auth',JSON.stringify(res.data))
                navigate( location.state || "/"); //In Spinner file we create one additional state property and check before login 
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }


  return (
    <Layout title={"Login - Ecommerce App"}>
        <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
                    <h4 className="title">Login</h4>

                    <div className="mb-3">
                        {/* <label htmlFor="exampleInputName" className="form-label">Email</label> */}
                        <input value={email} onChange={(e)=> setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" placeholder='Enter Your Email' required />
                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>

                    <div className="mb-3">
                        {/* <label htmlFor="exampleInputPassword1" className="form-label">Password</label> */}
                        <input value={password} onChange={(e)=> setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter Your Password' required />
                    </div>
                    
                    <div className="mb-3">
                    <button type="button" className="btn btn-primary" onClick={()=>{navigate ("/forgot-password")}}>Forgot Password</button>
                    </div>

                    <button type="submit" className="btn btn-primary">LOGIN</button>
                </form>
        </div>
    </Layout>
  )
}

export default Login