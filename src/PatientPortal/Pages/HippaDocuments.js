import React,{ useEffect, useState } from 'react'
import Loder from '../../Component/Loader';
import time from '../../assets/images/icons/time.png';

export default function HippaDocuments() {



  const [showLoder, setShowLoder] = useState(0);
 

 

 
  return (
   <>
    <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-12">
              <div className="med-box" style={{minHeight: '870px'}}>
                <div className="inner-content">
               <div className="d-flex justify-content-between align-items-center mt-2">
                <div className='declaration-heading'>HIPAA Declaration</div>
                <div className='declaration-time'><img src={time} alt=''/>17 Nov, 23 05:55:19</div>
               </div>
               <div className='horizontal-line declaration-line'></div>

                    <div className="row mt-2 mb-1">
                        <div className='declaration-top-text'>
                        OpenEMR Software makes it a priority to keep this piece of software updated with the most recent available security options, so it will integrate easily into a HIPAA compliant practice and will protect our customers with at least the official HIPAA regulations.
                        </div>
                    </div>

                    <div className="row">
                        <div className='decalaration-practice-text'>The Practice: </div>
                        <div>
                            <li className='declaration-practice-list'>Is required by federal law to maintain the privacy of your PHI and to provide you with this Privacy Notice detailing the Practice's legal duties and privacy practices with respect to your PHI.</li>
                            <li className='declaration-practice-list'>Under the Privacy Rule, it may be required by other laws to grant greater access or maintain greater restrictions on the use of, or release of your PHI than that which is provided for under federal HIPAA laws.</li>
                            <li className='declaration-practice-list'>Is required to abide by the terms of the Privacy Notice</li>
                            <li className='declaration-practice-list'>Reserves the right to change the terms of this Privacy Notice and make new Privacy Notice provisions effective for all of your PHI that it maintains if needed.</li>
                            <li className='declaration-practice-list'>Will distribute any revised Privacy Notice to you prior to implementation.</li>
                            <li className='declaration-practice-list'>Will not retaliate against you for filing a complaint.</li>
                        </div>
                    </div>
                    <div className="row mt-2">
                        <div className='decalaration-practice-text'>Patient Communications: </div>
                        <div className='declaration-top-text'>Health Insurance Privacy Act 1996 USA, requires to inform you of the following government stipulations in order for us to contact you with educational and promotionalitems in the future via e-mail, U.S. mail, telephone, and/or prerecorded messages. We will not share, sell, or use your personal contact information for spam messages.</div>
                        <div className='declaration-top-text'>1'm aware and have read the policies of this practice towards secrecy and digital information protection:</div>
                        <div>
                            <li className='declaration-practice-list'>The Practice set up their User accounts for the Open EMR databases, so it requires Users to log in with a password.</li>
                            <li className='declaration-practice-list'>The User have to exit or log out of any medical information when not using it or as soon as Default timeout is reached.</li>
                            <li className='declaration-practice-list'>When using this medical information registration in front of patients the User should use the "Privacy" feature to hide PHI (Personal Health Information) for other patients in the Search screen.</li>
                            <li className='declaration-practice-list'>Reserves the right to change the terms of this Privacy Notice and make new Privacy Notice provisions effective for all of your PHI that it maintains if needed.</li>
                            <li className='declaration-practice-list'>We have developed and will use standard operating procedures (SOPs) requiring any use of the Export Patients Medical or other information to be documented. Users are only allowed to store a copy of your Medical information on a laptop computer or other portable media that is taken outside The Practice if recorded in writing. By signing out of The Practice with any portable device or transport medium this information is to be erased when finished with the need to take this information out of The Practice, if possible this information is only to be taken outside The Practice in encrypted format. Only specific technicians may have occasional access to our hardware and Software. The HIPAA Privacy Rule requires that a practice have a signed Business Associate Contract before granting such access. The Technicians are trained on HIPAA regulations and limit the use and disclosure of customer data to the minimum necessary.</li>
                            
                        </div>
                    </div>


               

                    <div className="row mt-2">
                    <div className='decalaration-practice-text mb-1'>I acknowledge receipt of this notice, have read the contents and understand the content.</div>
                    </div>
                    <div className="patient-self-agreement-pname">Patient Name  :<span className='patient-details'>Shiva Mishra Sex: Male hereby signs and agree to the terms of this agreement .</span></div>


                    <div className='col-xxl-12 col-xl-12 col-lg-12 col-md-12 d-flex flex-wrap'>
                
                        <div className='col-xxl-3 col-xl-6 col-lg-12 col-md-12'>
                            <div className="patient-self-agreement-pname">Our external ID : <span className='patient-details'>123</span></div>
                            <div className="patient-self-agreement-pname">Mobile No : <span className='patient-details'>9087877896</span></div>
                            <div className="patient-self-agreement-pname d-flex align-items-center">I do not accept these terms:<div className='ms-2 mt-1'><input type='checkbox' className='declaration-check'></input></div></div>
                        </div>

                        <div className='col-xxl-6 col-xl-6 col-lg-12 col-md-12'>
                            <div className="patient-self-agreement-pname">Home Address : <span className='patient-details'>Saitiyapur Nijampur, Hardoi</span></div>
                            <div className="patient-self-agreement-pname">Patient Signature : <span className='patient-details'>Click in Signature</span></div>
                            <div className="patient-self-agreement-pname d-flex align-items-center">Patient refusal to sign due to the following reason: <div className='ms-2 mt-1'><input type='text' className='reason-input' placeholder='Enter Reason'></input></div></div>
                        
                        </div>
                    </div>
                
                
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* -----------------------Start Delete Modal Popup-------------------    */}

        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
          <div className="modal-dialog modalDelete">
            <div className="modal-content">
              <div className="modal-body modelbdy text-center">
                <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                <div className='popDeleteTitle mt-3'> Delete?</div>
                <div className='popDeleteContent'> Are you sure you want to delete?</div>
              </div>
              <div className="modal-footer1 text-center">

                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">Cancel</button>
                
              </div>
            </div>
          </div>
        </div>
        {/* -----------------------End Delete Modal Popup---------------------  */}
        {
          showLoder === 1 ? <Loder val={showLoder} /> : ""
        }
      </section>



   </>
  )
}
