import React from 'react'
import { useAuth } from '../../context/AuthContext'

function Navbar() {
    const {user} = useAuth();
  return (
    <header className='h-16 bg-white shadow-sm border-b flex items-center justify-between px-6'>
        <div >
            <h2 className='text-2xl font-semibold text-slate-800'>
            Dashboard
            </h2>
        </div>

        <div className='flex items-center gap-3'>
            <div className='text-right'>
                <h3 className='font-medium text-slate-800'>
                    {user?.name}
                </h3>

                <p className='text-sm text-slate-500'>
                    {user?.email}
                </p>
            </div>
            <div className='w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-lg'>
                {user?.name?.charAt(0).toUpperCase()}
            </div>
        </div>

    </header>
    
  );
};

export default Navbar