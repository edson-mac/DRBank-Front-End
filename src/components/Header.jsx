import React from 'react'
import bank from '../assets/bank.svg'

const Header = () => {
    return (
        <div className='Header flex flex-row'>
            <img src={bank} alt='bank' className='w-10 h-10 ml-5 mt-5' />
            <h1 className='font-outline-2 text-5xl text-slate-50 drop-shadow-lg font-bold ml-5 mt-5'>Digital Republic Bank</h1>
        </div>
    )
}

export default Header;