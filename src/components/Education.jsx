import React from 'react'

export default function Education({edu}) {
  return (
    <div className='w-full flex flex-col items-center border-2 border-zinc-700 rounded-2xl p-2 mt-2 bg-black'>
            <div><p className='text-white font-bold text-xl' >{edu.school}</p></div>
            <div className='flex items-center text-white text-lg justify-between p-1'> <p>{edu.degree}  - </p>
            <p>{ edu.fieldofstudy}</p></div>
            <div className='p-1'><p>{edu.startdate} - {edu.enddate}</p></div>
            <div className='p-1'><p>Grade - {edu.grade}</p></div>
            <div className='p-1'><p>Activity - {edu.activity}</p></div>
    </div>
  )
}
