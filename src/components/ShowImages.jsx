import React from 'react'

export default function ShowImages({tweet}) {
  return (
    
        <div className='rounded-2xl  m-6  my-4 border border-slate-800 '>
            
                        <img src={tweet?.image}  className='object-cover w-full h-full inset-0 rounded-2xl'/>
        </div>
    
  )
}
