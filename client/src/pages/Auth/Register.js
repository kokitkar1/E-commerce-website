import React, { useState } from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast'
import "../../styles/AuthStyles.css";



const Register = () => {

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [phone,setPhone] = useState("")
    const [address,setAddress] = useState("")
    const [answer,setAnswer] = useState("")

    //for navigation 
    const navigate = useNavigate()


    // Form Function for enable Submit without refresh
    const handleSubmit =async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/auth/register',{name,email,password,phone,address,answer})
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
    <Layout title={"Register - E-wish"}>
        <div className="form-container" style={{ minHeight: "90vh" }}>

        <form onSubmit={handleSubmit}>
                    <h4 className='title'>Register Form</h4>
                
                    <div className="mb-3">
                        {/* <label htmlFor="exampleInputName" className="form-label">Name</label> */}
                        <input value={name} onChange={(e)=> setName(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" placeholder='Enter Your Name' required />
                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>

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
                        {/* <label htmlFor="exampleInputName" className="form-label">Phone</label> */}
                        <input value={phone} onChange={(e)=> setPhone(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" placeholder='Enter Your Phone' required />
                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>

                    <div className="mb-3">
                        {/* <label htmlFor="exampleInputName" className="form-label">Address</label> */}
                        <input value={address} onChange={(e)=> setAddress(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" placeholder='Enter Your Address' required />
                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>

                    <div className="mb-3">
                        {/* <label htmlFor="exampleInputName" className="form-label">Address</label> */}
                        <input value={answer} onChange={(e)=> setAnswer(e.target.value)} type="text" className="form-control" id="exampleInputEmail1" placeholder='Your Favorite Sport Name?' required />
                        {/* <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div> */}
                    </div>   

                    {/* <div className="mb-3 form-check">
                        <input onChange={(e)=> setName(e.target.value)} type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div> */}
                    <div className="mb-3">
                    <button  type="submit" className="btn btn-primary">REGISTER</button>
                    </div>

                    <div className="mb-3">
                    <p className="paragraph-text" >Do have Account <a href="/login">Login</a> </p>
                    </div>
                    
                </form>
        </div>
    </Layout>
  )
}

export default Register