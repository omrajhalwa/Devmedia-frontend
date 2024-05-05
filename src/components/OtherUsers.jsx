


import React from 'react'
import OtherUser from './OtherUser'
import useGetAllUsers from '../hooks/useGetAllUsers'
import { useSelector } from 'react-redux';

export default function OtherUsers() {
    useGetAllUsers();

    const {allUser}=useSelector(store=>store.user);

  return (
    <div className='overflow-y-auto'>

        {
         allUser?.map((user)=>{
            return(
                <OtherUser key={user?._id} user={user}/>
            )
         })
        }
     
        
       

    </div>
  )
}
