import React from 'react'
import BoxHeading from './BoxHeading'

export default function InfusionPumpDeatils(props) {
    console.log("cmsdc", props.patientdata.UhId)
    return (
        <div className={`modal d-${props.ADRReportPop === 0 ? 'none' : 'block'}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style={{ "backdrop-filter": "blur(8px)", overflowY: 'none' }}>
            <div className="modal-dialog modal-dialog-centered modal-xl">
                <div className="modal-content">
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" onClick={() => { props.modelCloseFun(1) }}>
                        <label className='text-center pt-2' style={{ width: '25px', height: '25px', borderRadius: '15px', backgroundColor: 'red', 'cursor': 'pointer' }}>X</label>
                    </span>
                    {/* <BoxHeading name="Infusion Deatls" textcolor="#7E7E7E" patientName={props.patientdata.PntName} patientUhid={props.patientdata.UhId} patientBool={true}/> */}
                    <BoxHeading title="Infusion Deatls" patientName={props.patientdata.PntName} uhid={props.patientdata.UhId}/>

                    <div className='mt-1 ps-2 pe-2 pb-3'>
                        <table className='table'>
                            <thead style={{ position: 'sticky', top: '0' }}>
                                <tr>
                                    <th>S.No.</th>
                                    <th>Drug Name</th>
                                    <th>Flow Rate</th>
                                    <th>Left Volume</th>
                                    <th>User Volume</th>

                                </tr>
                            </thead>
                            <tbody className='tableRow'>
                                { props.patientdata.InfusionPumpDataList && props.patientdata.InfusionPumpDataList.map((val, index) => {
                                    return(
                                    <tr className='tableRow'>
                                        <td>{index + 1}</td>
                                        <td>{val.FluidName}</td>
                                        <td>{val.Value}</td>
                                        <td>{""}</td>
                                        <td>{""}</td>
                                    </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    )
}
