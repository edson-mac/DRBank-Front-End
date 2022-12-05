import React from 'react'

const Input = ({name, type, placeholder, onChange, value}) => {
  return (
    <input className="input border-2 border-gray-300 text-center ml-auto mr-auto w-8/12 text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-xl transition ease-in-out m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-700 focus:outline-none"
          name={name} type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e)} />
  )
}

export default Input;