import React, { useState } from 'react'
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import Avatar from "react-avatar";
import { useSelector, useDispatch } from "react-redux";
import useGetProfile from '../hooks/useGetProfile';
import axios from 'axios';
import { followingUpdate } from '../redux/userSlice';
import { USER_API_END_POINT } from '../utils/constant';
import toast from "react-hot-toast"
import Tweet from './Tweet';
import ShowImages from './ShowImages';
import { MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import Education from './Education';


export default function Profile() {
    const [post,setPost]=useState(true);
    const { profile, user } = useSelector(store => store.user);
    const { id } = useParams();
    const { tweets } = useSelector(store => store.tweet);
    useGetProfile(id);

    const dispatch = useDispatch();
    const postHandler=(val)=>{
        setPost(val);

    }

    const followAndUnfollowHandler = async () => {
        try {
            if (user.following.includes(id)) {
                const res = await axios.post(`${USER_API_END_POINT}/unfollow/${id}`, { id: user?._id }, {
                    withCredentials: true
                });
                console.log(res);
                dispatch(followingUpdate(id));
                toast.success(res?.data?.message);
            } else {
                const res = await axios.post(`${USER_API_END_POINT}/follow/${id}`, { id: user?._id }, {
                    withCredentials: true
                });
                console.log(res);
                dispatch(followingUpdate(id));
                toast.success(res?.data?.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message);
            console.log(error);
        }
    }

    return (
        <div className='overflow-y-auto w-[100%] overflow-x-hidden'>
            <div>
                <div className='flex items-center py-2 '>
                    <Link to={"/"} className='p-2 rounded-full hover:bg-gray-800 cursor-pointer text-white'>
                        <IoChevronBackCircleOutline size={"32px"} />
                    </Link>
                    <div className='ml-2'>
                        <h1 className='font-bold text-white text-2xl'>{profile?.name}</h1>
                        <p className='text-gray-500 text-sm'>post</p>
                    </div>
                </div>

                <img src="https://png.pngtree.com/thumb_back/fh260/background/20200714/pngtree-modern-double-color-futuristic-neon-background-image_351866.jpg" alt="banner" />

                <div className=' my-2 ml-2 border-4 border-indigo-700 rounded-full w-32 h-32 '>

                    <img src={profile?.profilePhoto} alt="" className='w-full h-full rounded-full' />
                </div>

                <div className='text-right p-2'>
                    {
                        profile?._id === user?._id ? (
                            <Link to={"/editprofile"} className='px-4 py-1 rounded-full font-bold text-white hover:text-blue-500 border border-gray-500'>Edit Profile</Link>
                        ) : (
                            <button onClick={followAndUnfollowHandler} className='px-4 py-1 rounded-full font-bold text-white hover:text-blue-500 border border-gray-500'>{user.following.includes(id) ? "Following" : "Follow"}</button>
                        )
                    }
                </div>

                <div className='my-2 mx-2 rounded-md border border-gray-800 p-6'>
                    <h1 className='font-bold text-white text-2xl'>{profile?.name}</h1>
                    <p className='text-gray-500 text-sm'>@{profile?.username}</p>
                    <div>
                        <p className='text-white'>{profile?.description}</p>
                    </div>
                </div>


                <div className='m-2 border border-slate-800 p-2 rounded-md'>
                    <div className='flex justify-between'>
                    <h1 className='text-white text-xl m-1 font-bold'>About</h1>
                   
                    </div>
                    <div className='p-2 text-slate-300 font-semibold'>
                        <p className='text-white text-lg '>
                           {profile?.about}
                        </p>
                    </div>
                </div>

                <div className='m-2 border border-slate-950 p-2 rounded-md'>
                <div className='flex justify-between'>
                    <h1 className='text-white text-xl m-1 font-bold'>Education</h1>
                    <Link to={`/profile/education`}>  <IoMdAdd className='text-white m-1' size={"26px"} /> </Link>
                    </div> 
                    <div className='p-2 text-slate-300 font-semibold bg-slate-900'>
                        {
                            profile?.education?.map((edu)=> <Education edu={edu}/>)
                        }
                    </div>
                </div>

            
         
                <div className='p-2 border border-slate-800'>
                    <h1 className='text-white border-b border-slate-800 w-full font-bold p-2 m-4 text-xl'>All posts</h1>
                    <div className='p-2 border border-slate-800 m-2 rounded-md'>
                        <button onClick={()=>postHandler(true)} className={`px-4 py-2 text-white font-bold ${post ? "bg-blue-700":"bg-gray-700"} rounded-full m-2`}>Posts</button>
                        <button onClick={()=>postHandler(false)} className={`px-4 py-2 text-white font-bold ${post ? "bg-gray-700":"bg-blue-700"}  rounded-full m-2`}>Images</button>
                    </div>

                    { post===true ?
                        (
                    <div className='m-4 border border-slate-900 bg-slate-950 rounded-md'>
                        {
                            tweets && tweets?.map((tweet) => id === tweet?.userId ? <Tweet key={tweet?._id} tweet={tweet} /> : <></>)
                        }
                    </div>):(
                        <div className='m-4 border border-slate-900 bg-slate-950 rounded-md'>
                        {
                            tweets && tweets?.map((tweet) => id === tweet?.userId && tweet?.image ? <ShowImages key={tweet?._id} tweet={tweet} /> : <></>)
                        }
                         </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}
