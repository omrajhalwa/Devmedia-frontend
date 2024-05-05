import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { USER_API_END_POINT } from "../utils/constant";
import { getMyProfile } from "../redux/userSlice";
import axios from "axios";



const useGetProfile = (id)=>{
    const dispatch=useDispatch();

    useEffect(()=>{
           const fetchMyProfile = async ()=>{
            try {
                const res= await axios.get(`${USER_API_END_POINT}/profile/${id}`,{
                    withCredentials:true
                })
                dispatch(getMyProfile(res?.data?.user));
            } catch (error) {
                console.log(error);
            }
           }

           fetchMyProfile();
    },[id]);
}

export default useGetProfile;
