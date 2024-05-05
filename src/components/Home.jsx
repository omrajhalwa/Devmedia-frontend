import React, { useEffect } from 'react'
import LeftSideBar from './LeftSideBar'
import RightSideBar from './RightSideBar'
import { Outlet, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import useGetMyTweet from '../hooks/useGetMyTweet'
import useOtherUser from '../hooks/useOtherUser'
export default function Home() {

  const {user,otherUsers}=useSelector(store=>store.user);
  const navigate=useNavigate();

  useEffect(()=>{
    if(!user){
      navigate("/login")
    }
  },[user])
  useOtherUser(user?._id);
  useGetMyTweet(user?._id);
  return (
    <div className='flex justify-between  h-screen  w-[90%] mx-auto'>
        <LeftSideBar/>
        <Outlet/>
        
        <RightSideBar otherUsers={otherUsers}/>
    </div>
  )
}
