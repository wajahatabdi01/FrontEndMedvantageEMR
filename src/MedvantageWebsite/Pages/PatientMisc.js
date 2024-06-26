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
import industry from '../../assets/images/icons/industry.svg';
import pen from '../../assets/images/icons/pen.svg';

import email from '../../assets/images/icons/email (2).svg';
import MultiStepFormProgressBar from '../../Component/MultiStepFormProgressBar'


export default function PatientMisc() {
  const navigate = useNavigate();

  const [step, setStep] = useState(6);
  const [showNextForm, setShowNextForm] = useState(false);
  const totalSteps = 9;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
      navigate("/Patientgurdiandetail/"); 
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
            <div className="col-xxl-11 col-xl-12 col-lg-12 col-md-12 patient-registration-main-box mt-5 pt-3 ">
            <div className="row col-12 registration-heading">Demographic</div> 
            <div className="px-5">
            <MultiStepFormProgressBar currentStep={step} totalSteps={totalSteps} stepNames={['Who', 'Contact', 'Choices', 'Employer' , 'Stats', 'Misc' ,'Guardian' , 'Insurance']} />
              </div> 
            {step === 6 && (
                 <div className="registration-form-box">
                <div className='form-info-heading'>Misc</div>
                <div className="row px-4 pt-4 patient-form-fields pb-4">

                <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={calender} className="label-icons me-2" alt=''/><label for="Occupation" class="form-label label-text">Date Deceased<span class="starMandatory position-static">*</span></label>
                   <input type="date"class="form-control form-control-sm" id="Occupation" placeholder="Enter Occupation" name="firstName" />
                   </div>

                        <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={pen} className="label-icons me-2" alt=''/><label for="UHID" class="form-label label-text">Reason Deceased<span class="starMandatory position-static">*</span></label>
                   <input type="text"class="form-control form-control-sm" id="EmployerName" placeholder="Enter Reason" name="EmployerName" />
                   </div>
                </div>

             </div> 
            )}
           
             <div className="row px-4 pt-4">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 already-has-acc">If you already have an account<span className="ms-1 login-already-acc pointer"><a className="login-already-acc" href="/PatientLogin/">LOGIN</a></span></div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 d-flex justify-content-end">
                        <div>
                            <button type="button" className="btn btn-clear btn-sm mb-1 me-1"><i class="bi bi-chevron-double-left me-2"></i><Link className="text-decoration-none" to="/Patientstatsdetail/" onClick={handlePrevious}>Previous</Link></button>
                            <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleNext}><i class="bi bi-chevron-double-right me-2" ></i>Next </button>
                        </div>
                    </div>
                  </div>

             


            </div>
        

 
       
        </div>
      </div>
   
   </>
    )
}
