import React, { useEffect, useRef, useState } from 'react';
import {Link} from "react-router-dom";
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
import address from '../../assets/images/icons/address.svg';
import location from '../../assets/images/icons/location.svg';
import country from '../../assets/images/icons/country.svg';
import countrymap from '../../assets/images/icons/countrymap.svg';
import lady from '../../assets/images/icons/lady.svg';
import phone from '../../assets/images/icons/phone.svg';
import downArrow from '../../assets/images/icons/downArrow.svg';
import plusbtn from '../../assets/images/icons/plusbtn.svg';
import email from '../../assets/images/icons/email (2).svg';
import MultiStepFormProgressBar from '../../Component/MultiStepFormProgressBar'


export default function PatientContact() {

  const navigate = useNavigate();

  const [step, setStep] = useState(2);
  const totalSteps = 8;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      navigate("/PatientChoices/"); 
    }
   
    
    };
  
    const handlePrevious = () => {
      if (step > 1) {
        setStep(step - 1);
      }
    }


    return (
   <>
     <div className="med-Patient-login-wrapper">
        <div className="Patient-registration-content-wrapper px-5">
            <div className="col-xxl-11 col-xl-12 col-lg-12 col-md-12 patient-registration-main-box">
            <div className="row col-12 registration-heading mt-5 pt-5">Patient Registration</div> 
            <div className="px-5">
               <MultiStepFormProgressBar currentStep={step} totalSteps={totalSteps} />
              </div> 
           
            {step === 2 &&(
                <div className="registration-form-box">
                <div className='form-info-heading'>Contact</div>
                <div className="row px-4 pt-4 patient-form-fields pb-4">

                

                <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={address} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Address<span class="starMandatory position-static">*</span></label>
                   <input type="text"class="form-control form-control-sm" id="firstName" placeholder="Enter Address" name="firstName" />
                   </div>
                <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={address} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Address Line 2 <span class="starMandatory position-static">*</span></label>
                   <input type="text"class="form-control form-control-sm" id="firstName" placeholder="Enter Address Line 2" name="firstName" />
                   </div>
                   <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                        <div class="plus-button-container">
                              <button class="plus-button">+</button>
                         </div>
                            <label for="PaymentMode" class="form-label label-text"><img  src={location} className="label-icons me-2" alt=''/>City<span class="starMandatory position-static">*</span></label>
                            <div class="dropdown-wrapper">
                          <img src={downArrow} className="downarrowwithplus" alt=""/>
                            <select class="form-control form-control-sm">
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Lucknow</option>
                              <option value="2">Siwan</option>
                              <option value="3">Patna</option>
                              <option value="4">Mumbai</option>
                            </select>
                            </div>
                          </div>
                                 
                        </div> 
                   <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                        <div class="plus-button-container">
                              <button class="plus-button">+</button>
                         </div>
                            <label for="PaymentMode" class="form-label label-text"><img  src={title} className="label-icons me-2" alt=''/>State<span class="starMandatory position-static">*</span></label>
                            <div class="dropdown-wrapper">
                         <img src={downArrow} className="downarrowwithplus" alt=""/>
                            <select class="form-control form-control-sm">
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Uttar Pradesh</option>
                              <option value="2">Delhi</option>
                              <option value="3">Bihar</option>
                              <option value="4">Maharastra</option>
                            </select>
                            </div>
                          </div>
                                 
                        </div> 

                        <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={country} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Postal Code <span class="starMandatory position-static">*</span></label>
                   <input type="number"class="form-control form-control-sm" id="firstName" placeholder="Enter Postal Code" name="firstName" />
                   </div>
                   <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                        <div class="plus-button-container">
                              <button class="plus-button">+</button>
                         </div>
                            <label for="PaymentMode" class="form-label label-text"><img  src={countrymap} className="label-icons me-2" alt=''/>Country<span class="starMandatory position-static">*</span></label>
                            <div class="dropdown-wrapper">
                         <img src={downArrow} className="downarrowwithplus" alt=""/>
                            <select class="form-control form-control-sm">
                              <option value="0" selected>Unassigned</option>
                              <option value="1">India</option>
                              <option value="2">Pakistan</option>
                              <option value="3">Sri Lanka</option>
                              <option value="4">USA</option>
                            </select>
                            </div>
                          </div>
                                 
                        </div> 
                <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={lady} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Mother's Name <span class="starMandatory position-static">*</span></label>
                   <input type="text"class="form-control form-control-sm" id="firstName" placeholder="Enter Mother's Name" name="firstName" />
                   </div>
                <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={phone} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Emergency Contact<span class="starMandatory position-static">*</span></label>
                   <input type="number"class="form-control form-control-sm" id="firstName" placeholder="Enter Emergency Contact" name="firstName" />
                   </div>
                <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={phone} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text"> Emergency Phone<span class="starMandatory position-static">*</span></label>
                   <input type="text"class="form-control form-control-sm" id="firstName" placeholder="Enter Emergency Phone Number" name="firstName" />
                   </div>
                <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={phone} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text"> Home Number <span class="starMandatory position-static">*</span></label>
                   <input type="number"class="form-control form-control-sm" id="firstName" placeholder="Enter Home Number" name="firstName" />
                   </div>
                <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-2">
                   <img  src={phone} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Work Number<span class="starMandatory position-static">*</span></label>
                   <input type="number"class="form-control form-control-sm" id="firstName" placeholder="Enter Birth Last Name" name="firstName" />
                   </div>

                   {/* <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={gender} className="label-icons me-2" alt=''/>Sex<span class="starMandatory position-static">*</span></label>
                            <select class="form-control form-control-sm">
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Male</option>
                              <option value="2">Female</option>
                              <option value="3">Transgender</option>
                              <option value="4">Other</option>
                            </select>
                          </div>
                                 
                        </div>

                   <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={gender} className="label-icons me-2" alt=''/>Gender Identity<span class="starMandatory position-static">*</span></label>
                            <select class="form-control form-control-sm">
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Male</option>
                              <option value="2">Female</option>
                              <option value="3">Transgender</option>
                              <option value="4">Other</option>
                            </select>
                          </div>
                                 
                        </div>
                   <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={gender} className="label-icons me-2" alt=''/>Sexual Orientation<span class="starMandatory position-static">*</span></label>
                            <select class="form-control form-control-sm">
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Male</option>
                              <option value="2">Female</option>
                              <option value="3">Transgender</option>
                              <option value="4">Other</option>
                            </select>
                          </div>
                                 
                        </div>
                   <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={maritalstatus} className="label-icons me-2" alt=''/>Martial Status<span class="starMandatory position-static">*</span></label>
                            <select class="form-control form-control-sm">
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Married</option>
                              <option value="2">Unmarried</option>
                            
                            </select>
                          </div>
                                 
                        </div> */}



                        <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={phone} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Mobile Number <span class="starMandatory position-static">*</span></label>
                   <input type="number"class="form-control form-control-sm" id="firstName" placeholder="Enter Mobile Number" name="firstName" />
                   </div>
                        <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={email} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Contact Email<span class="starMandatory position-static">*</span></label>
                   <input type="text"class="form-control form-control-sm" id="firstName" placeholder="Enter Contact Email" name="firstName" />
                   </div>
                        <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={email} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Trusted Email<span class="starMandatory position-static">*</span></label>
                   <input type="text"class="form-control form-control-sm" id="firstName" placeholder="Enter Trusted Email" name="firstName" />
                   </div>


{/* 
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={user} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">User Defined<span class="starMandatory position-static">*</span></label>
                   <input type="text"class="form-control form-control-sm" id="firstName" placeholder="Enter User Defined" name="firstName" />
                   </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={bill} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Billing Note<span class="starMandatory position-static">*</span></label>
                   <input type="text"class="form-control form-control-sm" id="firstName" placeholder="Enter Billing Note" name="firstName" />
                   </div>
                        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={user} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Previous Names<span class="starMandatory position-static">*</span></label>
                   <input type="text"class="form-control form-control-sm" id="firstName" placeholder="Enter Previous Name" name="firstName" />
                   </div> */}



                </div>


                <div class="horizontal-line-contact"></div>
                <div className="another-address-head ps-4">Additional Address<img className="ms-2" src={plusbtn} alt =""/></div>

             </div>
            )}

           
             <div className="row px-4 pt-4 mb-5 pb-5">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 already-has-acc">If you already have an account<span className="ms-1 login-already-acc pointer"><a className="login-already-acc" href="/PatientLogin/">LOGIN</a></span></div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 d-flex justify-content-end">
                        <div>
                            <button type="button" className="btn btn-clear btn-sm mb-1 me-1"><i class="bi bi-chevron-double-left me-2"></i><Link className="text-decoration-none" to="/PatientRegistration/">Previous</Link></button>
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