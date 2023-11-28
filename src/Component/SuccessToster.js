import React, { useEffect } from 'react'

export default function SuccessToster(props) {

  useEffect(() => {
    setTimeout(() => {
      props.handle(0)
    }, 6000);

  }, [])
  
  return (
    <div id="toastBox">
      <div className='toastClass '>
        <i className="bi bi-check-circle-fill"></i> {props.message}
      </div>
    </div>
  )
}
