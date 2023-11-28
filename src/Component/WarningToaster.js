import React, {useEffect} from 'react'

export default function WarningToaster(props) {
  useEffect(() => {
    // setTimeout(() => {
    //   props.handle(0)
    // }, 6000);
  }, [])
  return (
    <div id="toastBox">
      <div className='toastClass Invalid'>

        <i className="bi bi-exclamation-circle-fill"></i> {props.message}
      </div>
    </div>
  )
}
