import React from 'react'
import { useSelector } from 'react-redux'

export default function Message({message}) {

    const {user}=useSelector(store=>store.user);
    const {selectedUser}=useSelector(store=>store.user);

    return (
        <div className={`chat ${user?._id===message?.senderId ? " chat-start": "chat-end "}`}>
            <div>
                <div>
                    <img src={`${user?._id===message?.senderId ?  user?.profilePhoto: selectedUser?.profilePhoto}`} className='w-12 rounded-full' alt="banner" />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs opacity-50 text-white">12:45</time>
            </div>
            <div className={`chat-bubble bg-zinc-800 ${user?._id===message?.senderId ? "bg-indigo-600": ""} text-white`}>{message?.message}</div>
            <div className="chat-footer opacity-50">
            </div>
        </div>
    )
}
