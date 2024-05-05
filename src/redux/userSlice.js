import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
        otherUsers:null,
        profile:null,
        allUser:null,
        selectedUser:null,
        onlineUsers:null,
        showPost:true,
        selectedPost:null
    },
    reducers:{
        setSelectedPost:(state,action)=>{
            state.selectedPost=action.payload;
        },
        setOnlineUser:(state,action)=>{
            state.onlineUsers=action.payload;
        },
        setSelecteduser:(state,action)=>{
            state.selectedUser=action.payload;
        },
        setAllUser:(state,action)=>{
            state.allUser=action.payload;
        },
        getUser:(state,action)=>{
            state.user=action.payload;
        },
        getOtherUsers:(state,action)=>{
            state.otherUsers=action.payload;
        },
        getMyProfile:(state,action)=>{
            state.profile=action.payload;
        },
        followingUpdate:(state,action)=>{
            if(state.user.following.includes(action.payload)){
                 state.user.following= state.user.following.filter((itemId)=>{
                    return itemId !== action.payload;
                 })
            }else{
                state.user.following.push(action.payload);
            }
        },
        setShowPost:(state)=>{
            state.showPost=!state.showPost;
        }
    }
})

export const {getUser,getOtherUsers,getMyProfile,followingUpdate,setAllUser,setSelecteduser,setOnlineUser,setShowPost,setSelectedPost}=userSlice.actions;
export default userSlice.reducer;