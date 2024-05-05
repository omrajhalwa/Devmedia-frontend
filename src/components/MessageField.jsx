import React from 'react'
import { LuMessageSquarePlus } from "react-icons/lu";
import OtherUsers from './OtherUsers';
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";

export default function MessageField() {
  return (
    <div className='w-[35%] overflow-y-auto border-r border-zinc-900'>

      <div className='flex  items-center '>
        <Link to={"/"} className='p-2 rounded-full hover:bg-gray-800 cursor-pointer text-white'>
          <IoChevronBackCircleOutline size={"32px"} />
        </Link>
        <div className='flex justify-between w-full'>
          <div>
            <h1 className='font-bold text-2xl m-4 text-white'>Messages</h1>
          </div>
          <div>
            <LuMessageSquarePlus className="text-white m-4" size={"24px"} />
          </div>
        </div>
      </div>

      <div className=''>
        <OtherUsers />
      </div>
    </div>
  )
}
