import React from 'react'
import { useSelector } from 'react-redux'
import SendInput from './SendInput';
import Messages from './Messages';

export default function MessageContainer() {
  const { selectedUser,onlineUsers } = useSelector(store => store.user);
  

  return (

    <>
      {
        selectedUser ? (
          <div className=' w-[50%] flex flex-col '>
            <div className='border-b border-zinc-700 flex items-center  mx-2 py-4'>
              <div className='avatar '>
                <div className='w-12 rounded-full'>
                <img src={selectedUser?.profilePhoto} className='w-12 rounded-full' alt="banner" />
                </div>
              </div>
              <div className='flex flex-col mx-4'>
                <div className='flex justify-between gap-2'>
                  <p className='text-white font-bold'>{selectedUser?.name}</p>
                </div>
                <div className='text-indigo-400 font-semibold '><p>{onlineUsers.includes(selectedUser?._id)? "online":" "}</p></div>
              </div>
            </div>
             <Messages/>
            <SendInput/>
          </div>
        ) : (
          <div className='flex justify-center items-center p-8 w-[50%]'>
            <h1 className='text-white font-bold text-4xl text-orange-500'>Let's Start the Conversation</h1>
          </div>
        )
      }

    </>

  )
}
