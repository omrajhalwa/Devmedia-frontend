
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import Body from './components/Body';
import io from "socket.io-client"
import { Toaster } from 'react-hot-toast';
import { useEffect } from 'react';
import { setSocket } from './redux/socketSlice';
import { setOnlineUser } from './redux/userSlice';
function App() {

const dispatch=useDispatch();

const {user}=useSelector(store=>store.user);

useEffect(()=>{
      
  if(user){
    const socket=io('ws://localhost:8080',{
        query:{
          userId:user?._id,
        }
    })

    dispatch(setSocket(socket));

    socket.on('getOnlineUsers',(onlineUsers)=>{
      dispatch(setOnlineUser(onlineUsers));
    })
    return ()=>socket.close();
  }else{
    
  }
},[user]);

  return (
    <div className="App">
        <Body/>
        <Toaster/>
    </div>
  );
}

export default App;
