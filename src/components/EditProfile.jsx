import axios from 'axios';
import React, { useState } from 'react'
import { USER_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../redux/userSlice';




export default function EditProfile() {
  const [file, setFile] = useState("");
  const [about, setAbout] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.user);
  const handleFileChange = (event) => {
    console.log(1)
    setFile(event.target.files[0]);

  };
  let formdata = {
    'file': file,
    'about':about,
    'name':name,
    'username':username,
    'description':description
  }

  const submithandler = async () => {
    try {
      console.log(1);
      const res = await axios.put(`${USER_API_END_POINT}/editProfile/${user?._id}`, formdata, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })

      console.log(res);
      dispatch(getUser(res?.data?.user));

    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='w-full flex flex-col items-center overflow-y-auto overflow-x-hidden p-2'>
      <div className=' flex flex-col items-center p-3 m-4 w-full'>
        <div className='flex items-center justify-evenly w-full m-4 border-2 border-zinc-900 p-2'>
          <p className='text-white font-bold text-2xl'>Edit Image</p>
          <input type="file" onChange={handleFileChange} placeholder='choose image' className="file-input file-input-bordered file-input-primary w-full max-w-xs" />

        </div>
        <div className='w-full m-4 border-2 border-zinc-900'>

          <label htmlFor="school" className='text-white font-bold text-xl ml-6 mt-4'>Name</label>
          <input type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='py-4 px-2 m-1 my-4 border-4 border-indigo-600 rounded-3xl text-white'
            placeholder='enter School or colledge name.......' required />

          <label htmlFor="school" className='text-white font-bold text-xl ml-6 mt-4'>Username</label>
          <input type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='py-4 px-2 m-2  border-4 border-indigo-600 rounded-3xl text-white'
            placeholder='enter School or colledge name.......' required />

        

        </div>

        <label htmlFor="school" className='text-white font-bold text-xl ml-6 mt-4'>Description</label>
          <textarea type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className='py-4 px-4 m-2 w-full border-4 border-indigo-600 rounded-3xl text-white' rows={6} cols={30}
            placeholder='enter School or colledge name.......' required />

         <label htmlFor="school" className='text-white font-bold text-xl ml-6 mt-4'>About</label>
        <textarea
          className='py-4 px-4 m-2 w-full border-4 border-indigo-600 rounded-3xl text-white m-4'
          placeholder='Enter something about you ...............'
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          cols="30" rows="6"></textarea>

      </div>
      <button type='submit' className='btn btn-primary px-6 py-2' onClick={submithandler}>submit</button>
    </div>
  )
}
