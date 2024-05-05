import React from 'react'
import {RouterProvider,createBrowserRouter} from "react-router-dom"
import Home from './Home'
import Feed from './Feed'
import Login from './Login'
import Profile from './Profile'
import MessageField from './MessageField'
import MessageBox from './MessageBox'
import EditProfile from './EditProfile'
import PostHeader from './PostHeader'
import AddEducation from './AddEducation'
import Bookmarks from './Bookmarks'

export default function Body() {

    const appRouter=createBrowserRouter([
        {
            path:"/",
            element:<Home/>,
            children:[
                {
                    path:"/",
                    element:<Feed/>
                },
                {
                    path:"/profile/:id",
                    element:<Profile/>
                },
                {
                    path:"/editProfile",
                    element:<EditProfile/>
                },
                {
                    path:"/posts/:id",
                    element:<PostHeader/>,
                   
                   
                },
                {
                    path:"/profile/education",
                    element:<AddEducation/>
                },
                {
                    path:"/bookmarks",
                    element:<Bookmarks/>
                }
            ]
        },{
            path:"/login",
            element:<Login/>
        },{
            path:"/messages",
            element:<MessageBox/>,
            children:[
                {
                    path:"/messages/hey",
                    element:<MessageField/>
                }
            ]
        }
    ])


  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}
