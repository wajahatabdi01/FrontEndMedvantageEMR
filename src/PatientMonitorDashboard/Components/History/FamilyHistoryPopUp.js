import React from 'react'
import HistoryReport from './Component/HistoryReport'
import BoxHeading from '../BoxHeading'
import MedicalHistoryReportForDashboard from './Component/MedicalHistoryReportForDashboard'

export default function FamilyHistoryPopUp(props) {
    return (
        <>
       
            <div className={`modal d-${props.familyHistoryShow === 0 ? 'none' : 'block'}`}>
                <div className="modal-dialog modal-lg modal-dialog-scrollable_ pprofile_">
                    <div className="modal-content">                   
                        {/* <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill" onClick={() => { props.modelCloseFun(1) }}>
                            <label className='text-center pt-2' style={{ width: '25px', height: '25px', borderRadius: '15px', backgroundColor: 'red', 'cursor': 'pointer' }}>X</label>
                        </span> */}
                        {/* <BoxHeading title="Family History" patientName={props.patientdata.PntName} uhid={props.patientdata.UhId} /> */}
                        
                        <span className="closee" onClick={() => { props.modelCloseFun(1) }}><i className='fa fa-times'></i></span>
                        <div className='p-profile'>
                         <div className='p-profile-h'>Patient History</div>
                            <div className='p-profile-h'>
                            <div className='pname'><span>{props.patientdata.PntName} </span></div>
                            <div className='pname'>- {props.patientdata.UhId}</div>
                         </div>
                       </div>

                       <div className='tabbtnn m-0 p-2' style={{maxWidth:'325px'}}>
                        <ul className="nav nav-tabs" id="myTab" role="tablist" style={{background:'#e0eaf8'}}>
                        <li className="nav-item" role="presentation">
                            <div class="opdvisit-in nav-link active" data-bs-toggle="tab" data-bs-target="#FamilyHistory" type="button" role="tab" aria-controls="FamilyHistory" aria-selected="true">Family History</div>
                        </li>
                        <li className="nav-item" role="presentation">
                            <div className="opdvisit-in nav-link" data-bs-toggle="tab" data-bs-target="#MedicalHistory" type="button" role="tab" aria-controls="MedicalHistory" aria-selected="false">Medical History</div>
                        </li>
                        </ul>
                      </div>

                      <div className="tab-content" id="myTabContent">
                        <div className="px-2 tab-pane fade show active" id="FamilyHistory" role="tabpanel" >
                        <div className='heading-box mb-0'>Family History</div>
                        <HistoryReport patientdata={props.patientdata}/>
                        </div>

                        <div className="px-2 tab-pane fade" id="MedicalHistory" role="tabpanel" >
                        <div className='heading-box mb-0'>Past Medical History</div>
                        <div>
                        <MedicalHistoryReportForDashboard patientdata={props.patientdata}/>
                        </div>


                        </div>
                      </div>

                        
                    </div>
                </div>
            </div>
        </>
    )
}

