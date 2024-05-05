import React, { useState } from 'react'
import Avatar from 'react-avatar'
import { FaRegComment } from "react-icons/fa";
import { FcLike } from "react-icons/fc";
import { CiBookmark } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from 'react-redux';
import { COMMENT_API_END_POINT, TWEET_API_END_POINT } from '../utils/constant';
import axios from "axios"
import { getRefresh } from '../redux/tweetSlice';
import toast from 'react-hot-toast';

import { useNavigate ,Link} from 'react-router-dom';
import Post from './Post';
import { setSelectedPost, setShowPost } from '../redux/userSlice';
import { FaReply } from "react-icons/fa";

export default function Tweet({ tweet }) {

    const [commentToggle, setCommentToggle] = useState(false);
    const { user } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const [description,setDescription]=useState("");
    const navigate=useNavigate();
    const {showPost}=useSelector(store=>store.user);
     
    const addCommentHandler= async()=>{
        const userId=user?._id;
        const tweetId=tweet?._id;
        if(description===""){
            toast.error("please validate input field");
            return;
        }

        try {
            const res= await axios.post(`${TWEET_API_END_POINT}/create/`,{description,id:userId,tweetId}, {
                headers:{
                    "Content-Type":"application/json"
                  },
                  withCredentials:true
            });
            console.log(res);
            setDescription("");
            dispatch(getRefresh());
        } catch (error) {
            console.log(error);
        }
    }

    const likeOrDislikeHandler = async (id) => {
        try {
            const res = await axios.put(`${TWEET_API_END_POINT}/like/${id}`, { id: user?._id }, {
                headers:{
                    "Content-Type":"application/json"
                  },
                  withCredentials:true
            })
            dispatch(getRefresh());
        } catch (error) {
            console.log(error);
        }
    }

    const bookmarkHandler = async (id) => {
        try {
            const res = await axios.put(`${TWEET_API_END_POINT}/bookmark/${id}`, { id: user?._id }, {
                headers:{
                    "Content-Type":"application/json"
                  },
                  withCredentials:true
            })
            toast.success(res?.data?.message);
            dispatch(getRefresh());
        } catch (error) {
            console.log(error);
        }
    }

    const deleteTweetHandler = async (id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.delete(`${TWEET_API_END_POINT}/delete/${id}`);
            console.log(res);
            dispatch(getRefresh());
            toast.success(res?.data?.message);
        } catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }

    const [tweetId,setTweetId]=useState(null);
   const settweetidHandler=(tweet)=>{
    dispatch(setSelectedPost(tweet?._id))
    dispatch(setShowPost())
   }
   

    return (
        <div className='border-2 border-gray-800 m-2 rounded-2xl bg-black '  >

        { tweet?.repliedto && <div className='m-4 flex '><Link to={`/posts/${tweet?.repliedto}`} onClick={()=>dispatch(getRefresh())}> <FaReply size={"20px"} /> Replied</Link></div> 
        }
            <div>
                <div className='flex p-4'>
                    <Avatar src={tweet.userDetails[0]?.profilePhoto} size="50" round={true} className='m-2' />
                    <div className='ml-2 w-full'>
                        <div className='flex items-center ml-2'>
                            <h1 className='font-bold text-white text-lg py-2'>{tweet.userDetails[0].name}</h1>
                            <p className='text-gray-500 text-sm ml-1'>@{tweet.userDetails[0].username}</p>
                        </div>
                        <Link to={`/posts/${tweet?._id}`} onClick={()=>dispatch(getRefresh())} >
                        <div className='py-2' >
                            <p className='text-white'>{`${tweet.description}`}</p>
                        </div>

                        <div className='rounded-full m-6 w-62  ' >
                            <img src={tweet?.image} className='object-cover w-full h-full inset-0 rounded-2xl' />
                        </div>
                        </Link>

                        <div className='flex justify-between my-3'>
                            <div className='flex items-center' >
                              <Link >  <div onClick={() => settweetidHandler(tweet)}  className='p-2 hover:bg-blue-600 hover:text-black cursor-pointer rounded-full'>
                                <FaReply size={"20px"} />
                                </div></Link>

                            </div>
                            <div className='flex items-center'>
                                <div onClick={() => likeOrDislikeHandler(tweet?._id)} className='p-2 hover:bg-pink-900 hover:text-black cursor-pointer rounded-full'>
                                    <FcLike size={"20px"} />
                                </div>
                                <p>{tweet?.like?.length}</p>
                            </div>
                            <div className='flex items-center'>
                                <div onClick={() => bookmarkHandler(tweet?._id)} className={`p-2 hover:bg-yellow-400 ${tweet?.bookmark?.includes(user?._id) ? "bg-yellow-300 text-black":""} hover:text-black cursor-pointer rounded-full`}>
                                    <CiBookmark size={"20px"}  />
                                </div>
                               
                            </div>
                            {

                                user?._id === tweet?.userId ? (
                                    <div onClick={() => deleteTweetHandler(tweet?._id)} className='flex items-center'>
                                        <div className='p-2 hover:bg-zinc-600 hover:text-black cursor-pointer rounded-full'>
                                            <MdDelete size={"20px"} />
                                        </div>

                                    </div>
                                ) :
                                    (
                                        <>
                                        </>
                                    )
                            }


                        </div>
                    </div>

                </div>
               
            </div>
            {   
               showPost && <Post tweetId={tweetId} tweet={tweet}/>
                // <div className='w-full items-center flex flex-col'>

                //     <textarea type="text"
                //         value={description}
                //         onChange={(e) => setDescription(e.target.value)}
                //         className=' m-2 w-[80%] rounded-md text-white border-2 border-indigo-700 p-4'
                //         placeholder='Add you views' />
                //     <div className='m-2 mr-auto ml-14'>
                //         <button className='bg-blue-500 py-1 px-2  text-sm rounded-full text-white m-1' onClick={addCommentHandler} > Add Comment</button>
                //         <button className='bg-blue-500 py-1 px-2  text-sm rounded-full text-white m-1'>Cancel</button>
                //     </div>
                //     <h1 className='text-white font-bold text-2xl'>Replys</h1>
                // </div>

      
            }
            {
                //   tweet?.comments?.map((tweet) => {
                //     return <Tweet key={tweet?._id}  tweet={tweet} />
                // })
            }

        </div>
    )
}
