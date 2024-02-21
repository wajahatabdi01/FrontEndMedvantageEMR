import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Select from 'react-select';
import Loder from '../../Component/Loader';
import editBtnIcon from '../../assets/images/icons/edit.svg';
import exampleUser from '../../assets/images/dashboard/patientPortalDashboard/exampleUser.png'
import user from '../../assets/images/dashboard/patientPortalDashboard/portalusericon.png'
import dob from '../../assets/images/dashboard/patientPortalDashboard/dob.png'
import location from '../../assets/images/dashboard/patientPortalDashboard/location-pin.png'
import symtomicon from '../../assets/images/dashboard/patientPortalDashboard/symtomicon.png'
import medicine from '../../assets/images/dashboard/patientPortalDashboard/medicine1.png'
import medicine1 from '../../assets/images/dashboard/patientPortalDashboard/medicine1.png'
import medicine5 from '../../assets/images/dashboard/patientPortalDashboard/medicine5.png'
import medicine2 from '../../assets/images/dashboard/patientPortalDashboard/medicine2.png'
import medicine3 from '../../assets/images/dashboard/patientPortalDashboard/medicine3.png'
import medicine4 from '../../assets/images/dashboard/patientPortalDashboard/medicine4.png'
import GetPatientData from '../../PatientPortal/API/GetPatientData';
import GetChiefComplaint from '../../PatientPortal/API/GetChiefComplaint';


