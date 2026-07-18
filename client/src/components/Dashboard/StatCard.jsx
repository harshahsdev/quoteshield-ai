import React from 'react'

const StatCard = ({ title, value, icon}) => {
  return (
    <div className='bg-white rounded-xl shadow-md p-6 flex items-center justify-between hover:shadow-lg transition-shadow'>
        <div>
            <p className='text-sm text-slate-500'> 
                {title}
            </p>
            <h2 className='text-3xl font-bold text-slate-800 mt-2'>
                {value}
            </h2>
        </div>
        <div className='w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600'>
            {icon}
        </div>

    </div>
  )
}

export default StatCard