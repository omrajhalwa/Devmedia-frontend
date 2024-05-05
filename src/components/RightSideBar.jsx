import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import Avatar from 'react-avatar';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion"
import OtherUsers from './OtherUsers';
import { MdKeyboardDoubleArrowUp } from "react-icons/md";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
export default function RightSideBar({ otherUsers }) {


  const customStyle = {
    backgroundColor: "#0F0F19",
    
    // Add more CSS properties as needed
  };
 
  const [flag,setFlag]=useState(false);

  const toggleHandler=()=>{
    setFlag(!flag);
  }

  return (
    <div className=' w-[60%]  border border-r-0 border-l-3 border-b-0 border-t-0 border-solid border-gray-800'>
     
      <div className='p-2 flex rounded-full items-center justify-center outline-none w-full mt-3' >
        <div><FaSearch size={"30px"} className='mx-2' /></div>
        <input
          type="text"
          className='grow bg-transparent outline-none px-2 rounded-full input input-bordered input-info w-full max-w-xs'
          placeholder={`Search`} />

      </div>


      <div style={customStyle} className='w-160 p-4 rounded-2xl  my-4 border-4 border-zinc-800 m-12 flex flex-col items-center ' >
        <h1 className='font-bold text-lg text-white mb-4 '>Who To Follow</h1>

        {
          otherUsers?.map((user) => {
            return (
              <div className='flex items-center justify-between my-3'>
                <div className='flex '>
                  <Avatar src={user?.profilePhoto} size="50" round={true} />
                  <div className='mx-4'>
                    <h1 className='font-bold text-white'>{user?.name}</h1>
                    <p className='text-sm'>@{user?.username}</p>
                  </div>
                </div>
                <div>
                  <Link to={`/profile/${user?._id}`}>
                  <button className='bg-white text-black px-3 mx-1 py-2 rounded-full font-semibold hover:bg-slate-400'>Profile</button>
                  </Link>
                </div>
              </div>
            )
          })
        }










      </div>

      <motion.div onClick={toggleHandler} className=' sidebar-b  border border-slate-700 absolute bottom-0 overflow-y-auto mx-6 rounded-t-md bg-black'
      animate={{width:"25%" ,height:`${flag ? "500px":"60px"}`}}
      
      >
         <div className='flex justify-between items-center border-b border-slate-600  p-3 rounded-md'><p className='font-bold text-2xl text-white'>messages</p>{flag ? <MdKeyboardDoubleArrowDown className='text-white text-2xl'/>: <MdKeyboardDoubleArrowUp className='text-white text-2xl' />} </div>
        
        {
          flag && <OtherUsers/>
        } 
      </motion.div>
    </div>
  )
}
