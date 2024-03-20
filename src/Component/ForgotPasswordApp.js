import React, { useEffect, useRef, useState } from 'react'
import medLogo from '../assets/images/LoginPage/RMD-Logo.png';
import PostSendOTP from '../Login/ForgotPassword/PostSendOTP';
import PostVerifyOTP from '../Login/ForgotPassword/PostVerifyOTP';
import PostForgotPassword from '../Login/ForgotPassword/PostForgotPassword';
import SuccessToster from '../../src/Component/SuccessToster'
import WarningToaster from '../../src/Component/WarningToaster'
import AlertToster from '../../src/Component/AlertToster'

export default function ForgotPasswordApp() {

  let [sendForm, setSendForm] = useState({})
  let [saveOTP, setSaveOTP] = useState("")
  let [passwordShown, setPasswordShown] = useState(false);
  let [invalidMobile, setInvalidMobile] = useState(0);
  let [invalidMobileText, setInvalidMobileText] = useState('');
  let [invalidPasswordText, setInvalidPasswordText] = useState('');

  let [message, setMessage] = useState("")
  let [showToster, setShowToster] = useState(0)

  const [successMessages, setSuccessMessages] = useState([]);
  const [errorMessages, setErrorMessages] = useState([]);

  // const addSuccessMessage = (message) => {
  //   setSuccessMessages((prevMessages) => [...prevMessages, message]);
  // };
  // const addErrorMessage = (message) => {
  //   setSuccessMessages((prevMessages) => [...prevMessages, message]);
  // };



  let [n1, setn1] = useState('');
  let [n2, setn2] = useState('');
  let [n3, setn3] = useState('');
  let [n4, setn4] = useState('');
  let [n5, setn5] = useState('');
  let [n6, setn6] = useState('');
  let [userName, setUserName] = useState('');
  let [newPassword, setNewPassword] = useState('');
  const [currentStep, setCurrentStep] = useState('getOTP');
  // let [notReceipt, setNotReceipt] = useState(false);
  

  let togglePassword = () => {
    setPasswordShown(!passwordShown);
  };


  let getOTP = async () => {
    const mobileNumberPattern = /^\d{10}$/;
    if (!mobileNumberPattern.test(userName)) {
      setInvalidMobile(1);
      setInvalidMobileText('Please enter a valid 10-digit mobile number.');
    } else {
      setInvalidMobileText('');
      let response = await PostSendOTP(sendForm);
      if (response.status === 1) {
        setMessage("The OTP has been sent successfully.")
        setShowToster(1)
        setCurrentStep('enterOTP');
      }
      else {
        setMessage("Please check mobile number")
        setShowToster(2)
      }
      setInvalidMobile(0);
    }
    return;
  }


  // let reSendOTP = async () => {
  //   const mobileNumberPattern = /^\d{10}$/;
  //   if (!mobileNumberPattern.test(userName)) {
  //     setInvalidMobile(1);
  //     setInvalidMobileText('Please enter a valid 10-digit mobile number.');
  //   } else {
  //     setInvalidMobileText('');
  //     let response = await PostSendOTP(sendForm);
  //     if (response.status === 1) {
  //       setMessage("The OTP has been sent successfully.")
  //       setShowToster(1)
  //       setCurrentStep('enterOTP');
  //     }
  //     else {
  //       setMessage("Please check mobile number")
  //       setShowToster(2)
  //     }
  //     setInvalidMobile(0);
  //   }
  //   return;
  // }


  // Handle VerifyOTP
  let sendVerifyOTP = async () => {
    let getEnteredOtp = n1 + '' + n2 + '' + n3 + '' + n4 + '' + n5 + '' + n6;
    let data = {
      userName: sendForm.userName,
      otp: getEnteredOtp,
    };
    let response = await PostVerifyOTP(data);
    if (response.status === 1) {
      setMessage("The OTP has been verified successfully.")
      setShowToster(1)
      setCurrentStep('enterOTP');
      setCurrentStep('changePassword');
    } else {
      setMessage("Incorrect OTP");
      setShowToster(2)      
    }
  };


  // Handle Update Password
  let updatePassword = async () => {
    if (!sendForm.userName) {
      alert('Please enter a mobile number.');
      return;
    }

    let data = {
      userName: sendForm.userName,
      newPassword: newPassword,
    };
    let response = await PostForgotPassword(data);
    if (response.status === 1) {
      // setMessage("The password has been changed successfully")
      alert("The password has been changed successfully")
      setShowToster(1)
      handleClear();
      hideModalWithTimeout();
      hideModal();
    }
    else {
      // setMessage("The password has not been changed.")
      alert("The password has not been changed.")
      setShowToster(2)
    }
  };

//Handle Change
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === 'userName') {
      setUserName(value);
    }
    if (name === 'newPassword') {
      const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

      if (!strongPasswordPattern.test(value)) {
        setNewPassword(value);
        setInvalidPasswordText(
          'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.'
        );
      } else {
        setNewPassword(value);
        setInvalidPasswordText('');
      }
    }

    setSendForm((sendForm) => ({
      ...sendForm,
      [name]: value,
    }));
  };




  const inputElement = useRef(null);

  let handleOTPChange = (e) => {
    let d = e.target.value;
    let name = e.target.name;
    let f = saveOTP + d;
    setSaveOTP(f);

    if (name === 'n1' && d !== '') {
      setn1(d);
      inputElement.current.querySelector('#n2').removeAttribute('disabled');
      inputElement.current.querySelector('#n2').focus();
    } else if (name === 'n2' && d !== '') {
      setn2(d);
      inputElement.current.querySelector('#n3').removeAttribute('disabled');
      inputElement.current.querySelector('#n3').focus();
    } else if (name === 'n3' && d !== '') {
      setn3(d);
      inputElement.current.querySelector('#n4').removeAttribute('disabled');
      inputElement.current.querySelector('#n4').focus();
    } else if (name === 'n4' && d !== '') {
      setn4(d);
      inputElement.current.querySelector('#n5').removeAttribute('disabled');
      inputElement.current.querySelector('#n5').focus();
    } else if (name === 'n5' && d !== '') {
      setn5(d);
      inputElement.current.querySelector('#n6').removeAttribute('disabled');
      inputElement.current.querySelector('#n6').focus();
    } else if (name === 'n6' && d !== '') {
      setn6(d);
    }
  };


  //Handle Clear
  let handleClear = () => {
    setn1('');
    setn2('');
    setn3('');
    setn4('');
    setn5('');
    setn6('');
    // setSendForm({
    //   ...sendForm,
    //   userName: '',
    // });
    // setNewPassword('');
  };

  const resetComponentState = () => {
    setSendForm({});
    setSaveOTP('');
    setPasswordShown(false);
    setInvalidMobile(0);
    setInvalidMobileText('');
    setInvalidPasswordText('');
    setMessage('');
    setShowToster(0);
    setn1('');
    setn2('');
    setn3('');
    setn4('');
    setn5('');
    setn6('');
    setUserName('');
    setNewPassword('');
    setCurrentStep('getOTP');
  };

  function hideModalWithTimeout() {
    setTimeout(() => {
      hideModal();
    }, 5000);
  }

  function hideModal() {
    var modal = document.getElementById('ForgotModal');
    modal.classList.remove('show');
    modal.style.display = 'none';
    var modalBackdrop = document.getElementsByClassName('modal-backdrop')[0];
    if (modalBackdrop) {
      document.body.removeChild(modalBackdrop);
    }
    resetComponentState();
  }


  useEffect(() => {    

  }, [])

  return (
    <>
      {/* {/ -----------------------Start Forgot Password Modal Popup--------------------- /} */}

      <div className='modal fade' id="ForgotModal" aria-labelledby="ForgotModalLabel" aria-hidden="true" data-bs-backdrop="static">
        <div className="modal-dialog modalDelete w-100" style={{ margin: '3% auto' }}>
          <div className="modal-content position-relative">


            <button type="button" className="btn-close_ position-absolute top-0 start-100 translate-middle bg-dark bg-gradient text-white border-0 rounded-circle_ rounded" onClick={resetComponentState} data-bs-dismiss="modal" aria-label="Close"><i class="bi bi-x-lg"></i></button>


            <div className="modal-body text-center1">
              <div className='OTPMain'>
                <div className='OTPlogo'><img src={medLogo} alt='' /></div>
                <div className='text-center fs-6 fw-bold'>Forgot Password</div>

                {currentStep === 'getOTP' && (
                  <div className='mobilenum-sec' style={{ display: 'none_' }}>
                    <div className='OTPmessage'>Enter Mobile </div>
                    <div className="modal-footer1 text-center">
                      <input type='number' className='form-control' id='userName' name='userName' onChange={handleChange} maxLength='10' placeholder='Enter mobile number' />
                      {invalidMobile === 1 ? <div className="fw-light alertWarning">{invalidMobileText}</div> : ''}
                      <button type="button" className="btn-delete popBtnDelete" onClick={getOTP} >Get OTP</button>
                    </div>
                  </div>
                )}

                {currentStep === 'enterOTP' && (
                  <div className='otp-sec' style={{ display: 'none_' }}>
                    <div className='OTPmessage text-center'>Please enter the OTP sent to <span className='otpnum'>{sendForm.userName}</span></div>
                    <div className="input-fieldOTPWrapper" ref={inputElement}>
                      <input type="number" name="n1" value={n1} id="n1" onChange={handleOTPChange} autoFocus />
                      <input type="number" name="n2" value={n2} id="n2" disabled={!n1} onChange={handleOTPChange} />
                      <input type="number" name="n3" value={n3} id="n3" disabled={!n2} onChange={handleOTPChange} />
                      <input type="number" name="n4" value={n4} id="n4" disabled={!n3} onChange={handleOTPChange} />
                      <input type="number" name="n5" value={n5} id="n5" disabled={!n4} onChange={handleOTPChange} />
                      <input type="number" name="n6" value={n6} id="n6" disabled={!n5} onChange={handleOTPChange} />
                    </div>
                     <div className='otpresend' onClick={getOTP}>Not received your code? <a href="##">Resend Code</a></div> 

                    {/* {notReceipt === true ?  <div className='otpresend' onClick={getOTP}>Not received your code? <a href="##">Resend Code</a></div> : ''}                   */}

                    <div className="modal-footer1 text-center">
                      <button type="button" className="btncancel popBtnCancel me-2" onClick={handleClear}>Clear</button>
                      <button type="button" className="btn-delete popBtnDelete" onClick={sendVerifyOTP}>Verify OTP</button>
                    </div>

                  </div>
                )}
              </div>


              {currentStep === 'changePassword' && (
                <div className='changepassword-sec' style={{ display: 'none_' }}>
                  <div className='OTPMain'>
                    <div className='OTPmessage fs-6'>Enter New Password</div>
                    <div className="modal-footer1 text-center" style={{ position: 'relative' }}>

                      <input type={passwordShown ? "text" : "password"} placeholder="Enter new password" required="" id='newPassword' name='newPassword' onChange={handleChange} className="pass-input form-control" />
                      {passwordShown ? <span className="fa fa-eye-slash showForgotPasswordicon" onClick={togglePassword}></span> : <span className="fas fa-eye showForgotPasswordicon" onClick={togglePassword}></span>}

                      <button className="btn-delete popBtnDelete mt-2" type="button" onClick={updatePassword}>Change Password</button>
                      {invalidPasswordText && (<div className="fw-light alertWarning">{invalidPasswordText}</div>)}
                    </div>
                  </div>
                </div>
              )}

              {/* <div className='text-center mt-2'> <span className='text-success fw-bold'> Password changed successfully</span></div> */}


              {successMessages.map((message, index) => (
                <div key={`success-${index}`} className='text-success fw-bold'>{message}</div>
              ))}

              {errorMessages.map((message, index) => (
                <div key={`error-${index}`} className='text-danger fw-bold'> {message} </div>
              ))}
            </div>

            {showToster === 1 ? <SuccessToster message={message} handle={setShowToster} /> : ""}
            {showToster === 2 ? <WarningToaster message={message} handle={setShowToster} /> : ""}
            {showToster === 3 ? <AlertToster message={message} handle={setShowToster} /> : ""}

          </div>
        </div>
      </div>
      {/* {/ -----------------------End Forgot Password Modal Popup--------------------- /} */}


    </>
  )
}
