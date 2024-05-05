import React, { useState } from 'react'
import axios from "axios";
import toast from "react-hot-toast"
import {USER_API_END_POINT} from "../utils/constant.js";
import {useNavigate} from "react-router-dom"

import {useDispatch} from "react-redux";
import { getUser } from '../redux/userSlice.js';
export default function Login() {

const [isLogin,setIsLogin]=useState(true);
const [name,setName]=useState("");
const [username,setUsername]=useState("");
const [email,setEmail]=useState("");
const [password,setPassword]=useState("");

const navigate=useNavigate();
const dispatch=useDispatch();
const loginSignupHandler=()=>{

    setIsLogin(!isLogin);
}

const submitHandler= async(e)=>{
  e.preventDefault();

  if(isLogin){
      try {
        const res= await axios.post(`${USER_API_END_POINT}/login`,{email,password},{
          headers:{
            'Content-Type':"application/json"
          },
          withCredentials:true
        });
        console.log(res);
        if(res.data.success){
          navigate("/");
          toast.success(res.data.message);
        }
        dispatch(getUser(res?.data?.user));
      } catch (error) {
        console.log(error);
      }

  }else{
    try {
      const res= await axios.post(`${USER_API_END_POINT}/register`,{name,username,email,password},{
        headers:{
          'Content-Type':"application/json"
        },
        withCredentials:true
      });

     
      console.log(res);
      if(res.data.success){
        setIsLogin(true);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.success(error.response.data.message);
      console.log(error);
    }
  }
}

  return (
    <div>
        <div className='w-screen h-screen flex justify-center items-center' >
           <div className='flex items-center justify-evenly w-[80%]' >
               <div>
                  <h1 className='font-bold text-8xl text-white'>DevMedia</h1>
               </div>
               <div className='flex flex-col items-center '>  
                <h1 className='text-white text-5xl font-bold'>Let 's   Start</h1>

                <div className='mt-10' ><p className='text-white text-3xl font-semibold'>{!isLogin ? "Signup":"Login"}</p></div>
                    <form action=" " className='flex flex-col my-2 ' onSubmit={submitHandler}>


                        {

                            !isLogin && (<>
                            
                            <input 
                            value={name} 
                            onChange={(e)=> setName(e.target.value)}
                        type="text"
                        className='my-1 outline-blue-500 border border-gray-800 px-3 py-1 rounded-full bg-gray-1000 font-semibold input input-bordered input-info w-full max-w-xs'
                        placeholder='Name' required />
                         <input 
                         value={username}
                         onChange={(e)=> setUsername(e.target.value)}
                        type="text"
                         className='my-1 outline-blue-500 border border-gray-800 px-3 py-1 rounded-full bg-gray-1000 font-semibold input input-bordered input-info w-full max-w-xs'
                        placeholder='username' required />
                            </>

                            )
                        }
                       
                         <input 
                         value={email}
                         onChange={(e)=> setEmail(e.target.value)}
                        type="text"
                        className='my-1 outline-blue-500 border border-gray-800 px-3 py-1 rounded-full bg-gray-1000 font-semibold input input-bordered input-info w-full max-w-xs'
                        placeholder='email' required />
                         <input 
                         value={password}
                         onChange={(e)=> setPassword(e.target.value)}
                        type="password"
                        className='my-1 outline-blue-500 border border-gray-800 px-3 py-1 rounded-full bg-gray-1000 font-semibold input input-bordered input-info w-full max-w-xs'
                        placeholder='password' required />
                      <button type='submit' className='my-6 text-blue-500 py-2 px-5 border border-solid rounded-full hover:text-blue-900' >{!isLogin ? "Signup":"Login"}</button>
                      <h1>{isLogin ? "Do not have an account ?":"Already have an account"} <span onClick={loginSignupHandler} className='text-blue-500 hover:text-blue-900 cursor-pointer'>{isLogin ? "Signup":"Login"}</span></h1>
                    </form>
               </div>
           </div>
        </div>
    </div>
  )
}
