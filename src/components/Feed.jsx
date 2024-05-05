import React, { useState } from 'react'
import CreatePost from './CreatePost'
import Tweet from './Tweet'
import { useSelector } from 'react-redux'



export default function Feed() {
  const {tweets}=useSelector(store=>store.tweet);
  
 
  return (
    <div className='w-[100%] overflow-y-auto bg-zinc-900'>
      
      <CreatePost/>
      
    
      {
        tweets && tweets?.map((tweet)=><Tweet key={tweet?._id} tweet={tweet}/>)
      }
    
    </div>
  )
}
