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

  const [step, setStep] = useState(3);
  const totalSteps = 9;

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
       setPatientData(data.responseValue.patientregistration[0])
       console.log("Patientdata>>" , data.responseValue.patientregistration)
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
            <div className="row col-12 registration-heading mt-5 pt-5">Patient Registration</div> 
            <div className="px-5">
            <MultiStepFormProgressBar currentStep={step} totalSteps={totalSteps} stepNames={['Who', 'Contact', 'Choices', 'Employer' , 'Stats', 'Misc' ,'Guardian' , 'Insurance']} />
              </div> 
           {step === 3 && (
             <div className="registration-form-box">
                <div className='form-info-heading'>Choices</div>
                <div className="row px-4 pt-4 patient-form-fields">

                 <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                <div class="" id="paymentModediv">
                    <label for="PaymentMode" class="form-label label-text"><img  src={provider} className="label-icons me-2" alt=''/>Provider<span class="starMandatory position-static">*</span></label>
                    <div class="dropdown-wrapper">
                     <img src={downArrow} className="dropdownimg" alt=""/>
                    <select class="form-control form-control-sm" value={PatientData&&PatientData.providerID}>
                      <option value="0" selected>Unassigned</option>
                      <option value="153">Demo</option>
                      <option value="2">Example</option>
                      
                    </select>
                    </div>
                  </div>
                         
                </div>

                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={calender} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Providing Since<span class="starMandatory position-static">*</span></label>
                   <input type="date"class="form-control form-control-sm" value={PatientData&&PatientData.provider_since_date} id="firstName" placeholder="Enter First Name" name="firstName" />
                   </div>
                   <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={refer} className="label-icons me-2" alt=''/>Referring Provider<span class="starMandatory position-static">*</span></label>
                            <div class="dropdown-wrapper">
                             <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm">
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>
                   <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={Pharmacy} className="label-icons me-2" alt=''/>Pharmacy<span class="starMandatory position-static">*</span></label>
                            <div class="dropdown-wrapper">
                         <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" value={PatientData&&PatientData.pharmacy_id}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>
                   <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={hippa} className="label-icons me-2" alt=''/>HIPPA Notice Received<span class="starMandatory position-static">*</span></label>
                            <div class="dropdown-wrapper">
                         <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" value={PatientData && PatientData.hipaa_notice}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>
                   <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={voice} className="label-icons me-2" alt=''/>Allow Voice Message<span class="starMandatory position-static">*</span></label>
                            <div class="dropdown-wrapper">
                             <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" value={PatientData && PatientData.hipaa_voice}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>
                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={messages} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Leave Message With<span class="starMandatory position-static">*</span></label>
                   <input type="text"class="form-control form-control-sm" id="firstName" placeholder="Leave Message With" name="firstName" />
                   </div>
                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={email} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Allow Mail Message<span class="starMandatory position-static">*</span></label>
                   <input type="text"class="form-control form-control-sm" id="firstName" placeholder="Allow Mail Message" name="firstName" />
                   </div>
                   <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={messages} className="label-icons me-2" alt=''/>Allow SMS<span class="starMandatory position-static">*</span></label>
                            <div class="dropdown-wrapper">
                         <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" value={PatientData&&PatientData.allowSMS}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>
                   <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={email} className="label-icons me-2" alt=''/>Allow Email<span class="starMandatory position-static">*</span></label>
                            <div class="dropdown-wrapper">
                         <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" value={PatientData&&PatientData.hipaa_allowemail}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={email} className="label-icons me-2" alt=''/>Allow Immunization Registry<span class="starMandatory position-static">*</span></label>
                            <div class="dropdown-wrapper">
                         <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" value={PatientData&&PatientData.allow_imm_reg_use}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={email} className="label-icons me-2" alt=''/>Allow Immunization info sharing<span class="starMandatory position-static">*</span></label>
                            <div class="dropdown-wrapper">
                         <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" value={PatientData&&PatientData.allow_imm_info_share}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>


                       <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={email} className="label-icons me-2" alt=''/>Allow Health Info. Exchange<span class="starMandatory position-static">*</span></label>
                            <div class="dropdown-wrapper">
                         <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" value={PatientData&&PatientData.allow_health_info_ex}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>
                    

                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={email} className="label-icons me-2" alt=''/>Allow Patient Portal<span class="starMandatory position-static">*</span></label>
                            <div class="dropdown-wrapper">
                         <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" value={PatientData&&PatientData.allow_patient_portal}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>
                   


                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={calender} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text"> Immun. Registry status Date<span class="starMandatory position-static">*</span></label>
                   <input type="date"class="form-control form-control-sm" id="firstName" placeholder="Enter Birth Middle Name" name="firstName" />
                   </div>

                   <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-6 px-1 ms-4 d-flex align-items-center justify-content-center regularCheck">
                      <div className="d-flex column-gap-3 mt-2 me-3">
                        <label htmlFor="apiPrevent" className="form-label label-text">Prevent API Access<span className="starMandatory"></span></label>
                        <div className="form-check">
                          <input  id="apiPrevent" name="apiPrevent" className="form-check-input" type="checkbox" style={{height: '15px'}} />
                        </div>

                      </div>
                    </div >
                    <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={email} className="label-icons me-2" alt=''/>Allow Email<span class="starMandatory position-static">*</span></label>
                            <div class="dropdown-wrapper">
                         <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm">
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>

                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={calender} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Publicity Code Effective Date<span class="starMandatory position-static">*</span></label>
                   <input type="date"class="form-control form-control-sm" id="firstName" placeholder="Enter Birth Middle Name" name="firstName" />
                   </div>
              
                   <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={email} className="label-icons me-2" alt=''/>Allow Email<span class="starMandatory position-static">*</span></label>
                            <div class="dropdown-wrapper">
                         <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm">
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>

                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={calender} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Protec. Indicator effect. date<span class="starMandatory position-static">*</span></label>
                   <input type="date"class="form-control form-control-sm" id="firstName" placeholder="Enter Birth Last Name" name="firstName" />
                   </div>


                <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-2">
                   <img  src={teamcare} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Care Team (Provider)<span class="starMandatory position-static">*</span></label>
                   <input type="text"class="form-control form-control-sm" id="firstName" placeholder="Enter Name" name="firstName" />
                   </div>

                  

                   <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={email} className="label-icons me-2" alt=''/>Allow Email<span class="starMandatory position-static">*</span></label>
                            <div class="dropdown-wrapper">
                         <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm">
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Demo</option>
                              <option value="2">Example</option>
                              
                            </select>
                            </div>
                          </div>
                                 
                        </div>

                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={teamcare} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Care Team (Facility)<span class="starMandatory position-static">*</span></label>
                   <input type="text"class="form-control form-control-sm" id="firstName" placeholder="Enter Name" name="firstName" />
                   </div>
                        

                   <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={email} className="label-icons me-2" alt=''/>Allow Email<span class="starMandatory position-static">*</span></label>
                            <div class="dropdown-wrapper">
                         <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm">
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
