import { useDispatch, useSelector } from "react-redux"
import { TWEET_API_END_POINT } from "../utils/constant";
import { getAllTweets } from "../redux/tweetSlice";
import { useEffect } from "react";

import axios from "axios";



 const useGetMyTweet=(id)=>{

    const {refresh,isActive}=useSelector(store=>store.tweet);
    const {user}=useSelector(store=>store.user);
    const dispatch=useDispatch();


    const fetchMyTweet = async ()=>{
        try{
            const res= await axios.get(`${TWEET_API_END_POINT}/alltweet/${id}`,{
                withCredentials:true
            })
            dispatch(getAllTweets(res?.data?.tweets.reverse()));
        }catch(err){
            console.log(err);
        }
    }


    const followingTweetHandler= async()=>{
       
        try {
         console.log(id);
           const res = await axios.get(`${TWEET_API_END_POINT}/followingtweet/${id}`,{
             withCredentials:true
           });
           console.log(res);
           dispatch(getAllTweets(res?.data?.tweets.reverse()));
         
           
        } catch (error) {
         console.log(error);
        }
    }


    useEffect(()=>{
        if(isActive){
            fetchMyTweet();
        }else{
            followingTweetHandler();
        }
       
    },[id,refresh,isActive,user])
}

export default useGetMyTweet;
