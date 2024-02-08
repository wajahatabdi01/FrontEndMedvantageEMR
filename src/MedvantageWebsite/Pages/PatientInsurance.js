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
import phone from '../../assets/images/icons/phone.svg';
import patientcategory from '../../assets/images/icons/patientcategory.svg';
import countrymap from '../../assets/images/icons/countrymap.svg';
import country from '../../assets/images/icons/country.svg';
import report from '../../assets/images/icons/report.svg';
import address from '../../assets/images/icons/address.svg';
import saveButtonIcon from '../../assets/images/icons/saveButton.svg';
import {Link} from "react-router-dom";


export default function PatientInsurance() {




    return (
   <>
     <div className="med-Patient-login-wrapper">
        <div className="Patient-registration-content-wrapper px-5 align-items-center">
            <div className="col-xxl-11 col-xl-12 col-lg-12 col-md-12 patient-registration-main-box  ">
            <div className="row col-12 registration-heading mt-5 pt-5">Patient Registration</div> 

             <div className="registration-form-box">
                <div className='form-info-heading'>Insurance</div>
                <div className="row px-4 pt-4 patient-form-fields">

                 <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                <div class="" id="paymentModediv">
                    <label for="PaymentMode" class="form-label label-text"><img  src={report} className="label-icons me-2" alt=''/>Primary Insurance Provider<span class="starMandatory position-static">*</span></label>
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

                <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={report} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Plan Name<span class="starMandatory position-static">*</span></label>
                    <input type="text"class="form-control form-control-sm" id="firstName" placeholder="Enter First Name" name="firstName" />
                   </div>

             


                <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={user} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Subscriber<span class="starMandatory position-static">*</span></label>
                   <input type="text"class="form-control form-control-sm" id="firstName" placeholder="Enter Subscriber" name="firstName" />
                   </div>
                <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={calender} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Efective Date<span class="starMandatory position-static">*</span></label>
                   <input type="date"class="form-control form-control-sm" id="firstName" placeholder="Enter Last Name" name="firstName" />
                   </div>
                   <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={refer} className="label-icons me-2" alt=''/>Relationship<span class="starMandatory position-static">*</span></label>
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

                        <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={calender} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Policy Number<span class="starMandatory position-static">*</span></label>
                    <input type="text"class="form-control form-control-sm" id="firstName" placeholder="Enter First Name" name="firstName" />
                   </div>
                        <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={calender} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Date of Bith<span class="starMandatory position-static">*</span></label>
                    <input type="date"class="form-control form-control-sm" id="firstName" placeholder="Enter First Name" name="firstName" />
                   </div>
                        <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={phone} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Group Number<span class="starMandatory position-static">*</span></label>
                    <input type="number"class="form-control form-control-sm" id="firstName" placeholder="Enter Group Number" name="firstName" />
                   </div>


                   <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={user} className="label-icons me-2" alt=''/>S.S<span class="starMandatory position-static">*</span></label>
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
                        <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={user} className="label-icons me-2" alt=''/>Subscriber Employer(SE)<span class="starMandatory position-static">*</span></label>
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
                        <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={gender} className="label-icons me-2" alt=''/>Sex<span class="starMandatory position-static">*</span></label>
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


                       <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={address} className="label-icons me-2" alt=''/>SE Address<span class="starMandatory position-static">*</span></label>
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
                    

                        <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        <label for="PaymentMode" class="form-label label-text"><img  src={address} className="label-icons me-2" alt=''/>Subscriber Address Line 1<span class="starMandatory position-static">*</span></label>
                    <input type="number"class="form-control form-control-sm" id="firstName" placeholder="Enter Subscriber Address Line 1" name="firstName" />
                        </div> 
                        <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        <label for="PaymentMode" class="form-label label-text"><img  src={address} className="label-icons me-2" alt=''/>Subscriber Address Line 2<span class="starMandatory position-static">*</span></label>
                    <input type="number"class="form-control form-control-sm" id="firstName" placeholder="Enter Subscriber Address Line 2" name="firstName" />
                        </div> 


                        <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={countrymap} className="label-icons me-2" alt=''/>SE City<span class="starMandatory position-static">*</span></label>
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
                        <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={countrymap} className="label-icons me-2" alt=''/>City<span class="starMandatory position-static">*</span></label>
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
                   


            
                    <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={countrymap} className="label-icons me-2" alt=''/>SE State<span class="starMandatory position-static">*</span></label>
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
                    <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={countrymap} className="label-icons me-2" alt=''/>State<span class="starMandatory position-static">*</span></label>
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

                <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={country} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">SE Zip Code<span class="starMandatory position-static">*</span></label>
                   <input type="number"class="form-control form-control-sm" id="firstName" placeholder="Enter SE Zip Code" name="firstName" />
                   </div>
                <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={country} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Zip Code<span class="starMandatory position-static">*</span></label>
                   <input type="number"class="form-control form-control-sm" id="firstName" placeholder="Enter Zip Code" name="firstName" />
                   </div>
              
                   <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={countrymap} className="label-icons me-2" alt=''/>SE Country<span class="starMandatory position-static">*</span></label>
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
                   <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={countrymap} className="label-icons me-2" alt=''/>Country<span class="starMandatory position-static">*</span></label>
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

                <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={phone} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Subscriber phone<span class="starMandatory position-static">*</span></label>
                   <input type="number"class="form-control form-control-sm" id="firstName" placeholder="Enter Number" name="firstName" />
                   </div>


                <div className="col-xxl-3 col-overwrite  col-xl-3 col-lg-3 col-md-6 mb-3 px-2">
                   <img  src={teamcare} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Co-Pay<span class="starMandatory position-static">*</span></label>
                   <input type="text"class="form-control form-control-sm" id="firstName" placeholder="Enter Co-Pay" name="firstName" />
                   </div>

                  

                   <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={user} className="label-icons me-2" alt=''/>Accept Assignment<span class="starMandatory position-static">*</span></label>
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

                        {/* <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={teamcare} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Care Team (Facility)<span class="starMandatory position-static">*</span></label>
                   <input type="text"class="form-control form-control-sm" id="firstName" placeholder="Enter Name" name="firstName" />
                   </div>
                        

                   <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
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
                                 
                        </div> */}
                  

                </div>


                 

             </div>
             <div className="row px-4 pt-4 mb-5 pb-5">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 already-has-acc">If you already have an account<span className="ms-1 login-already-acc pointer"><a className="login-already-acc" href="/PatientLogin/">LOGIN</a></span></div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 d-flex justify-content-end">
                        <div>
                           <Link className="text-white text-decoration-none" to="/Patientgurdiandetail/"><button type="button" className="btn btn-clear btn-sm mb-1 me-1"><i class="bi bi-chevron-double-left me-2"></i>Previous</button></Link>
                            <Link className="text-white text-decoration-none" to=""><button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1"><img src={saveButtonIcon} className='icnn' alt=""/>Save</button></Link>
                        </div>
                    </div>
                  </div>

            </div>
        

 
       
        </div>
      </div>
   
   </>
    )
}
