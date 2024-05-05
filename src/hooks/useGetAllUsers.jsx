import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { setAllUser } from '../redux/userSlice';

export default function useGetAllUsers() {
 
const dispatch=useDispatch();

    useEffect(()=>{

        const fetchOtherUsers = async()=>{
            try {
                const res = await axios.get(`http://localhost:8080/api/v1/user/getAllUser`,{
                    headers:{
                      "Content-Type":"application/json"
                    },
                    withCredentials:true
                   });

                     dispatch(setAllUser(res?.data));
            } catch (error) {
                console.log(error);
            }
        }
        fetchOtherUsers();
    },[])
}