export default function PatientPortalDashboard() {
  const navigate = useNavigate()

  const [Opdhistory, setOpdhistory] = useState(1)
  const [PatientData, setPatientData] = useState()
  const [chiefComplainData, setchiefComplainData] = useState([])
  const [admissionHistory, setadmissionHistory] = useState(0)

const handleOpdhistory=()=>{
  setOpdhistory(1);
  setadmissionHistory(0)
}
const handleadmissionhistory=()=>{
  setadmissionHistory(1);
  setOpdhistory(0)
}
const handleEditData= async()=>{
  navigate('/registeraspatient/')
}


const Patientdata = async()=>{
  let data = await GetPatientData()
  if(data.status === 1){
    const patientRegistrationData = data.responseValue.patientregistration[0];
      console.log("Patientdata>>", patientRegistrationData);
     setPatientData(patientRegistrationData);
  }

 }
const GetChiefComplaintData = async()=>{
  let data = await GetChiefComplaint()
  if(data.status === 1){
      console.log("ChiefComplaint>>", data.responseValue);
      setchiefComplainData(data.responseValue);
  }

 }

 useEffect(() => {
  Patientdata();
  GetChiefComplaintData()
}, [])

  return (
    <>
     <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row pt-2">
           <div className="col-xxl-7 col-xl-12 col-lg-12 col-md-12">
                   <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                  <div className="med-box">

                <div className="inner-content" style={{overflowX: 'auto'}}>
                <div className='portal-user-details-box col-md-12 d-flex' style={{gap: '14px'}}>
                <div className="portal-user-image">
                  <img src={exampleUser} alt=""/>
                </div>

                <div className="col-xxl-10 col-xl-10  col-lg-11 col-md-12">
                  <div className="portal-user-name d-flex mb-1 justify-content-between mt-2">
                    <div>{PatientData && PatientData.patientName}</div>
                    <div><img src={editBtnIcon}  alt='' title="Edit Details" style={{cursor : 'pointer'}}  onClick={handleEditData}/></div>
                    </div>
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 d-flex ms-1" style={{gap: '18px'}}>
                    <div className="user-personal-details"><img src={user} className="me-1" alt="" />{PatientData && PatientData.genderId == 1 ? 'Male' : 'Female'}</div>
                    <div className="user-personal-details"><img src={dob} className="me-1" alt="" />{PatientData && PatientData.dob}</div>
                    <div className="user-personal-details"><img src={location} className="me-1" alt="" />{PatientData && PatientData.address + "," + PatientData.addressLine2}</div>
                  </div>
                  
                  <div className="col-xxl-11 col-xl-11 col-lg-11 col-md-12 patien-basic-details mt-4 mb-2">
                 <div className="details-main-box">
                  <div className="details-heading mb-1">Mobile No.</div>
                  <div className="details-content ">{PatientData && PatientData.mobileNo}</div>
                 </div>
                 <div className="details-main-box" style={{textWrap: 'wrap'}}>
                  <div className="details-heading mb-1">Email</div>
                  <div className="details-content">{PatientData && PatientData.emailID}</div>
                 </div>
                 <div className="details-main-box"  style={{textWrap: 'wrap'}}>
                  <div className="details-heading mb-1">Blood Group</div>
                  <div className="details-content">{PatientData && PatientData.bloodGroupId}</div>
                 </div>
                 <div className="details-main-box">
                  <div className="details-heading mb-1">Height</div>
                  <div className="details-content">{PatientData && PatientData.height}</div>
                 </div>
                 <div className="details-main-box p-0" style={{border: 'none'}}>
                  <div className="details-heading mb-1">Weight</div>
                  <div className="details-content">{PatientData && PatientData.weight}</div>
                 </div>
                  </div>


                </div>
                  </div>
                </div>

              </div>
            </div>

          
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 pt-3">
              <div className="med-box">

                <div className="inner-content">
                <div className='portal-user-details-box fieldsett-in col-md-12 d-flex flex-wrap '>

                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                  <div className="portal-user-name mb-1">Diagnosis</div>
                  <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-12 Diagnosis-details mb-1">
                  Fracture both Bone Shaft Leg Right
                  </div>
                 
                  <div className="horizontal-line-dignosis mb-1"></div>
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 note-text">
                   Note:
                  </div>
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 note-detail mb-2">
                  Hand Reconstruction Surgery <span className="note-detail-highlight">(Time: 06/06/2023, 12:30 AM, Duration: 1 hr).</span>  Hand Reconstruction Surgery done successfully. The surgery and it's alternatives were discussed with the patient. The patient tolerated the surgery well, with no complications. Any loculated adhesions were dissected and more purulent material was expressed. The abscess was explored thoroughly.
                  </div>
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 note-text mb-2">
                   <div className="note-detail-highlight">Name of Anesthetist : <span  className="note-detail">Dr. Vijay Kumar Goel</span></div>
                   <div  className="note-detail-highlight">Type of Anesthesia : : <span  className="note-detail">Local Anesthesia</span></div>
                  </div>
               


                </div>
                  </div>
                </div>

              </div>
            </div>
          
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 pt-3">
              <div className="med-box">

                <div className="inner-content">
                <div className='portal-user-details-box fieldsett-in col-md-12 d-flex flex-wrap '>

                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                  <div className="cheif-complain-box mb-1">Chief Complaints/Medical History</div>
                  {chiefComplainData && chiefComplainData.map((val,index)=>{
                    return (
                       <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 cheif-complain-details mb-2">
                         {val.encounterTitle} 
                  </div>
                    )
                  })}
                 

                </div>
                  </div>
                </div>

              </div>
            </div>
           </div>
           <div className="col-xxl-5 col-xl-12 col-lg-12 col-md-12">
  
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
              <div className="med-box custom-medbox-medication">

                <div className="inner-content">
                <div className='portal-user-details-box fieldsett-in col-md-12 d-flex flex-wrap '>

                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 ">
                  <div className="d-flex">
                    <div className="portal-user-name mb-1 patient-history-header-btn">
                       <button className={`btn btn ${Opdhistory === 1 ? 'opd-history-btn me-2' : 'admission-history-btn me-2'}`} onClick={handleOpdhistory} style={{fontWeight: '700'}}>OPD Visit History</button>
                    <button className={`btn btn ${admissionHistory === 1 ? 'opd-history-btn' : 'admission-history-btn'}`} onClick={handleadmissionhistory} style={{fontWeight: '700'}}>Admission History</button>
                    </div>
                   
                  </div>
             
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 mb-2 d-flex patient-history-list me-2 pt-2">
                 <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 pt-2 me-3" style={{borderRight: '1px solid #d7d6d6'}}>
                  <div className="cheif-complain-details mb-3 ps-2">09 Feb,<br/>Fri</div>
                  <div className="patient-history-timing mb-1 ps-2">9AM - 10AM</div>
                 </div>
                 <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 ">
                  <div className="patient-history-symtom">Hypertension</div>
                  <div className="note-detail mb-2">Diagnosis</div>
                  <div className="note-detail mt-3">
                    <img src={symtomicon} className="me-2" alt=""/>Neurologist(Dr.Vivek kumar)
                  </div>
                 </div>
                  </div>
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 mb-2 d-flex patient-history-list me-2 pt-2">
                 <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 pt-2 me-3" style={{borderRight: '1px solid #d7d6d6'}}>
                  <div className="cheif-complain-details mb-3 ps-2">09 Feb,<br/>Fri</div>
                  <div className="patient-history-timing mb-1 ps-2">9AM - 10AM</div>
                 </div>
                 <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 ">
                  <div className="patient-history-symtom">Diabetes Mellitus</div>
                  <div className="note-detail mb-2">Diagnosis</div>
                  <div className="note-detail mt-3">
                    <img src={symtomicon} className="me-2" alt=""/>General Physician(Dr.Vivek kumar)
                  </div>
                 </div>
                  </div>
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 mb-2 d-flex patient-history-list me-2 pt-2">
                 <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 pt-2 me-3" style={{borderRight: '1px solid #d7d6d6'}}>
                  <div className="cheif-complain-details mb-3 ps-2">09 Feb,<br/>Fri</div>
                  <div className="patient-history-timing mb-1 ps-2">9AM - 10AM</div>
                 </div>
                 <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 ">
                  <div className="patient-history-symtom">Depressive Disorders</div>
                  <div className="note-detail mb-2">Diagnosis</div>
                  <div className="note-detail mt-3">
                    <img src={symtomicon} className="me-2" alt=""/>Neurologist(Dr.Vivek kumar)
                  </div>
                 </div>
                  </div>
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 mb-2 d-flex patient-history-list me-2 pt-2">
                 <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-2 pt-2 me-3" style={{borderRight: '1px solid #d7d6d6'}}>
                  <div className="cheif-complain-details mb-3 ps-2">09 Feb,<br/>Fri</div>
                  <div className="patient-history-timing mb-1 ps-2">9AM - 10AM</div>
                 </div>
                 <div className="col-xxl-10 col-xl-10 col-lg-10 col-md-10 ">
                  <div className="patient-history-symtom">Hypertension</div>
                  <div className="note-detail mb-2">Diagnosis</div>
                  <div className="note-detail mt-3">
                    <img src={symtomicon} className="me-2" alt=""/>Cardiologist(Dr.Vivek kumar)
                  </div>
                 </div>
                  </div>
                 
                 
               


                </div>
                  </div>
                </div>

              </div>
            </div>
          
           </div>

          </div>



          <div className="row pt-3" style={{rowGap: '15px'}}>
            <div className="col-xxl-4 col-xl-4 col-lg-12 col-md-12">
            <div className="med-box custom-medbox">
               <div className="inner-content medication-inner">
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 p-1">
                   <div className="portal-user-name mb-2 ms-1">Medication</div>
                     <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 d-flex justify-content-between px-2">
                        <div className="medicine-detail">
                          <div><img src={medicine1} className="me-2" alt=""/></div>
                           <div>
                              Inha-Respule-Duolin - 500mg
                                <div className="note-detail-dosage">Once in a day</div>
                                  </div>
                                    </div>
                                   <div className="medicine-duration">
                                        10 Days
                                           </div>
                                            </div>
                  
                                         <div class="horizontal-line-dignosis mb-1  mt-1"></div>
                       <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 d-flex justify-content-between px-2">
                            <div className="medicine-detail">
                              <div><img src={medicine5} className="me-2" alt=""/></div>
                            <div>
                               Cre-Respule-Duolin - 500Mg
                                <div className="note-detail-dosage">Once in a day</div>
                                  </div>
                                    </div>
                                    <div className="medicine-duration">
                                    20 Days
                                         </div>
                                        </div>
                                     <div class="horizontal-line-dignosis mb-1 mt-1"></div>
                       <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 d-flex justify-content-between px-2">
                          <div className="medicine-detail">
                              <div><img src={medicine4} className="me-2" alt=""/></div>
                                   <div>
                                    Inha-Respule-Duolin - 500mg
                                      <div className="note-detail-dosage">Once in a day</div>
                                       </div>
                                          </div>
                                         <div className="medicine-duration">
                                            20 Days
                                            </div>
                                               </div>

                                      <div class="horizontal-line-dignosis mb-1"></div>

                    <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 d-flex justify-content-between px-2">
                           <div className="medicine-detail">
                                <div><img src={medicine3} className="me-2" alt=""/></div>
                                         <div>
                                          Cap-Respule-Duolin - 500Mg
                                           <div className="note-detail-dosage">Once in a day</div>
                                              </div>
                                               </div>
                                             <div className="medicine-duration">
                                                 19 Days
                                                    </div>
                                                        </div>
                                   <div class="horizontal-line-dignosis mb-1  mt-1"></div>

                                 <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 d-flex justify-content-between px-2">

                                   <div className="medicine-detail">
                                         <div><img src={medicine2} className="me-2" alt=""/></div>
                                            <div>
                                                Inj-Respule-Duolin - 500mg
                                                <div className="note-detail-dosage">Once in a day</div>
                                                 </div>
                                                   </div>
                                                 <div className="medicine-duration">
                                                   15 Days
                                                     </div>
                                                       </div>
                                                       </div>
                
               
                </div>
                </div>
            </div>

            <div className="col-xxl-3 col-xl-3 col-lg-12 col-md-12">
            <div className="med-box custom-medbox">
               <div className="inner-content investigation-inner">
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 p-1">
                   <div className="portal-user-name mb-2 ms-1">Investigation</div>

                   
                     <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 d-flex justify-content-between px-2">
                           <div className="investigation-name">Blood Sugar (Random)</div>
                           <div className="investigation-measurement">118 mg/dl
                                           </div>

                             </div>
                     <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 d-flex justify-content-between px-2">
                           <div className="investigation-name">Neutrophils</div>
                           <div className="investigation-measurement-per">84 %
                                           </div>

                             </div>
                     <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 d-flex justify-content-between px-2">
                           <div className="investigation-name">Platelet Count</div>
                           <div className="investigation-measurement">2.4 Lakh
                                           </div>

                             </div>
                     <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 d-flex justify-content-between px-2">
                           <div className="investigation-name">HCV</div>
                           <div className="investigation-measurement-per">0.04
                                           </div>

                             </div>
                     <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 d-flex justify-content-between px-2">
                           <div className="investigation-name">HbsAg-Interpretation</div>
                           <div className="investigation-measurement">Non-Reactive
                                           </div>

                             </div>
                   
                   
                     
                 
                                
                                        
        
                           </div>
                
               
                </div>
                </div>
            </div>
            <div className="col-xxl-5 col-xl-5 col-lg-12 col-md-12">
            <div className="med-box custom-medbox">
               <div className="inner-content insurance-inner">
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 p-1">
                   <div className="portal-user-name mb-2 ms-1">Insurance Summary</div>

                   
                     <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                           <div className="insurance-profile">Insurance Profile</div>
                           <div className="insurance-profile-details">Auto Insurance / Auto Insurance HMO / HMO</div>
                             </div>   
        
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 mt-2 insurance-box d-flex justify-content-between">
  
                      <div >
                             <div className="insurance-type">Primary Insurance</div>
                             <div className="insurance-type-detail mt-1">Auto Insurance</div>
                             <div className="insurance-type-detail">STATE FARM</div>
                             <div className="insurance-type-detail">Member Number - 568821221</div>
                      </div>
                      <div className="pe-5">
                             <div className="insurance-type">Secondary Insurance</div>
                             <div className="insurance-type-detail mt-1">Auto Insurance</div>
                             <div className="insurance-type-detail">STATE FARM</div>
                             <div className="insurance-type-detail">Member Number - 568821221</div>
                      </div>

                  </div>
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 mt-2 insurance-box d-flex justify-content-between">
  
                      <div>
                             <div className="insurance-type">Tertiary Insurance</div>
                             <div className="insurance-type-detail mt-1">Auto Insurance</div>
                             <div className="insurance-type-detail">STATE FARM</div>
                             <div className="insurance-type-detail">Member Number - 568821221</div>
                      </div>
                      <div className="pe-5">
                             <div className="insurance-type">Responsible Party</div>
                             <div className="insurance-type-detail mt-1">Auto Insurance</div>
                             <div className="insurance-type-detail">STATE FARM</div>
                             <div className="insurance-type-detail">Member Number - 568821221</div>
                      </div>

                  </div>
                   
                           </div>
                
               
                </div>
                </div>
            </div>
          </div>


        </div>
       
      </section>

    </>

  )
}