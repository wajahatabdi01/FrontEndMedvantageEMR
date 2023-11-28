import React from 'react'

export default function BoxContainer({children}) {
  return (
    <div className='inner-content'>
    <div className='d-flex flex-wrap   gap-2 p-2 boxcontainer'>
      {children}
    </div>
    </div>
  )
}
