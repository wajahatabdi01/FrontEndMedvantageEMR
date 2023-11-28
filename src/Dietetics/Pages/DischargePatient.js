import React, { useState } from 'react'
import Heading from '../../Components/Heading';
import BoxContainer from '../../Components/BoxContainer';
import TableContainer from '../../Components/TableContainer';



import profilepic from '../../assets/images/DischargePatient/Profile.png'
import m1 from '../../assets/images/DischargePatient/m1.png'
import m2 from '../../assets/images/DischargePatient/m2.png'
import m3 from '../../assets/images/DischargePatient/m3.png'
import m4 from '../../assets/images/DischargePatient/m4.png'
import m5 from '../../assets/images/DischargePatient/m5.png'


export default function DischargePatient() {


  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">

          <div className="row">
           
            <div className="col-md-8 col-sm-12 wt plt">
              
              <div className='whitebg'>
                <div className='cheifcProfile-in'>
                   <div className='cheifcProfile1'>
                     <div className='cheifp'><img src={profilepic}/></div>
                   </div>
                   <div className='cheifcProfile'>
                   <div className='cprp'>
                       <div className='cprp-in'>
                            <div className='cprp-in2'>
                             <div className='cprp-in21'><h3>Shiva Mishra</h3></div>
                             <div className='cprp-in21'><i className='fa fa-phone'></i></div>
                             <div className='cprp-in21'><i className='fa fa-envelope'></i></div>
                            </div>
                            <div className='cprp-in2'>
                             <div className='cprp-in3'><i className='fa fa-user'></i> Male</div>
                             <div className='cprp-in3'><i className='fa fa-calendar'></i> 12 Dec 1995 (28 yr)</div>
                             <div className='cprp-in3'><i className='fa fa-map-marker'></i> Saitiyapur Nijampur, Hardoi</div>
                            </div>
                        </div>
                        <div className='cprp-in desstaus'>
                          <h4>Discharge Status</h4>
                          <span>Stable</span>
                        </div>
                     </div>
                   <div className='cprp1'>
                       <div className='cprp1-in'><h4>Admission Date</h4><p>10 Aug 2023</p></div>
                       <div className='cprp1-in'><h4>Discharge Date</h4><p>01 Oct 2023</p></div>
                       <div className='cprp1-in'><h4>Treating Doctor</h4><p>Dr. Vijay Kumar Goel</p></div>
                       <div className='cprp1-in'><h4>Ward No.</h4><p>12</p></div>
                       <div className='cprp1-in'><h4>Bed No.</h4><p>16</p></div>
                     </div>
                   </div>
                </div>
              </div>

              <div className='whitebg'>
                <div className='didp_d'>
                  <h2>Diagnosis</h2>
                  <h4>Fracture both Bone Shaft Leg Right</h4>
                  <p className='notedp'>Note:</p>
                  <p>Hand Reconstruction Surgery 
                    <span className='spd'>(Time: 06/06/2023, 12:30 AM, Duration: 1 hr)</span>.
                     Hand Reconstruction Surgery done successfully. The surgery and it's 
                     alternatives were discussed with the patient. The patient tolerated the 
                     surgery well, with no complications. Any loculated adhesions 
                     were dissected and more purulent material was expressed. 
                     The abscess was explored thoroughly.</p>
                     <p className='notea'><strong>Name of Anesthetist :</strong>Dr. Vijay Kumar Goel</p>
                     <p className='notea'><strong>Type of Anesthesia :</strong>Local Anesthesia</p>
                </div>
              </div>

              <div className='whitebg'>
                <div className='didp_d cheifc'>
                  <h2>Chief Complaints/Medical History</h2>
                  <h4>H/O RTA 1 day back with no H/O LOC, ENT Bleed, Vomiting, Seizure</h4>
                </div>
              </div>

              <div className='medica'>

                <div className='medica-in'>
                  <div className='whitebgg'>
                  <div className='didp_d brt'>
                    <h2>Medication</h2>
                    <div className='inc brt'>
                      <table >
                        <tr className='didp_d2'>
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
                        </tr>
                        <tr className='didp_d2'>
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
                        </tr>
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
                      <table >
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
                      </table>
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
                  <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">Admission History</div>
                </div>
              </div>

              <div className='whitebg'>
                  <div className='didp_d'>
                    <h2>Insurance Summary</h2>
                  </div>
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

      </section>
    </>
  )
}
