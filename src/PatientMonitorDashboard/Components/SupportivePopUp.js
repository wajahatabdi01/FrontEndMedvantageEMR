import React from 'react'
import BoxHeading from './BoxHeading'

export default function SupportivePopUp(props) {
    return (
        <div className={`modal d-${props.supportivepopup === 0 ? 'none' : 'block'}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ "backdrop-filter": "blur(8px)", overflowY: 'none' }}>
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content">
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" onClick={() => { props.modelCloseFun(1) }}>
                        <label className='text-center pt-2' style={{ width: '25px', height: '25px', borderRadius: '15px', backgroundColor: 'red', 'cursor': 'pointer' }}>X</label>
                    </span>
                    <BoxHeading title="Patient Feedback Detail" patientName={props.patientdata.PntName} uhid={props.patientdata.UhId} />
                    <div className='mt-1 ps-2 pe-2 pb-3'>
                        <table className='table'>
                            <thead style={{ position: "sticky", top: 0 }}>
                                <tr>
                                    <th>#</th>
                                    <th>Feedback Head</th>
                                    <th>Star Rating</th>
                                    <th>Feedback</th>
                                </tr>
                            </thead>

                            <tbody className='tableRow'>
                                <tr>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>
                                    <td>1</td>

                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    )
}
