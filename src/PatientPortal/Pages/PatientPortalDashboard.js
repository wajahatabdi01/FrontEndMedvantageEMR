import React, { useEffect, useState } from "react";
import TosterUnderProcess from '../../Component/TosterUnderProcess';
import Toster from '../../Component/Toster';
import Select from 'react-select';
import Loder from '../../Component/Loader';
import exampleUser from '../../assets/images/dashboard/patientPortalDashboard/exampleUser.png'
import user from '../../assets/images/dashboard/patientPortalDashboard/portalusericon.png'
import dob from '../../assets/images/dashboard/patientPortalDashboard/dob.png'
import location from '../../assets/images/dashboard/patientPortalDashboard/location-pin.png'
import symtomicon from '../../assets/images/dashboard/patientPortalDashboard/symtomicon.png'


export default function PatientPortalDashboard() {

  const [Opdhistory, setOpdhistory] = useState(1)
  const [admissionHistory, setadmissionHistory] = useState(0)

const handleOpdhistory=()=>{
  setOpdhistory(1);
  setadmissionHistory(0)
}
const handleadmissionhistory=()=>{
  setadmissionHistory(1);
  setOpdhistory(0)
}


  return (
    <>
     <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
           <div className="col-7">
                   <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
              <div className="med-box">

                <div className="inner-content">
                <div className='portal-user-details-box fieldsett-in col-md-12 d-flex flex-wrap '>
                <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 me-3">
                  <img src={exampleUser} alt=""/>
                </div>

                <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-8 ps-2 ms-2">
                  <div className="portal-user-name mb-1">Shiv Mishra</div>
                  <div className="col-xxl-9 col-xl-9 col-lg-9 col-md-12 d-flex justify-content-between">
                    <div className="user-personal-details"><img src={user} className="me-1" alt="" />Male</div>
                    <div className="user-personal-details"><img src={dob} className="me-1" alt="" />10 feb 2000(24yr)</div>
                    <div className="user-personal-details"><img src={location} className="me-1" alt="" />Sarfarazganj,Hardoi,Lucknow</div>
                  </div>
                  
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 patien-basic-details mt-4 px-3">
                 <div className="details-main-box">
                  <div className="details-heading mb-1">Mobile No.</div>
                  <div className="details-content ">9786786898</div>
                 </div>
                 <div className="details-main-box">
                  <div className="details-heading mb-1">Email</div>
                  <div className="details-content">shivmishra@gmail.com</div>
                 </div>
                 <div className="details-main-box">
                  <div className="details-heading mb-1">Blood Group</div>
                  <div className="details-content">AB+</div>
                 </div>
                 <div className="details-main-box">
                  <div className="details-heading mb-1">Height</div>
                  <div className="details-content">168cm</div>
                 </div>
                 <div className="details-main-box">
                  <div className="details-heading mb-1">Weight</div>
                  <div className="details-content">65kg</div>
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
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 cheif-complain-details mb-2">
                  H/O RTA 1 day back with no H/O LOC, ENT Bleed, Vomiting, Seizure
                  </div>
                
               


                </div>
                  </div>
                </div>

              </div>
            </div>
           </div>
           <div className="col-5">
  
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
              <div className="med-box">

                <div className="inner-content">
                <div className='portal-user-details-box fieldsett-in col-md-12 d-flex flex-wrap '>

                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 ">
                  <div className="col-xxl-8 col-xl-8 col-lg-12 col-md-12 portal-user-name mb-1 patient-history-header-btn">
                    <button className={`btn btn ${Opdhistory === 1 ? 'opd-history-btn me-2' : 'admission-history-btn me-2'}`} onClick={handleOpdhistory} style={{fontWeight: '700'}}>OPD Visit History</button>
                    <button className={`btn btn ${admissionHistory === 1 ? 'opd-history-btn' : 'admission-history-btn'}`} onClick={handleadmissionhistory} style={{fontWeight: '700'}}>Admission History</button>
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



          <div className="row">
            <div className="col-4">
            <div className="med-box">
               <div className="inner-content">
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                <div className="portal-user-name mb-1">Medication</div>
                <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12">
                 <div>
                     <div>Inha-Respule-Duolin - 500mg</div>
                    <div>Once in a day</div>
                 </div>
                 <div>
                  10 Days
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