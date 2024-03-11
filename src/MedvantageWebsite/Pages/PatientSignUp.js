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
import downArrow from '../../assets/images/icons/downArrow.svg';
import MultiStepFormProgressBar from '../../Component/MultiStepFormProgressBar'
import {Link} from "react-router-dom";
import GetPatientData from '../../PatientPortal/API/GetPatientData';



export default function PatientSignUp() {
  const [PatientData, setPatientData] = useState()
  const [sendForm, setsendForm] = useState({
    titleId: 0,
    SS : '',
    patientName: '',
    middleName: '',
    lastName: '',
    nameSuffix: '',
    birthFirstName: '',
    birthMiddleName: '',
    birthLastName: '',
    dob: '',
    genderId: 0,
    genderidentityId: 0,
    sexualOrientationId: 0,
    maritalStatusId: 0,
    externalId: '',
    licenseId: '',
    billing_note: '',
    previousName: '',
    userDefined: ''
})
  
const handleOnChange = (e) => {
  const { name, value } = e.target;
  setsendForm(prevData => ({
      ...prevData,
      [name]: value
  }));
};



  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const totalSteps = 9;

  const handleNext = (e) => {
    e.preventDefault();
    if (step < totalSteps) {
      setStep(step + 1);
      navigate("/PatientContact/"); 
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
            console.log("Patientdata>>", patientRegistrationData);
            setPatientData(patientRegistrationData);

            setsendForm({
              titleId: patientRegistrationData.titleId,
              firstName: patientRegistrationData.patientName,
              middleName: patientRegistrationData.middleName,
              lastName: patientRegistrationData.lastName,
              nameSuffix: patientRegistrationData.nameSuffix,
              birthFirstName: patientRegistrationData.birthFirstName,
              birthMiddleName: patientRegistrationData.birthMiddleName,
              birthLastName: patientRegistrationData.birthLastName,
              dob: patientRegistrationData.dob,
              genderId: patientRegistrationData.genderId,
              genderidentityId: patientRegistrationData.genderidentityId,
              sexualOrientationId: patientRegistrationData.sexualOrientationId,
              maritalStatusId: patientRegistrationData.maritalStatusId,
              externalId: patientRegistrationData.externalId,
              licenseId: patientRegistrationData.licenseId,
              ss: patientRegistrationData.ss,
              userDefined: patientRegistrationData.userDefined,
              billing_note: patientRegistrationData.billing_note,
              previousName: patientRegistrationData.previousName
          });
 }
}

useEffect(() => {
  Patientdata()
}, [])


    return (
   <>
     <div className="med-Patient-login-wrapper">
        <div className="Patient-registration-content-wrapper px-5">
            <div className="col-xxl-11 col-xl-12 col-lg-12 col-md-12 patient-registration-main-box">
            <div className="row col-12 registration-heading mt-5 pt-5">Demographic</div>
            <div className="px-5">
               <MultiStepFormProgressBar currentStep={step} totalSteps={totalSteps} stepNames={['Who', 'Contact', 'Choices', 'Employer' , 'Stats', 'Misc' ,'Guardian' , 'Insurance']} />
              </div> 
           
           
           {step === 1 &&(
             <div className="registration-form-box">
                <div className='form-info-heading'>Who</div>
                <div className="row px-4 pt-4 patient-form-fields">

                 <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                <div class="" id="paymentModediv">
                  
                    <label for="PaymentMode" class="form-label label-text"><img  src={title} className="label-icons me-2" alt=''/> Title<span class="starMandatory position-static">*</span></label>
                    <div class="dropdown-wrapper">
                    <img src={downArrow} className="dropdownimg" alt=""/>
                    <select class="form-control form-control-sm" name='titleId' value={sendForm.titleId} onChange={handleOnChange}>
                      <option value="0" selected>Unassigned</option>
                      <option value="1">Mrs</option>
                      <option value="2">Shri</option>
                      <option value="3">Dr</option>
                      <option value="4">Er</option>
                    </select>
                    </div>

                   
                  </div>
                         
                </div>

                <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={user} className="label-icons me-2" alt=''/><label  class="form-label label-text">First Name</label>
                   <input type="text"class="form-control form-control-sm" id="firstName" value={sendForm.firstName} placeholder="Enter First Name" name="firstName" onChange={handleOnChange} />
                   </div>
                   
                <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={user} className="label-icons me-2" alt=''/><label  class="form-label label-text">Middle Name</label>
                   <input type="text"class="form-control form-control-sm" id="firstName" value={sendForm.middleName} placeholder="Enter Middle Name" name="middleName" onChange={handleOnChange} />
                   </div>
                <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={user} className="label-icons me-2" alt=''/><label  class="form-label label-text"> Last Name</label>
                   <input type="text"class="form-control form-control-sm" id="firstName" value={sendForm.lastName} placeholder="Enter Last Name" name="lastName" onChange={handleOnChange} />
                   </div>
                <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={user} className="label-icons me-2" alt=''/><label  class="form-label label-text">Name Suffix</label>
                   <input type="text"class="form-control form-control-sm" id="firstName" value={sendForm.nameSuffixSuffix} placeholder="Enter Name Suffix" name="nameSuffixSuffix" onChange={handleOnChange}/>
                   </div>
                <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={user} className="label-icons me-2" alt=''/><label  class="form-label label-text"> Birth First Name</label>
                   <input type="text"class="form-control form-control-sm" id="firstName" value={sendForm.birthFirstName} placeholder="Enter Birth First Name" name="birthFirstName"  onChange={handleOnChange} />
                   </div>
                <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={user} className="label-icons me-2" alt=''/><label  class="form-label label-text"> Birth Middle Name</label>
                   <input type="text"class="form-control form-control-sm" id="firstName" value={sendForm.birthLastName} placeholder="Enter Birth Middle Name" name="birthLastName"  onChange={handleOnChange} />
                   </div>
                <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={user} className="label-icons me-2" alt=''/><label  class="form-label label-text"> Birth Last Name</label>
                   <input type="text"class="form-control form-control-sm" id="firstName" value={sendForm.birthLastName} placeholder="Enter Birth Last Name" name="birthLastName"  onChange={handleOnChange} />
                   </div>
                <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-2">
                   <img  src={calender} className="label-icons me-2" alt=''/><label  class="form-label label-text"> Date of Birth</label>
                   <input type="date"class="form-control form-control-sm" id="firstName" value={sendForm.dob} placeholder="Enter Birth Last Name" name="dob"  onChange={handleOnChange} />
                   </div>

                   <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={gender} className="label-icons me-2" alt=''/>Sex</label>
                            <div class="dropdown-wrapper">
                          <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" name='genderId' value={sendForm.genderId}  onChange={handleOnChange}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Male</option>
                              <option value="2">Female</option>
                              <option value="3">Transgender</option>
                              <option value="4">Other</option>
                            </select>
                            </div>
                          </div>
                                 
                        </div>

                   <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={gender} className="label-icons me-2" alt=''/>Gender Identity<span class="starMandatory position-static">*</span></label>
                            <div class="dropdown-wrapper">
                              <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" name='genderidentityId' value={sendForm.genderidentityId}  onChange={handleOnChange}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Male</option>
                              <option value="2">Female</option>
                              <option value="3">Transgender</option>
                              <option value="4">Other</option>
                            </select>
                            </div>
                          </div>
                                 
                        </div>
                   <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={gender} className="label-icons me-2" alt=''/>Sexual Orientation<span class="starMandatory position-static">*</span></label>
                            <div class="dropdown-wrapper">
                            <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" name='sexualOrientationId' value={sendForm.sexualOrientationId}  onChange={handleOnChange}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Male</option>
                              <option value="2">Female</option>
                              <option value="3">Transgender</option>
                              <option value="4">Other</option>
                            </select>
                            </div>
                          </div>
                                 
                        </div>
                   <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                        
                        <div class="" id="paymentModediv">
                            <label for="PaymentMode" class="form-label label-text"><img  src={maritalstatus} className="label-icons me-2" alt=''/>Martial Status<span class="starMandatory position-static">*</span></label>
                            <div class="dropdown-wrapper">
                    <img src={downArrow} className="dropdownimg" alt=""/>
                            <select class="form-control form-control-sm" name='maritalStatusId' value={sendForm.maritalStatusId}  onChange={handleOnChange}>
                              <option value="0" selected>Unassigned</option>
                              <option value="1">Married</option>
                              <option value="2">Unmarried</option>
                            
                            </select>
                            </div>
                          </div>
                                 
                        </div>



                        <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={card} className="label-icons me-2" alt=''/><label  class="form-label label-text">External ID</label>
                   <input type="text"class="form-control form-control-sm" id="firstName"  placeholder="Enter External ID" value={sendForm.externalId} name="externalId"  onChange={handleOnChange}/>
                   </div>
                        <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={card} className="label-icons me-2" alt=''/><label  class="form-label label-text">License/ID</label>
                   <input type="text"class="form-control form-control-sm" id="firstName" value={sendForm.licenseId} placeholder="Enter License/ID" name="licenseId"  onChange={handleOnChange} />
                   </div>
                        <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={card} className="label-icons me-2" alt=''/><label  class="form-label label-text">S.S</label>
                   <input type="text"class="form-control form-control-sm" id="firstName" placeholder="Enter S.S" value={sendForm.SS} name="SS"  onChange={handleOnChange} />
                   </div>
                        <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={user} className="label-icons me-2" alt=''/><label  class="form-label label-text">User Defined</label>
                   <input type="text"class="form-control form-control-sm" id="firstName" placeholder="Enter User Defined" value={sendForm.userDefined}name="userDefined"  onChange={handleOnChange} />
                   </div>
                        <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={bill} className="label-icons me-2" alt=''/><label  class="form-label label-text">Billing Note<span class="starMandatory position-static">*</span></label>
                   <input type="text"class="form-control form-control-sm" id="firstName" value={sendForm.billing_note} placeholder="Enter Billing Note" name="billing_note"  onChange={handleOnChange} />
                   </div>
                        <div className="col-xxl-3 col-overwrite col-xl-3 col-lg-3 col-md-6 mb-3 px-1">
                   <img  src={user} className="label-icons me-2" alt=''/><label  class="form-label label-text">Previous Names</label>
                   <input type="text"class="form-control form-control-sm" id="firstName" value={sendForm.previousName} placeholder="Enter Previous Name" name="previousName"  onChange={handleOnChange} />
                   </div>

                </div>


                 

             </div>
           )}
            
             <div className="row px-4 pt-4 mb-5 pb-5">
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 already-has-acc">If you already have an account<span className="ms-1 login-already-acc pointer"><a className="login-already-acc" href="/PatientLogin/">LOGIN</a></span></div>
                    <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 d-flex justify-content-end">
                        <div>
                            <button type="button" className="btn btn-clear btn-sm mb-1 me-1"><i class="bi bi-chevron-double-left me-2"></i>Previous</button>
                            <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1"  onClick = {handleNext}><i class="bi bi-chevron-double-right me-2"></i>Next</button>
                        </div>
                    </div>
                  </div>

            </div>
        

 
       
        </div>
      </div>
   
   </>
    )
}
