import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { IoChevronBackCircleOutline } from "react-icons/io5";
import Tweet from './Tweet';
import { useDispatch, useSelector } from 'react-redux';
import { getRefresh } from '../redux/tweetSlice';


export default function PostHeader() {
    const currentPath = window.location.pathname;
       const dispatch=useDispatch();
       

    console.log(currentPath);

    const originalString = currentPath;
    const substringToRemove = "/posts/";

    // Create a regular expression to match the substring globally
    const regex = new RegExp(substringToRemove, "g");

    // Remove the substring from the original string
    const remainingString = originalString.replace(regex, '');
    const tweetId = remainingString;


    const { tweets } = useSelector(store => store.tweet);
    return (
        <div className='w-[100%] overflow-y-auto bg-zinc-950'>
            <div className='flex items-center py-2 border-b border-zinc-700 '>
                <Link to={"/"} className='p-2 rounded-full hover:bg-gray-800 cursor-pointer text-white'>
                    <IoChevronBackCircleOutline size={"32px"} />
                </Link>
                <div className='ml-2 bg-black'>
                    <h1 className='font-bold text-white text-2xl'>Post</h1>
                    <p className='text-gray-500 text-sm'>post</p>
                </div>


            </div>
            {
                tweets && tweets?.map((tweet) => tweetId === tweet?._id &&
                    <div>
                        <div className='bg-black'>
                          <Tweet key={tweet?._id} tweet={tweet} /> 

                            {
                                tweet?.comments && tweet?.comments?.map((twe) => <div
                                    className='  w-[95%] ml-auto'>

                                      <Tweet key={twe?._id} tweet={twe} /> 
                                </div>
                                )

                            }

                        </div>
                    </div>)
            }
        </div>
    )
}
