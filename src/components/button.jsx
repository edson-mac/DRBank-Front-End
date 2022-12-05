import React from 'react'

const Button = ({name, onClick, disabled}) => {
  return (
    <button className='disabled:bg-gray-500 bg-blue-500 hover:bg-blue-700 text-white
       font-bold py-2 px-4 rounded'
          onClick={onClick} disabled={disabled()}>{name}</button>
  )
}

export default Button;