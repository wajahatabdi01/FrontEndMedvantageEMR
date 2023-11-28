import React from "react";


export default function HealthCard() {

  

  return (
    <>


 <div className="container " style={{marginTop:"10rem",width: '40rem',height: '26rem',border: '2px solid black',borderRadius: '10px',padding: '5px'}}>
 <div className="head "style={{backgroundColor: 'rgb(58 58 131)',width: '39rem',height: '5.2rem',display: 'flex',borderRadius: '5px'}}>
    <img className="mx-2" src="https://yt3.googleusercontent.com/ytc/AGIKgqPzBk3ldiVloGZE86_dcPrIXIo4K-jlZDIM_PIa=s900-c-k-c0x00ffffff-no-rj" alt="" style={{width: '3rem',height: '3rem',marginTop: '15px'}} />
    <div style={{backgroundColor: 'rgb(58 58 131)',}}>
    <h5 className="mx-4" style={{color: 'white',backgroundColor: 'rgb(58 58 131)'}}>Era's Lucknow Medical College and Hospital</h5>
    <p className= "mx-4"style={{color: 'white',backgroundColor: 'rgb(58 58 131)'}}> Sarfarazganj,Hardoi Road,Lucknow-226003 U</p>
    <p className="mx-4"style={{marginTop:'-1rem',color: 'white',backgroundColor: 'rgb(58 58 131)'}}>www.medfile.in</p>
    </div>
    </div> 
 <div style={{display: 'flex',justifyContent: 'flex-end'}}>
 <h5 className="mt-2" style={{color: 'red',textAlign: 'center',marginRight: '10rem'}}>Health Card</h5>
 <img  src="https://developer.mozilla.org/en-US/docs/Web/API/Barcode_Detection_API/code-39.png" alt="" style={{width: '7rem', height: '3rem',marginRight: '3.6rem'}} />
 </div>
 <div className="d-flex">
 <div className="mt-5">
<h6>Name: &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;MOHD AFAQ FAROOQUI</h6>
<h6>Gender: &nbsp;&nbsp;&nbsp; &nbsp;  Male</h6>
<h6>Mob.No: &nbsp; &nbsp;  9305735826</h6>
<h6>Reg Date: &nbsp;   08/02/2023</h6>
<h6>Address: &nbsp; &nbsp;  VILLI AND POST NEORI,AMBEDKAR NAGAR</h6>
</div>
<div>
    <img className="mt-4 mx-3" src="https://i.pinimg.com/originals/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg" style={{width: '8rem',height: '8rem'}} alt="" />
</div>
 </div>

<div className="foot " style={{width: '39.9rem',height: '2rem',backgroundColor: 'rgb(58 58 131)',marginTop: '4rem',marginLeft: '-6px',borderBottomLeftRadius: '10px',borderBottomRightRadius: '10px'}}>
<h6 className="mt-5" style={{color: 'white',textAlign: 'center',backgroundColor: 'rgb(58 58 131)'}}>Incase of EmergencyScan Barcode / Scan Finger Print / Input PID No</h6>
</div>
</div>

    </>

  )
}


