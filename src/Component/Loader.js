import React from 'react'
// import LoderIcon from "../assets/images/Animation/LoginIcon.gif"
import LoderIcon from "../assets/images/Animation/LoginIcon.gif"

export default function Loader(props) {
  return (
    <div className='loding-image ' style={{'display':`${props.val === 1?'block':'none'}`}}>
      <img src={LoderIcon} className="load_img" style={{width:'100px', height:'100px'}}  alt="LoginIcon" />
    </div>
  )
}
