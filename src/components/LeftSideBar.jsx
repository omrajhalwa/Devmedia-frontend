import React from 'react'
import { CiHome } from "react-icons/ci";
import { MdExplore } from "react-icons/md";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { FaRegBookmark } from "react-icons/fa";
import {useSelector,useDispatch} from "react-redux";
import axios from "axios";
import { USER_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast"
import { MdMessage } from "react-icons/md";

import {useNavigate} from "react-router-dom"
import { getMyProfile, getOtherUsers, getUser, setAllUser, setSelecteduser, setShowPost } from '../redux/userSlice';
import { getAllTweets } from '../redux/tweetSlice';
import { setMessages } from '../redux/messageSlice';

import Post from './Post';


export default function LeftSideBar() {

const {user}=useSelector(store=>store.user);

const navigate = useNavigate();
const dispatch=useDispatch();
const logoutHandler = async()=>{
  try {
    const res =  await axios.get(`${USER_API_END_POINT}/logout`);
    console.log(res);
    toast.success(res.data.message);
    navigate("/login");
    dispatch(getUser(null));
    dispatch(getOtherUsers(null));
    dispatch(getMyProfile(null));
    dispatch(getAllTweets(null));
    dispatch(setSelecteduser(null));
    dispatch(setAllUser(null));
    dispatch(setMessages(null));

  } catch (error) {
    console.log(error);
  }
}


const {showPost}=useSelector(store=>store.user);
const currentPath = window.location.pathname;

  return (
    <div className='w-[25%]   border border-r-2 border-l-0 border-b-0 border-t-0 border-solid border-gray-800 px-3 '>
        <div className='my-6 text-4xl text-white  font-extrabold' >
            DEVMEDIA
        </div>
        {
        showPost && <Post/>
        }
        <div className='my-6 mt-10'>
             <Link to={"/"} className={`flex my-3  ${currentPath.includes("/") && currentPath.length==1 ? "border border-blue-600 ":""} text-white  px-2 py-4 items-center rounded-full hover:bg-zinc-900  hover:font-bold hover:cursor-pointer `}>
             <CiHome className={`mx-2 hover:text-2xl ${currentPath.includes("/") && currentPath.length==1 ? "text-blue-500  ":""}`} size={"34px"} />
                <h1 className={` font-semibold  hover:text-2xl ${currentPath.includes("/") && currentPath.length==1 ? "text-blue-500 text-2xl":"text-xl"}`}>Home</h1>
             </Link>
             <Link to={"/bookmarks"} className={`flex my-3  ${currentPath.includes("/bookmarks")  ? "border border-blue-600 ":""} text-white  px-2 py-4 items-center rounded-full hover:bg-zinc-900  hover:font-bold hover:cursor-pointer `}>
             <FaRegBookmark className={`mx-2 hover:text-2xl ${currentPath.includes("/bookmarks") ? "text-blue-500  ":""}`} size={"30px"}/>
                <h1 className={` font-semibold  hover:text-2xl ${currentPath.includes("/bookmarks")  ? "text-blue-500 text-2xl":"text-xl"}`}>Bookmarks</h1>
             </Link>
             <div className='flex my-3 text-white  px-2 py-4 items-center rounded-full hover:bg-zinc-900  hover:font-bold hover:cursor-pointer'>
             <IoIosNotificationsOutline className='mx-2 hover:text-2xl'  size={"34px"}/>
                <h1 className=' font-semibold text-xl hover:text-2xl'>Notification</h1>
             </div>

             <Link to={"/messages"} className={`flex w-[80%] my-3 ${currentPath==="/messages" ? "border border-blue-600 ":""} text-white  px-2 py-4 items-center rounded-full hover:bg-zinc-900  hover:font-bold hover:cursor-pointer `}>
             <MdMessage  className={`mx-2 hover:text-2xl ${currentPath==="/messages" ? "text-blue-500 ":""}`}  size={"34px"}/>
                <h1 className={` font-semibold  hover:text-2xl ${currentPath==="/messages" ? "text-blue-500 text-2xl":"text-xl"}`}>Messages</h1>
             </Link>

             <Link to={`/profile/${user?._id}`} className={`flex my-3 ${currentPath.includes("/profile") ? "border border-blue-600 ":""} text-white  px-2 py-4 items-center rounded-full hover:bg-zinc-900  hover:font-boldhover:cursor-pointer `}>
             <CgProfile className={`mx-2 hover:text-2xl ${currentPath.includes("/profile") ? "text-blue-500 ":""}`}size={"34px"}/>
                <h1 className={` font-semibold  hover:text-2xl ${currentPath.includes("/profile") ? "text-blue-500 text-2xl":"text-xl"}`}>Profile</h1>
             </Link>
             <div onClick={logoutHandler}  className='flex my-3 text-white  px-2 py-4 items-center rounded-full hover:bg-zinc-900  hover:cursor-pointer'>
             <FiLogOut  className='mx-2 hover:text-2xl' size={"32px"}/>
                <h1 className='font-semibold text-xl hover:text-2xl'>Logout</h1>
             </div>

            
        </div>
      {
      currentPath!=="/messages" &&  <button 
                     onClick={()=>dispatch(setShowPost())} 
                      className='bg-blue-600 text-white font-bold text-lg px-6 py-2 rounded-full ml-6'>Post</button>
      } 
    </div>
  )
}
