import React from 'react'
import useGetMessages from '../hooks/useGetMessages'
import Message from './Message';
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

export default function Messages() {

    useGetMessages();
    useGetRealTimeMessage();

    const {message}=useSelector(store=>store.message);
  return (
    <div className='px-4 flex-1 overflow-y-auto py-4'>

        {
            message && message?.map((message)=>{
                return (
                    <Message key={message?._id} message={message}/>
                )
            })
        }
        
    </div>
  )
}
