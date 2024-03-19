import React, { useEffect, useState } from 'react'
import profilepic from '../../../../../assets/images/DischargePatient/Profile.png'
import blankprofilepic from '../../../../../assets/images/DischargePatient/blankprofilepic.svg'
import m1 from '../../../../../assets/images/DischargePatient/m1.png'
import m2 from '../../../../../assets/images/DischargePatient/m2.png'
import m3 from '../../../../../assets/images/DischargePatient/m3.png'
import m4 from '../../../../../assets/images/DischargePatient/m4.png'
import m5 from '../../../../../assets/images/DischargePatient/m5.png'
import GetPatientDetails from './Api/GetPatientDetails';
import AlertToster from '../../../../../Component/AlertToster'
import Loader from '../../../../../Component/Loader'
import GetPatientIPDAllHistory from './Api/GetPatientIPDAllHistory'
import DepartmentNavbar from '../../../OPD/OPDSharePage/OPDInvestigation/DepartmentNavbar'
import OPDInvestigationRight from '../../../OPD/OPDSharePage/OPDInvestigation/OPDInvestigationRight'
import pulseVitalIcon from '../../../../../../src/assets/images/icons/pulseVitalIcon.svg'
import bpSysDysVitalIcon from '../../../../../../src/assets/images/icons/bpSysDysVitalIcon.svg'
import bloodPressureVitalIcon from '../../../../../../src/assets/images/icons/bloodPressureVitalIcon.svg'
import tempratureVitalIcon from '../../../../../../src/assets/images/icons/tempratureVitalIcon.svg'
import sketchVitalIcon from '../../../../../../src/assets/images/icons/sketchVitalIcon.svg'
import { Link } from 'react-router-dom'
export default function PatientProfileForDB() {
  let [userID, setUserID] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).userId);
  let [UHID, setUHID] = useState("");
  let [showLoder, setShowLoder] = useState(0);
  let [showAlertToster, setShowAlertToster] = useState(0);
  let [showErrMessage, setShowErrMessage] = useState('');
  let [patientDetails, setPatientDetails] = useState([]);
  let [medicationList, setMedicationList] = useState([]);
  let [patientComplainHistory, setPatientComplainHistory] = useState([]);
  let [activeId, setActiveId] = useState("");
  let [activeUHID, setActiveUHID] = useState("");
  let [patientVitals, setPatientVitals] = useState([]);;
  let getPatientDetails = async () => {
    setShowLoder(1)
    let activeUHID = window["uhid"] === null ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : window["uhid"]; //"UHID00688"
    let activeclientId = window["clientId"] === null ? JSON.parse(window.sessionStorage.getItem("LoginData")).clientId : window["clientId"]; //"UHID00688"
    setUHID(activeUHID);
    const response = await GetPatientDetails(activeUHID, activeclientId);
    if (response.status === 1) {
      setShowLoder(0);
      setPatientDetails(response.responseValue[0])
    }
    else {
      setShowLoder(0);
      setShowAlertToster(1);
      setShowErrMessage(response.responseValue);
    }


  }
  let getPatientIPDAllHistory = async () => {
    let activeUHID = window["uhid"] === null ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : window["uhid"];
    const response = await GetPatientIPDAllHistory(activeUHID, userID);
    if (response.status === 1) {
      setShowLoder(0);
      setMedicationList(response.responseValue.runningPrescription);
      setPatientComplainHistory(response.responseValue.patientComplainHistory);
      setPatientVitals(response.responseValue.patientVitals);
    }
    else {
      setShowAlertToster(1);
      setShowErrMessage(response.responseValue);
    }

  }
  useEffect(() => {
    let activeUHID = window["uhid"] === null ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : window["uhid"];
   
    getPatientDetails();
    getPatientIPDAllHistory()
  }, []);
  return (
    <>
      <div className={`container-fluid ${window["uhid"] === null?"":"mt-5 pt-2"}`} >
        <div className="row">
          <div className="col-md-8 col-sm-12 wt plt">

            <div className='whitebg'>
              <div className='cheifcProfile-in'>
                <div className='cheifcProfile1'>
                  {/* <div className='cheifp'><img src={profilepic}/></div> */}
                  <div className='cheifp'><img src={blankprofilepic} /></div>
                </div>
                <div className='cheifcProfile'>
                  <div className='cprp'>
                    <div className='cprp-in'>
                      <div className='cprp-in2'>
                        <div className='cprp-in21'><h3>{patientDetails.patientName}</h3></div>
                        <div className='cprp-in21'> <Link to={'tel:'+patientDetails.mobileNo}><i className='fa fa-phone'></i></Link></div>
                        <div className='cprp-in21'><i className='fa fa-envelope'></i></div>
                      </div>
                      <div className='cprp-in2'>
                        <div className='cprp-in3'><i className='fa fa-user'></i> {patientDetails.gender}</div>
                        <div className='cprp-in3'><i className='fa fa-calendar'></i> {patientDetails.dob}&nbsp;({patientDetails.age + '' + patientDetails.agetype})</div>
                        <div className='cprp-in3'><i className='fa fa-map-marker'></i> {patientDetails.address}</div>
                      </div>
                    </div>
                    <div className='cprp-in desstaus'>
                      {/* <h4>Discharge Status</h4>
                      <span>Stable</span> */}
                    </div>
                  </div>
                  <div className='cprp1'>
                    <div className='cprp1-in'><h4>Admission Date</h4><p>{patientDetails.admitDate}</p></div>
                    <div className='cprp1-in'><h4>Discharge Date</h4><p>{patientDetails.dischargeDate !=='0000-00-00' ? patientDetails.dischargeDate:''}</p></div>
                    <div className='cprp1-in'><h4>Treating Doctor</h4><p>{patientDetails.doctorName}</p></div>
                    <div className='cprp1-in'><h4>Ward</h4><p>{patientDetails.wardName}</p></div>
                    {/* <div className='cprp1-in'><h4>Bed No.</h4><p>16</p></div> */}
                  </div>
                </div>
              </div>
            </div>

            <div className='whitebg'>
              <div className='didp_d'>
                <h2>Diagnosis</h2>
                <h4>
                  {patientComplainHistory && patientComplainHistory.map((val, ind) => {
                    return (
                      <>
                        {val.pdmId === 4 ?
                          <span>{val.problemName},</span>
                          : ''}
                      </>
                    )
                  })}
                </h4>
                {/* <h4>Fracture both Bone Shaft Leg Right</h4> */}
                {/* <p className='notedp'>Note:</p>
                  <p>Hand Reconstruction Surgery 
                    <span className='spd'>(Time: 06/06/2023, 12:30 AM, Duration: 1 hr)</span>.
                     Hand Reconstruction Surgery done successfully. The surgery and it's 
                     alternatives were discussed with the patient. The patient tolerated the 
                     surgery well, with no complications. Any loculated adhesions 
                     were dissected and more purulent material was expressed. 
                     The abscess was explored thoroughly.</p>
                     <p className='notea'><strong>Name of Anesthetist :</strong>Dr. Vijay Kumar Goel</p>
                     <p className='notea'><strong>Type of Anesthesia :</strong>Local Anesthesia</p> */}
              </div>
              <div className='didp_d'>
                <h2>Chief Complaints/Medical History</h2>
                <h4>
                  {patientComplainHistory && patientComplainHistory.map((val, i) => {
                    return (
                      <>
                        {val.pdmId === 2 ?
                          <span>{val.problemName},</span>
                          : ''}
                      </>


                    )
                  })}
                </h4>
              </div>
            </div>

            <div className='whitebg'>
              <div className='didp_d cheifc'>
                <h2>Vital</h2>
                <div className='d-flex flex-wrap mb-2' style={{ gap: '17px' }}>
                {patientVitals && patientVitals.map((val,i)=>{
                  return(
                    val.vmId === 3 ?
                    <div className='d-flex gap-1 repeat'>
                      <div><img src={pulseVitalIcon} alt="pulseVitalIcon" className='vitalIcon' /></div>
                      <div className='d-flex flex-column'>
                        <b class="vitalName">Pulse</b>
                        <span class="vitalVal">{val.vmValue}</span>
                      </div>
                    </div>
                    :
                    val.vmId === 4 ?
                    <div className='d-flex gap-1 repeat'>
                    <div><img src={bpSysDysVitalIcon} alt="pulseVitalIcon" className='vitalIcon' /></div>
                    <div className='d-flex flex-column'>
                      <b class="vitalName">BP_Sys</b>
                      <span class="vitalVal">{val.vmValue}</span>
                    </div>
                  </div>
                    : val.vmId === 6 ?
                    <div className='d-flex gap-1 repeat'>
                    <div><img src={bloodPressureVitalIcon} alt="bloodPressureVitalIcon" className='vitalIcon' /></div>
                    <div className='d-flex flex-column'>
                      <b class="vitalName">BP_Dias</b>
                      <span class="vitalVal">{val.vmValue}</span>
                    </div>
                  </div>
                  : val.vmId === 5 ?
                  <div className='d-flex gap-1 repeat'>
                    <div><img src={tempratureVitalIcon} alt="tempratureVitalIcon" className='vitalIcon' /></div>
                    <div className='d-flex flex-column'>
                      <b class="vitalName">Temp</b>
                      <span class="vitalVal">{val.vmValue}</span>
                    </div>
                  </div>
                  : val.vmId === 56 ?
                  <div className='d-flex gap-1 repeat'>
                    <div><img src={sketchVitalIcon} alt="sketchVitalIcon" className='vitalIcon' /></div>
                    <div className='d-flex flex-column'>
                      <b class="vitalName">{val.vmValue}</b>
                      <span class="vitalVal">{val.vmValue}</span>
                    </div>
                  </div>
                  :''
                  )
                })}
                  

                  


                 
                  
                 
                 
                  

                </div>
                
              </div>
            </div>

            <div className='medica'>

              <div className='medica-in'>
                <div className='whitebgg'>
                  <div className='didp_d brt'>
                    <h2>Medication</h2>
                    <div className='inc brt'>
                      <table >
                        {medicationList && medicationList.map((list, ind) => {
                          return (
                            <tr className='didp_d2'>
                              <td className='didp_d2_in'>
                                <img src={m1} />
                              </td>
                              <td className='didp_d2_in'>
                                <h3>{list.drugName}</h3>
                                <p>{list.doseFrequency}</p>
                              </td>
                              <td className='didp_d2_in' style={{ 'width': '50px' }}>
                                <p className='daysd'>{list.duration}</p>
                              </td>
                            </tr>
                          )
                        })}
                        {/* <tr className='didp_d2'>
                          <td className='didp_d2_in'>
                            <img src={m1}/>
                          </td>
                          <td className='didp_d2_in'>
                            <h3>Inha-Respule-Duolin - 500mg Inha-Respule-Duolin - 500mg</h3>
                            <p>Once in a day</p>
                          </td>
                          <td className='didp_d2_in' style={{'width':'50px'}}>
                           <p className='daysd'>10 Days</p>
                          </td>
                        </tr> */}
                        {/* <tr className='didp_d2'>
                          <td className='didp_d2_in'>
                            <img src={m2}/>
                          </td>
                          <td className='didp_d2_in'>
                            <h3>Inha-Respule-Duolin - 500mg</h3>
                            <p>Once in a day</p>
                          </td>
                          <td className='didp_d2_in'>
                           <p className='daysd'>10 Days</p>
                          </td>
                        </tr>
                        <tr className='didp_d2'>
                          <td className='didp_d2_in'>
                            <img src={m3}/>
                          </td>
                          <td className='didp_d2_in'>
                            <h3>Inha-Respule-Duolin</h3>
                            <p>Once in a day</p>
                          </td>
                          <td className='didp_d2_in'>
                           <p className='daysd'>10 Days</p>
                          </td>
                        </tr>
                        <tr className='didp_d2'>
                          <td className='didp_d2_in'>
                            <img src={m4}/>
                          </td>
                          <td className='didp_d2_in'>
                            <h3>Inha-Respule-Duolin</h3>
                            <p>Once in a day</p>
                          </td>
                          <td className='didp_d2_in'>
                           <p className='daysd'>10 Days</p>
                          </td>
                        </tr>
                        <tr className='didp_d2'>
                          <td className='didp_d2_in'>
                            <img src={m5}/>
                          </td>
                          <td className='didp_d2_in'>
                            <h3>Inha-Respule-Duolin - 500mg</h3>
                            <p>Once in a day</p>
                          </td>
                          <td className='didp_d2_in'>
                           <p className='daysd'>10 Days</p>
                          </td>
                        </tr> */}
                      </table>
                    </div>
                  </div>

                </div>
              </div>

              <div className='medica-in'>
                <div className='whitebgg'>
                  <div className='didp_d'>
                    <h2>Investigation</h2>
                    <div className='inc'>
                      {/* <table >
                        <tr>
                          <td className='didp_d2_in'>
                            <h3>Inha-Respule-Duolin - 500mg</h3>
                          </td>
                          <td className='didp_d2_in text-right'>
                            <p className='daysdgrm'>11.6 g/dl</p>
                          </td>
                        </tr>
                        <tr>
                          <td className='didp_d2_in'>
                            <h3>Blood Sugar (Random)</h3>
                          </td>
                          <td className='didp_d2_in text-right'>
                            <p className='daysdgrm'>118 mg/dl</p>
                          </td>
                        </tr>
                        <tr>
                          <td className='didp_d2_in'>
                            <h3>Neutrophils</h3>
                          </td>
                          <td className='didp_d2_in text-right'>
                          <p className='redtxt1'>84 %</p>
                          </td>
                        </tr>
                        <tr>
                          <td className='didp_d2_in'>
                            <h3>Platelet Count</h3>
                          </td>
                          <td className='didp_d2_in text-right'>
                          <p className='daysdgrm'>2.4 Lakh</p>
                          </td>
                        </tr>
                        <tr>
                          <td className='didp_d2_in'>
                            <h3>HCV</h3>
                          </td>
                          <td className='didp_d2_in text-right'>
                            <p className='redtxt1'>0.04</p>
                          </td>
                        </tr>
                        <tr>
                          <td className='didp_d2_in'>
                            <h3>HbsAg-Interpretation</h3>
                          </td>
                          <td className='didp_d2_in text-right'>
                          <p className='daysdgrm'>Non-Reactive</p>
                          </td>
                        </tr>
                        <tr>
                          <td className='didp_d2_in'>
                            <h3>HCV-Interpretation</h3>
                          </td>
                          <td className='didp_d2_in text-right'>
                          <p className='daysdgrm'>Non-Reactive</p>
                          </td>
                        </tr>
                        <tr>
                          <td className='didp_d2_in'>
                            <h3>HCV</h3>
                          </td>
                          <td className='didp_d2_in text-right'>
                            <p className='redtxt1'>0.04</p>
                          </td>
                        </tr>
                        <tr>
                          <td className='didp_d2_in'>
                            <h3>HbsAg-Interpretation</h3>
                          </td>
                          <td className='didp_d2_in text-right'>
                          <p className='daysdgrm'>Non-Reactive</p>
                          </td>
                        </tr>
                      </table> */}
                      <div className='roww pdashboard-bg mb-2' style={{ 'padding': '0' }}>
                        <div className='row p-0 m-0 boxcontainer'>
                          <DepartmentNavbar getActiveID={setActiveId} callingpage={0} />
                        </div>
                        <div className='d-flex flex-column p-2 overflow-auto pb-2' style={{ height: "245px" }}>
                          <OPDInvestigationRight activeSubId={activeId} callingpage={1} uhid={activeUHID} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          <div className="col-md-4 col-sm-12 wt prt">

            <div className='whitebg'>
              <div className='opdvisit'>
                <ul className="nav nav-tabs" id="myTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <div class="opdvisit-in nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">OPD Visit History</div>
                  </li>
                  <li className="nav-item" role="presentation">
                    <div className="opdvisit-in nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Admission History</div>
                  </li>
                </ul>
              </div>


              <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                     <h3>Coming Soon</h3>
                <div className='d-none'>
                  <div className='datee'>
                    <div className='datee-1'>
                      <p className='tim1'>24 Nov, <span>Tue</span></p>
                      <p className='tim'>9AM - 10AM</p>
                    </div>
                    <div className='datee-1'>
                      <h4>Hypertension</h4>
                      <p className='tim2'>Diagnosis</p>
                      <p><i className='fa fa-user'></i> General Physician <span className='drt'>(Dr. Vijay Kumar Goel)</span></p>
                    </div>
                    <div className='datee-1'>
                      <i className='fa fa-ellipsis-v'></i>
                    </div>
                  </div>
                  <div className='datee'>
                    <div className='datee-1'>
                      <p className='tim1'>24 Nov, <span>Tue</span></p>
                      <p className='tim'>9AM - 10AM</p>
                    </div>
                    <div className='datee-1'>
                      <h4>Hypertension</h4>
                      <p className='tim2'>Diagnosis</p>
                      <p><i className='fa fa-user'></i> General Physician <span className='drt'>(Dr. Vijay Kumar Goel)</span></p>
                    </div>
                    <div className='datee-1'>
                      <i className='fa fa-ellipsis-v'></i>
                    </div>
                  </div>
                  <div className='datee'>
                    <div className='datee-1'>
                      <p className='tim1'>24 Nov, <span>Tue</span></p>
                      <p className='tim'>9AM - 10AM</p>
                    </div>
                    <div className='datee-1'>
                      <h4>Hypertension</h4>
                      <p className='tim2'>Diagnosis</p>
                      <p><i className='fa fa-user'></i> General Physician <span className='drt'>(Dr. Vijay Kumar Goel)</span></p>
                    </div>
                    <div className='datee-1'>
                      <i className='fa fa-ellipsis-v'></i>
                    </div>
                  </div>
                  <div className='datee'>
                    <div className='datee-1'>
                      <p className='tim1'>24 Nov, <span>Tue</span></p>
                      <p className='tim'>9AM - 10AM</p>
                    </div>
                    <div className='datee-1'>
                      <h4>Hypertension</h4>
                      <p className='tim2'>Diagnosis</p>
                      <p><i className='fa fa-user'></i> General Physician <span className='drt'>(Dr. Vijay Kumar Goel)</span></p>
                    </div>
                    <div className='datee-1'>
                      <i className='fa fa-ellipsis-v'></i>
                    </div>
                  </div>
                </div>

           </div>
           
                           <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">

                           <h3>Coming Soon</h3>

                  <div className='d-none'>
                  <div className='datee'>
                    <div className='datee-1'>
                      <p className='tim1'>24 Nov, <span>Tue</span></p>
                      <p className='tim'>9AM - 10AM</p>
                    </div>
                    <div className='datee-1'>
                      <h4>Hypertension</h4>
                      <p className='tim2'>Diagnosis</p>
                      <p><i className='fa fa-user'></i> General Physician <span className='drt'>(Dr. Vijay Kumar Goel)</span></p>
                    </div>
                    <div className='datee-1'>
                      <i className='fa fa-ellipsis-v'></i>
                    </div>
                  </div>
                  <div className='datee'>
                    <div className='datee-1'>
                      <p className='tim1'>24 Nov, <span>Tue</span></p>
                      <p className='tim'>9AM - 10AM</p>
                    </div>
                    <div className='datee-1'>
                      <h4>Hypertension</h4>
                      <p className='tim2'>Diagnosis</p>
                      <p><i className='fa fa-user'></i> General Physician <span className='drt'>(Dr. Vijay Kumar Goel)</span></p>
                    </div>
                    <div className='datee-1'>
                      <i className='fa fa-ellipsis-v'></i>
                    </div>
                  </div>
                  <div className='datee'>
                    <div className='datee-1'>
                      <p className='tim1'>24 Nov, <span>Tue</span></p>
                      <p className='tim'>9AM - 10AM</p>
                    </div>
                    <div className='datee-1'>
                      <h4>Hypertension</h4>
                      <p className='tim2'>Diagnosis</p>
                      <p><i className='fa fa-user'></i> General Physician <span className='drt'>(Dr. Vijay Kumar Goel)</span></p>
                    </div>
                    <div className='datee-1'>
                      <i className='fa fa-ellipsis-v'></i>
                    </div>
                  </div>
                  <div className='datee'>
                    <div className='datee-1'>
                      <p className='tim1'>24 Nov, <span>Tue</span></p>
                      <p className='tim'>9AM - 10AM</p>
                    </div>
                    <div className='datee-1'>
                      <h4>Hypertension</h4>
                      <p className='tim2'>Diagnosis</p>
                      <p><i className='fa fa-user'></i> General Physician <span className='drt'>(Dr. Vijay Kumar Goel)</span></p>
                    </div>
                    <div className='datee-1'>
                      <i className='fa fa-ellipsis-v'></i>
                    </div>
                  </div>
                </div>
                </div>
              </div>
            </div>

            <div className='whitebg'>
              <div className='didp_d'>
                <h2>Insurance Summary</h2>
              </div>

              <h3>Coming Soon</h3>


               <div className='d-none'>
              <div className='insuran'>
                <h4>Insurance Profile</h4>
                <p>Auto Insurance / Auto Insurance HMO / HMO</p>
              </div>
              <div className='row mt-2'>
                <div className='insuran col-md-6 col-sm-12'>
                  <h4>Primary Insurance</h4>
                  <p>Auto Insurance</p>
                  <p>STATE FARM</p>
                  <p>Member Number - 568821221</p>
                </div>
                <div className='insuran col-md-6 col-sm-12'>
                  <h4>Secondary Insurance</h4>
                  <p>Auto Insurance</p>
                  <p>STATE FARM</p>
                  <p>Member Number - 568821221</p>
                </div>
                <div className='insuran col-md-6 col-sm-12'>
                  <h4>Tertiary Insurance</h4>
                  <p>Auto Insurance</p>
                  <p>STATE FARM</p>
                  <p>Member Number - 568821221</p>
                </div>
                <div className='insuran col-md-6 col-sm-12'>
                  <h4>Responsible Party</h4>
                  <p>Auto Insurance</p>
                  <p>STATE FARM</p>
                  <p>Member Number - 568821221</p>
                </div>
              </div>

              </div>
            </div>
          </div>

        </div>



      </div>
      {
        showLoder === 1 ? <Loader val={showLoder} /> : ""
      }
      {
        showAlertToster === 1 ?
          <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
      }
    </>
  )
}
