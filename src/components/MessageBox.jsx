import React from 'react'
import MessageField from './MessageField'
import MessageContainer from './MessageContainer'
import LeftSideBar from './LeftSideBar'

export default function MessageBox() {
  return (
    <div className='flex overflow-x-auto w-[90%] mx-auto h-screen '>
        <LeftSideBar/>
        <MessageField/>
        <MessageContainer/>
    </div>
  )
}
