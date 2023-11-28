import React, { useState } from 'react'
import OPDCLLeft from '../../Clinical/Pages/OPD/OPDSharePage/OPDCalculator/OPDCLLeft'
import OPDCALRight from '../../Clinical/Pages/OPD/OPDSharePage/OPDCalculator/OPDCALRight'
import BoxHeading from './BoxHeading'

export default function TestCalCulator(props) {

    let [selectedCalculatorId, setSelectedCalculatorId] = useState("")
    return (
        <div className={`modal d-${props.showCal === 0 ? 'none' : 'block'}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ "backdrop-filter": "blur(8px)", }}>
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content">
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" onClick={() => { props.modelCloseFun(1) }}>
                        <label className='text-center pt-2' style={{ width: '25px', height: '25px', borderRadius: '15px', backgroundColor: 'red', 'cursor': 'pointer' }}>X</label>
                    </span>
                    <BoxHeading title="Calculator" textcolor="#7E7E7E" />
                    <div className='row p-0 m-0'>
                        <div className='col-6'>
                            <OPDCLLeft setId={setSelectedCalculatorId}/>
                        </div>
                        <div className='col-6' >
                            <OPDCALRight getId={selectedCalculatorId}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
