import axios from 'axios';
import React, { useState } from 'react'
import { USER_API_END_POINT } from '../utils/constant';
import { useSelector } from 'react-redux';
import toast from "react-hot-toast"
export default function Education() {
    const {user}=useSelector(store=>store.user);
    const [school, setSchool] = useState("");
    const [degree, setDegree] = useState("");
    const [fieldofstudy, setFieldofstudy] = useState("");
    const [startdate, setStartdate] = useState("");
    const [enddate, setEnddate] = useState("");
    const [grade, setGrade] = useState("");
    const [activity, setActivity] = useState("");

   const onSubmitHandler= async(e)=>{
    e.preventDefault();
      

        try {
            
            const res=await axios.post(`${USER_API_END_POINT}/add/education`,{id:user?._id,
                school,
                degree,
                fieldofstudy,
                startdate,
                enddate,
                grade,
                activity
                },{
                    withCredentials:true
                });

                toast.success(res.data.message);
                
                
        } catch (error) {
            console.log(error);
        }


        setSchool("");
        setDegree("");
        setFieldofstudy("");
        setStartdate("");
        setEnddate("");
        setGrade("");
        setActivity("");
   }

    return (
        <form className='w-full flex flex-col overflow-y-auto  ' onSubmit={onSubmitHandler} >
                     <h1 className='text-white text-3xl font-bold mx-auto m-2'>Add Education Section</h1>

            <label htmlFor="school" className='text-white font-bold text-xl ml-6 mt-4'>School/Colledge</label>
            <input type="text"
                value={school}
                onChange={(e)=>setSchool(e.target.value)}
                className='py-4 px-4 m-2 border-4 border-indigo-600 rounded-3xl text-white'
                placeholder='enter School or colledge name.......' required />


            <label htmlFor="school" className='text-white font-bold text-xl ml-6 mt-4'>Degree</label>
            <input type="text"
            value={degree}
            onChange={(e)=>setDegree(e.target.value)}
                className='py-4 px-4 m-4 border-4 border-indigo-600 rounded-3xl text-white'
                placeholder='enter Degree name' required />


            <label htmlFor="school" className='text-white font-bold text-xl ml-6 mt-4'>Field of Study</label>
            <input type="text"
            value={fieldofstudy}
            onChange={(e)=>setFieldofstudy(e.target.value)}
                className='py-4 px-4 m-4 border-4 border-indigo-600 rounded-3xl text-white'
                placeholder='enter Field of Study' required />


            <label htmlFor="school" className='text-white font-bold text-xl ml-6 mt-4'>Start date</label>
            <input type="date"
            value={startdate}
            
            onChange={(e)=>setStartdate(e.target.value)}
                className='py-4 px-4 m-4 border-4 border-indigo-600 rounded-3xl text-white'
                placeholder='enter session start date' required />


            <label htmlFor="school" className='text-white font-bold text-xl ml-6 mt-4'>end date</label>
            <input type="date"
            value={enddate}
            onChange={(e)=>setEnddate(e.target.value)}
                className='py-4 px-4 m-4 border-4 border-indigo-600 rounded-3xl text-white'
                placeholder='enter session end date' required />


            <label htmlFor="school" className='text-white font-bold text-xl ml-6 mt-4'>Grades</label>
            <input type="text"
            value={grade}
            onChange={(e)=>setGrade(e.target.value)}
                className='py-4 px-4 m-4 border-4 border-indigo-600 rounded-3xl text-white'
                placeholder='enter grades' required />

            <div className='w-full'>
                <label htmlFor="school" className='text-white font-bold text-xl ml-6 mt-4'>About Section</label>
                <textarea
                value={activity}
                onChange={(e)=>setActivity(e.target.value)}
                 className='py-4 px-4 m-4 border-4 border-indigo-600 rounded-3xl text-white w-[95%] ' id="" cols="30" rows={5} placeholder='Activity and Societys' required></textarea>
            </div>
            <button type='submit'  className='text-white bg-blue-500 mx-auto px-4 py-2 rounded-full m-2'>Submit</button>
        </form>
    )
}
