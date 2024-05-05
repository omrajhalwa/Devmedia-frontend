import React from 'react'
import Avatar from 'react-avatar'
import { useDispatch, useSelector } from 'react-redux'
import { setSelecteduser } from '../redux/userSlice';








export default function OtherUser({user}) {


const dispatch=useDispatch();
const {onlineUsers}=useSelector(store=>store.user);
const isOnline=onlineUsers.includes((user)._id);
  const selectedUserHandler=(user)=>{
        dispatch(setSelecteduser(user));
  }

  return (
    <div onClick={()=>selectedUserHandler(user)} className='flex gap-2 items-center hover:bg-zinc-900 rounded-md m-1 p-4 cursor-pointer border border-zinc-900'>
          <div className={`avatar ${isOnline ? "online":""}`}>
            <div className='w-12 rounded-full'>
            <Avatar src={user?.profilePhoto} size="64" round={true} />
            </div>
          </div>
          <div className='flex flex-col'>
            <div className='flex justify-between items-center text-white'>
                <p>{user?.name}</p>
                <p className='text-sm text-zinc-400 p-1'>@{user?.username}</p>
            </div>
            <div><p>send a messages</p></div>
          </div>
    </div>
  )
}
