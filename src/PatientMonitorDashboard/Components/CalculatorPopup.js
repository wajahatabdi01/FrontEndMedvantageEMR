import React, { useEffect, useState } from 'react'

import OPDCALRight from '../../Clinical/Pages/OPD/OPDSharePage/OPDCalculator/OPDCALRight';
import BoxHeading from './BoxHeading';
import OPDCLLeft from '../../Clinical/Pages/OPD/OPDSharePage/OPDCalculator/OPDCLLeft';
export default function CalculatorPopup(props) { 

  let [selectedCalculatorId, setSelectedCalculatorId] = useState("")

  return (
    <div className={`modal d-${props.showCal === 0 ? 'none' : 'block'}`}>
      <div className="modal-dialog modal-dialog-centered_ modal-xl">
        <div className="modal-content">
          {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" onClick={() => { props.modelCloseFun(1) }}>
            <label className='text-center pt-2' style={{ width: '25px', height: '25px', borderRadius: '15px', backgroundColor: 'red', 'cursor': 'pointer' }}>X</label>
          </span>
          <BoxHeading title="Calculator" textcolor="#7E7E7E" /> */}

          <span className="closee" title='Close Window' onClick={() => { props.modelCloseFun(1) }}><i className='fa fa-times'></i></span>                        
          <div className='p-profile'>
            <div className='p-profile-h'>Calculator</div>
              <div className='p-profile-h'>
                <div className='pname'><span>{props.patientdata.UhId}</span></div>
              <div className='pname'>- {props.patientdata.PntName}</div> 
            </div>
          </div>


          <div className='row p-0 m-0'>
            <div className='col-lg-6'>
              <OPDCLLeft setId={setSelectedCalculatorId} uhid={props.uhId}/>
            </div>
            <div className='col-lg-6' >
              <OPDCALRight getId={selectedCalculatorId} uhid={props.uhId}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
