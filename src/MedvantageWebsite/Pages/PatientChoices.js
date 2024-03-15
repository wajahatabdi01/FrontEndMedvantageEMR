import React, { useEffect, useRef, useState } from 'react';
import PostApiLogin from '../../../src/Login/API/PostApiLogin';
import ValidationLogin from '../../Validation/Clinical/Login/ValidationLogin';
import { useAsyncError, useNavigate } from 'react-router-dom';
import Loder from '../../Component/Loader';
import LoginImgLogo from '../../assets/images/LoginPage/RMD-Logo.png'
import AlertToster from '../../Component/AlertToster';
import medLogo from '../../assets/images/LoginPage/RMD-Logo-login.png';
import POSTVerifyOtp from '../../../src/Login/API/POSTVerifyOtp';
import ForgotPasswordApp from '../../Component/ForgotPasswordApp';
import PostChatCornCall from '../../../src/Login/API/PostChatCornCall';
import verificationGif from '../assest/image/119048-login-verification.gif';
import VerifyEmailOrMobile from '../API/POST/VerifyEmailOrMobile';
import title from '../../assets/images/icons/title.svg';
import user from '../../assets/images/icons/user (3).svg';
import calender from '../../assets/images/icons/calender.svg';
import gender from '../../assets/images/icons/gender.svg';
import maritalstatus from '../../assets/images/icons/maritalstatus.svg';
import card from '../../assets/images/icons/Idcard.svg';
import bill from '../../assets/images/icons/bill.svg';
import provider from '../../assets/images/icons/provider.svg';
import refer from '../../assets/images/icons/refer.svg';
import Pharmacy from '../../assets/images/icons/pharmacy2.svg';
import hippa from '../../assets/images/icons/hippa.svg';
import voice from '../../assets/images/icons/voice.svg';
import messages from '../../assets/images/icons/messages.svg';
import medal from '../../assets/images/icons/medal.svg';
import healthinfo from '../../assets/images/icons/healthinfo.svg';
import portal from '../../assets/images/icons/portal.svg';
import email from '../../assets/images/icons/email (2).svg';
import publicCode from '../../assets/images/icons/publicCode.svg';
import protection from '../../assets/images/icons/protection.svg';
import teamcare from '../../assets/images/icons/teamcare.svg';
import downArrow from '../../assets/images/icons/downArrow.svg';
import patientcategory from '../../assets/images/icons/patientcategory.svg';
import MultiStepFormProgressBar from '../../Component/MultiStepFormProgressBar'
import GetPatientData from '../../PatientPortal/API/GetPatientData';
import {Link} from "react-router-dom";


