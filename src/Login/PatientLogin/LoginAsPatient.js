import React, { useEffect, useRef, useState } from 'react'
import PostApiLogin from '../API/PostApiLogin';
import ValidationLogin from '../../Validation/Clinical/Login/ValidationLogin';
import { useAsyncError, useNavigate } from 'react-router-dom';
import Loder from '../../Component/Loader';
import LoginImgLogo from '../../assets/images/LoginPage/RMD-Logo.png'
import AlertToster from '../../Component/AlertToster';
import medLogo from '../../assets/images/LoginPage/RMD-Logo-login.png';
import POSTVerifyOtp from '../API/POSTVerifyOtp';
import ForgotPasswordApp from '../../Component/ForgotPasswordApp';
import PostChatCornCall from '../API/PostChatCornCall';

export default function LoginAsPatient() {

  let navigate = useNavigate();
  let [sendForm, setSendForm] = useState({})
  let [loder, setLoder] = useState(0)
  let [message, setMessage] = useState("")
  let [showAlert, setShowAlert] = useState(0)
  let [showOTP, setShowOTP] = useState(0)
  let [saveOTP, setSaveOTP] = useState("")
  let [userId, setUserId] = useState("")
  let [rememberMe, setRememberMe] = useState(false)
  // let [countryCode, setCountryCode] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).clientdata.countryCode !== null ?
  //   JSON.parse(window.sessionStorage.getItem("LoginData")).clientdata.countryCode : '+91')
  // let [cornCallUrl, setCornCornCall] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).clientdata.mobileNo);

  const inputElement = useRef(null);

  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setSendForm(sendForm => ({
      ...sendForm,
      [name]: value
    }))
  }

 


  



 

  return (
    <>
      <div className="med-login-wrapper">
        <div className="login-content-wrapper">
          <div className="left-blank"></div>
          <div className="right-fill">
            <div className="right-fill-content">
              <div className="login-img">
                <img src={LoginImgLogo} alt="" />
               
                {/* <div className="medvantage-patient-heading">Patient</div> */}
              </div>
              {/* <div className="login-img"><img src='' alt="" /></div> */}
              <div className="welcome-text">Welcome to Medvantage</div>
              <div className="welcome-text-second">Login with your data that you entered during registration.</div>

              <div className="patient-login-text-btn mt-4">
                <div className="mb-3"><input type="text" placeholder="Enter Mobile No." name="userName" onChange={handleChange} /></div>
                <div class="horizontal-line"></div>
                <div className='continue-with-uhid'>or continue with UHID</div>
                <div className="patient-login-text-btn mb-2" style={{ position: 'relative' }}>
                  <input type="password" placeholder="Enter UHID" id="passwordLogin" name="password" onChange={handleChange} />
                  {/* <span className="showPasswordicon"><i className="bi bi-eye-fill" onClick={showHidePwd} id="eyeFill"></i></span> */}
                </div>

                <div className="d-flex justify-content-end flex-wrap row-gap-2 rememberForgot mb-5">
                  {/* <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="rememberMe" value="rememberMe" checked={rememberMe} onClick={() => { hanldeRememberMe() }} />
                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                  </div> */}
                  <div data-bs-toggle="modal" data-bs-title="Forgot" data-bs-target="#ForgotModal">Forgot password?</div>
                </div>

                <div className="d-grid">
                  <button className="btn btn-primary btnLogin" type="button" >Sign In</button>
                </div>

                <div className="mt-3 dontHaveAcc"> <span>Don't have an account?</span> <a href="/PatientRegistration/">Sign up</a></div>
                {/* <div className="mt-3"> <span>Are you a Patient?</span> <a href="/PatientLogin/">Sign In</a></div> */}


                <div className="weRespect">We respect your privacy we hate spam as much as you do.</div>
                <div className="version-text mt-3">Version 1.0 </div>
                {/* ---------------OTP Button------------------ */}
                {/* <div data-bs-toggle="modal" data-bs-title="Forgot" data-bs-placement="bottom" data-bs-target="#ForgotModal">Get OTP</div> */}
              </div>

            </div>
          </div>
        </div>
      </div>


      {/*  <!------------------- Start OTP Modal ---------------------------------->  */}


      <div className={`modal d-${showOTP === 1 ? "block" : "none"}`} id="OTPModal" tabIndex="-1" aria-labelledby="OTPModalLabel" aria-hidden="true" data-bs-backdrop="static">
        <div className="modal-dialog modalDelete w-100" style={{ margin: '10% auto' }}>
          <div className="modal-content">

            <div className="modal-body text-center">
              {/* <div className="modal-body modelbdy text-center"> */}
              <div className='OTPMain'>
                <div className='OTPlogo'><img src={medLogo} alt='' /></div>
                <div className='OTPmessage'>Please enter the OTP sent to <span className='otpnum'>{sendForm.userName}</span></div>
                {/* <div className='otpenter'><input type='text' className='form-control' size={6} maxLength={6} /></div> */}


                <div className="input-fieldOTPWrapper">
                  <input type="number" id="n1" ref={inputElement} o autofocus />
                  <input type="number" id="n2" disabled />
                  <input type="number" id="n3" disabled  />
                  <input type="number" id="n4" disabled  />
                  <input type="number" id="n5" disabled  />
                  <input type="number" id="n6" disabled   />
                </div>


                <div className='otpresend' >Not received your code? <a href="##">Resend Code</a></div>
              </div>
            </div>
            <div className="modal-footer1 text-center">

              <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal" >Cancel</button>
              <button type="button" className="btn-delete popBtnDelete" data-bs-dismiss="modal" >Verify OTP</button>
            </div>
          </div>
        </div>
      </div>
      {/* {/ -----------------------End OTP Modal Popup--------------------- /} */}



     





      <Loder val={loder} />
      {
        showAlert === 1 ?
          <AlertToster handle={setShowAlert} message={message} /> : ""
      }
    </>
  )
}
