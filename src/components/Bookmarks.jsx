import React from 'react'
import { useSelector } from 'react-redux'
import Tweet from './Tweet';
import useGetProfile from '../hooks/useGetProfile';
import { IoChevronBackCircleOutline } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
export default function Bookmarks() {

    const { user, profile } = useSelector(store => store.user);
    useGetProfile(user?._id);
    return (
        <div className='w-full overflow-y-auto'>

            <div className='flex items-center py-2 m-2 border-b-2 border-slate-900'>
                <Link to={"/"} className='p-2 rounded-full hover:bg-gray-800 cursor-pointer text-white'>
                    <IoChevronBackCircleOutline size={"32px"} />
                </Link>
                <div className='ml-2'>
                    <h1 className='font-bold text-white text-2xl'>Bookmarks</h1>
                    
                </div>
            </div>
            {
                profile?.bookmarks?.map((tweet) => <Tweet key={tweet?._id} tweet={tweet} />)
            }
        </div>
    )
}