export default function PatientChoices() {
  const navigate = useNavigate();
  const [PatientData, setPatientData] = useState()
  const [sendForm, setsendForm] = useState({

    providerID: '',
    provider_since_date:  '',
    referring_Provider: '',
    pharmacy_id:  '',
    leave_message_with : '',
    hipaa_notice:  '',
    hipaa_voice:  '',
    allowSMS: '',
    allow_mail_message : '',
    hipaa_allowemail:  '',
    allow_imm_reg_use: '',
    Immun_Registry_status_Date: '',
    allow_imm_info_share: '',
    allow_health_info_ex: '',
    allow_patient_portal: '',
    prevent_api_access: false,
    public_code: '',
    public_code_effective_date: '',
    protection_indicator: '',
    protec_indicator_date: '',
    care_team: '',
    Care_Team_Status: '',
    Care_Team_facility: '',
    patient_category: '',

  })

  const [step, setStep] = useState(3);
  const totalSteps = 9;



  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setsendForm(prevData => ({
        ...prevData,
        [name]: value
    }));
  };


  

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      navigate("/Patientemployerdetail/"); 
    }
   
    
    };
  
    const handlePrevious = () => {
      if (step > 1) {
        setStep(step - 1);
      }
    }


    const Patientdata = async()=>{
      let data = await GetPatientData()
      if(data.status === 1){
        const patientRegistrationData = data.responseValue.patientregistration[0];
                 
                  setPatientData(patientRegistrationData);

                  setsendForm({
                    providerID: patientRegistrationData.providerID,
                    provider_since_date:  patientRegistrationData.provider_since_date,
                    referring_Provider: '',
                    pharmacy_id:  patientRegistrationData.pharmacy_id,
                    leave_message_with : patientRegistrationData.leave_message_with,
                    hipaa_notice:  patientRegistrationData.hipaa_notice,
                    hipaa_voice:  patientRegistrationData.hipaa_voice,
                    allowSMS: patientRegistrationData.allowSMS,
                    allow_mail_message : patientRegistrationData.allow_mail_message,
                    hipaa_allowemail:  patientRegistrationData.hipaa_allowemail,
                    allow_imm_reg_use: patientRegistrationData.allow_imm_reg_use,
                    Immun_Registry_status_Date: patientRegistrationData.Immun_Registry_status_Date,
                    allow_imm_info_share: patientRegistrationData.allow_imm_info_share,
                    allow_health_info_ex: patientRegistrationData.allow_health_info_ex,
                    allow_patient_portal: patientRegistrationData.allow_patient_portal,
                    prevent_api_access: patientRegistrationData.prevent_api_access,
                    public_code: patientRegistrationData.publicity_code,
                    public_code_effective_date: patientRegistrationData.publ_code_eff_date,
                    protection_indicator: patientRegistrationData.protect_indicator,
                    protec_indicator_date: patientRegistrationData.prot_indi_effdate,
                    care_team: patientRegistrationData.care_team_provider,
                    Care_Team_Status: patientRegistrationData.care_team_status,
                    Care_Team_facility: patientRegistrationData.care_team_facility,
                    patient_category: patientRegistrationData.categoryId,
                  })
      }
     }
     
     useEffect(() => {
       Patientdata()
     }, [])


    return (
   <>
     <div className="med-Patient-login-wrapper">
        <div className="Patient-registration-content-wrapper px-5 align-items-center">
            <div className="col-xxl-11 col-xl-12 col-lg-12 col-md-12 patient-registration-main-box  ">
            <div className="row col-12 registration-heading mt-5 pt-5">Demographic</div> 
            <div className="px-5">
            <MultiStepFormProgressBar currentStep={step} totalSteps={totalSteps} stepNames={['Who', 'Contact', 'Choices', 'Employer' , 'Stats', 'Misc' ,'Guardian' , 'Insurance']} />
              </div> 
           {step === 3 && (
             <div className="registration-form-box">
                <div className='form-info-heading'>Choices</div>
                <div className="row px-4 pt-4 patient-form-fields">

                 <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                <div class="" id="paymentModediv">
                    <label for="PaymentMode" class="form-label label-text"><img  src={provider} className="label-icons me-2" alt=''/>Provider</label>
                    <div class="dropdown-wrapper">
                     <img src={downArrow} className="dropdownimg" alt=""/>
                    <select class="form-control form-control-sm" value={sendForm.providerID} name='providerID' onChange={handleOnChange}>
                      <option value="0" selected>Unassigned</option>
                      <option value="153">Demo</option>
                      <option value="2">Example</option>
                      
                    </select>
                    </div>
                  </div>
                         
                </div>

                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={calender} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Providing Since</label>
                   <input type="date"class="form-control form-control-sm" value={PatientData&&PatientData.provider_since_date} id="firstName" placeholder="Enter First Name" name="provider_since_date" onChange={handleOnChange}/>
                   </div>
                   <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={refer} className="label-icons me-2" alt=''/>Referring Provider</label>
                            <div class="dropdown-wrapper">
                             <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" value={sendForm.referring_Provider} name='referring_Provider' onChange={handleOnChange}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>
                   <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={Pharmacy} className="label-icons me-2" alt=''/>Pharmacy</label>
                            <div class="dropdown-wrapper">
                         <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" value={sendForm.pharmacy_id} name='pharmacy_id' onChange={handleOnChange}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>
                   <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={hippa} className="label-icons me-2" alt=''/>HIPPA Notice Received</label>
                            <div class="dropdown-wrapper">
                         <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" value={sendForm.hipaa_notice} name='hipaa_notice' onChange={handleOnChange}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>
                   <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={voice} className="label-icons me-2" alt=''/>Allow Voice Message</label>
                            <div class="dropdown-wrapper">
                             <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" value={sendForm.hipaa_voice}  name='hipaa_voice' onChange={handleOnChange}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>
                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={messages} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Leave Message With</label>
                   <input type="text"class="form-control form-control-sm" id="firstName" placeholder="Leave Message With" value={sendForm.leave_message_with} name="leave_message_with" onChange={handleOnChange} />
                   </div>
                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={email} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Allow Mail Message</label>
                   <input type="text"class="form-control form-control-sm" id="firstName" placeholder="Allow Mail Message" value={sendForm.allow_mail_message} name="allow_mail_message" onChange={handleOnChange}/>
                   </div>
                   <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={messages} className="label-icons me-2" alt=''/>Allow SMS</label>
                            <div class="dropdown-wrapper">
                         <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" value={sendForm.allowSMS} name='allowSMS' onChange={handleOnChange}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>
                   <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={email} className="label-icons me-2" alt=''/>Allow Email</label>
                            <div class="dropdown-wrapper">
                         <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" value={sendForm.hipaa_allowemail} name='hipaa_allowemail' onChange={handleOnChange}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={medal} className="label-icons me-2" alt=''/>Allow Immunization Registry</label>
                            <div class="dropdown-wrapper">
                         <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" value={sendForm.allow_imm_reg_use} name='allow_imm_reg_use' onChange={handleOnChange}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={medal} className="label-icons me-2" alt=''/>Allow Immunization info sharing</label>
                            <div class="dropdown-wrapper">
                         <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" value={sendForm.allow_imm_info_share} name='allow_imm_info_share' onChange={handleOnChange}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>


                       <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={healthinfo} className="label-icons me-2" alt=''/>Allow Health Info. Exchange</label>
                            <div class="dropdown-wrapper">
                         <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" value={sendForm.allow_health_info_ex} name='allow_health_info_ex' onChange={handleOnChange}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>
                    

                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={portal} className="label-icons me-2" alt=''/>Allow Patient Portal</label>
                            <div class="dropdown-wrapper">
                         <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" value={sendForm.allow_patient_portal} name='allow_patient_portal' onChange={handleOnChange}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>
                   


                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={calender} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text"> Immun. Registry status Date</label>
                   <input type="date"class="form-control form-control-sm" id="firstName"  name="Immun_Registry_status_Date" value={sendForm.Immun_Registry_status_Date} onChange={handleOnChange} />
                   </div>

                   <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-6 px-1 ms-4 d-flex align-items-center justify-content-center regularCheck">
                      <div className="d-flex column-gap-3 mt-2 me-3">
                        <label htmlFor="apiPrevent" className="form-label label-text">Prevent API Access<span className="starMandatory"></span></label>
                        <div className="form-check">
                          <input  id="apiPrevent" name="prevent_api_access" className="form-check-input" type="checkbox" value={sendForm.prevent_api_access}  onChange={handleOnChange} style={{height: '15px'}} />
                        </div>

                      </div>
                    </div >
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={publicCode} className="label-icons me-2" alt=''/>Public Code</label>
                            <div class="dropdown-wrapper">
                         <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" name='public_code' value={sendForm.public_code} onChange={handleOnChange}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>

                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={calender} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Publicity Code Effective Date</label>
                   <input type="date"class="form-control form-control-sm" id="firstName" placeholder="Enter Birth Middle Name" name="public_code_effective_date"  value={sendForm.public_code_effective_date} onChange={handleOnChange}/>
                   </div>
              
                   <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={protection} className="label-icons me-2" alt=''/>Protection Indicator</label>
                            <div class="dropdown-wrapper">
                           <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" value={sendForm.protection_indicator} name="protection_indicator" onChange={handleOnChange}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>

                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={calender} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Protec. Indicator effect. date</label>
                   <input type="date"class="form-control form-control-sm" id="firstName"  name="protec_indicator_date" value={sendForm.protec_indicator_date} onChange={handleOnChange} />
                   </div>


                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-2">
                   <img  src={teamcare} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Care Team (Provider)</label>
                   <input type="text"class="form-control form-control-sm" id="firstName" placeholder="Enter Name" name="care_team" value={sendForm.care_team} onChange={handleOnChange} />
                   </div>

                  

                   <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={teamcare} className="label-icons me-2" alt=''/>Care Team Status</label>
                            <div class="dropdown-wrapper">
                         <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" value={sendForm.Care_Team_Status} name='Care_Team_Status' onChange={handleOnChange}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>

                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={teamcare} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Care Team (Facility)</label>
                   <input type="text"class="form-control form-control-sm" id="firstName" placeholder="Enter Name" name="Care_Team_facility" value={sendForm.Care_Team_facility} onChange={handleOnChange} />
                   </div>
                        

                   <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={patientcategory} className="label-icons me-2" alt=''/>Patient Categories</label>
                            <div class="dropdown-wrapper">
                         <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" value={sendForm.patient_category} name='patient_category' onChange={handleOnChange}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>
                  

                </div>


                 

             </div>
           )}
            
             <div className="row px-4 pt-4 mb-5 pb-5">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 already-has-acc">If you already have an account<span className="ms-1 login-already-acc pointer"><a className="login-already-acc" href="/PatientLogin/">LOGIN</a></span></div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 d-flex justify-content-end">
                        <div>
                           <Link className="text-white text-decoration-none" to="/PatientContact/"><button type="button" className="btn btn-clear btn-sm mb-1 me-1"><i class="bi bi-chevron-double-left me-2"></i>Previous</button></Link>
                           <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleNext}><i class="bi bi-chevron-double-right me-2"></i>Next</button>
                        </div>
                    </div>
                  </div>

            </div>
        

 
       
        </div>
      </div>
   
   </>
    )
}
