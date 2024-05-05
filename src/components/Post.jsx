import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getRefresh } from '../redux/tweetSlice';
import { CiImageOn } from "react-icons/ci";
import Avatar from "react-avatar"
import { TWEET_API_END_POINT } from '../utils/constant';
import { ImCross } from "react-icons/im";
import { setShowPost } from '../redux/userSlice';
import Tweet from './Tweet';
export default function Post({tweetId ,tweet}) {


const postRef=useRef();

const closeModal=(e)=>{
    if(e.target===postRef.current){
        dispatch(setShowPost());
    }
}

    
 
    const [file, setFile] = useState(null);
    const [description,setDescription]=useState("");
    const {user,selectedPost}=useSelector(store=>store.user);
    const {showPost}=useSelector(store=>store.user);
    const dispatch=useDispatch();
    const submitHandler = async () => {
        try {
          const formData = {
          'file': file,
          'description':description,
          'id': user?._id,
          'tweetId':selectedPost
          }
          console.log(tweetId);
          
      
          const res = await axios.post(`${TWEET_API_END_POINT}/create`,formData, {
            withCredentials: true,
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });
      console.log(res);
          if (res?.data?.success) {
            toast.success(res?.data?.message);
          }
          
          dispatch(getRefresh());
        } catch (error) {
          toast.error(error.response.data.message);
          console.error(error);
        }
      
        setDescription("");
      }


      const handleFileChange = (event) => {
    
        setFile(event.target.files[0]);
        
      };

      const showPostHandler=()=>{
        dispatch(setShowPost());
      }

  return (
    <div onClick={closeModal} ref={postRef} className='fixed inset-0 backdrop-blur-sm bg-opacity-30 flex flex-col justify-center items-center border border-solid border-black w-[100%] h-screen'>
     
        <div className='bg-black w-[50%] rounded-md flex flex-col'>

            <button onClick={showPostHandler} className='items-end ml-auto p-4'><ImCross /></button>
                <div className='flex items-center p-6'>
                    <div >
                    <Avatar src='https://pbs.twimg.com/profile_images/1642955178902188033/pS8Jyyfj_400x400.jpg' size="50" round={true} />
                    </div>
                    <input value={description} onChange={(e)=>setDescription(e.target.value)} className='outline-none border-none text-lg p-4 px-6 bg-black rounded-full w-full' type="text" placeholder='What is Happening ?' />
                </div>

                <div className='flex items-center justify-between border-b p-6 border-gray-800 '>
                        <div className='cursor-pointer w-8 hover:bg-indigo-950 h-8 rounded-full'>
                            <CiImageOn className='text-blue-600 z-10 ' size={'30px'} />
                            <input type="file" onChange={handleFileChange} className=' w-6 cursor-pointer relative bottom-7 opacity-5 ' />
                            
                        </div>
                        <button onClick={submitHandler}  className='bg-blue-600 hover:bg-blue-800 hover:text-gray-200 px-4 py-1 border-none rounded-full text-lg text-white'>Post</button>
                    </div>
         </div>
    </div>
  )
}
