import React, { useState } from 'react'
import Avatar from "react-avatar"
import toast from "react-hot-toast"
import axios from "axios"
import { CiImageOn } from "react-icons/ci";
import { useSelector, useDispatch } from "react-redux"
import { TWEET_API_END_POINT } from '../utils/constant';
import { getIsActive, getRefresh } from '../redux/tweetSlice';
export default function
    CreatePost() {
        const [file, setFile] = useState(null);
const [description,setDescription]=useState("");
const {user}=useSelector(store=>store.user);
const {isActive}=useSelector(store=>store.tweet);
const dispatch=useDispatch();
const submitHandler = async () => {
    try {
      const formData = {
      'file': file,
      'description':description,
      'id': user?._id
      }
      
  
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

const forYouHandler=()=>{
    dispatch(getIsActive(true));
}

const followingHandler=()=>{
    dispatch(getIsActive(false));
}

const handleFileChange = (event) => {
    
    setFile(event.target.files[0]);
    
  };

    return (
        <div className='w-[100%] bg-black'>
            <div className='  flex items-center justify-evenly border-b border-gray-800'>
                <div onClick={forYouHandler}  className={`${isActive ? "border-b-4 ":"text-gray-900 hover:bg-zinc-900"} border-blue-600 cursor-pointer w-full text-center px-4 py-2  `}>
                    <h1 className={`font-semibold ${isActive ? " text-white ":"text-gray-600" } text-2xl`}>For You</h1>
                </div>
                <div onClick={followingHandler}  className={`${!isActive ? "border-b-4 ":"hover:bg-zinc-900"} border-blue-600 cursor-pointer w-full text-center px-4 py-2`}>
                    <h1 className={`font-semibold ${!isActive ? " text-white ":"text-gray-600" } text-2xl`}>Following</h1>
                </div>
            </div>
                  
            
        </div>
    )
}
