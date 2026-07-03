import React from 'react'

const SubNavBar = () => {
  return (
    <div className='flex space-x-3 p-3 text-xs cursor-pointer w-full h-fit'>
      <h2 className='active:scale-95'>For you</h2>
      <h2 className='active:scale-95'>Featured</h2>
    </div>
  )
}

export default SubNavBar
