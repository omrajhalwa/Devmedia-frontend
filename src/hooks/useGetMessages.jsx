import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
import axios from "axios";


export default function useGetMessages() {
  

    const {selectedUser}=useSelector(store=>store.user);
    const dispatch=useDispatch();
    const {message}=useSelector(store=>store.message)

   useEffect(()=>{
      
        const fetchMessages = async ()=>{

          try {
            const res=await axios.get(`http://localhost:8080/api/v1/message/${selectedUser?._id}`,{
                    headers:{
                      "Content-Type":"application/json"
                    },
                    withCredentials:true
                   });

                    dispatch(setMessages(res?.data));

          } catch (error) {
            console.log(error);
          }
        }

        fetchMessages();

          
   },[selectedUser?._id,setMessages]);


}
