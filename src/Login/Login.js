import React, { useEffect, useRef, useState } from 'react'
import PostApiLogin from './API/PostApiLogin';
import ValidationLogin from '../Validation/Clinical/Login/ValidationLogin';
import { useAsyncError, useNavigate } from 'react-router-dom';
import Loder from '../Component/Loader';
import LoginImgLogo from '../assets/images/LoginPage/RMD-Logo-login.png'
import AlertToster from '../Component/AlertToster';
import medLogo from '../assets/images/LoginPage/RMD-Logo.png';
import POSTVerifyOtp from './API/POSTVerifyOtp';
import ForgotPasswordApp from '../Component/ForgotPasswordApp';
import PostChatCornCall from './API/PostChatCornCall';
export default function Login() {

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
  function encodeQuery(data) {
    let query = ""
    for (let d in data)
      query += encodeURIComponent(d) + '='
        + encodeURIComponent(data[d]) + '&'
    return "?" + query.slice(0, -1)
  }
  let saveForm = async () => {
    setLoder(1)
    let validationResponse = ValidationLogin(sendForm.userName, sendForm.password)

    if (validationResponse[0]) {


      let send = encodeQuery(sendForm)

      let response = await PostApiLogin(send)

      if (response.status === 1) {
        setLoder(0)

        // console.log("test", response.responseValue[0] === undefined)
        if (response.responseValue[0] !== undefined) {
          setShowOTP(0)
          let resp = response.responseValue[0];
          // console.log(resp)
          // console.log(response)
          // window.sessionStorage.setItem('LoginData', JSON.stringify({ 'token': response.token, 'userId': resp.id, 'name': resp.name, 'clientId': resp.clientID, 'userName': resp.userName, 'languageId': response.responseValue[0].client.languagePreferredId, "headId": response.responseValue[0].headId, "countryId": resp.client.countryID, "countryCode": resp.client.countryCode }))
          window.sessionStorage.setItem('LoginData', JSON.stringify({ 'token': response.token, 'userId': resp.id, 'name': resp.name, "roleId": resp.roleId, 'clientId': resp.clientID, 'userName': resp.userName, 'languageId': response.responseValue[0].client.languagePreferredId, "headId": response.responseValue[0].headId, "countryId": resp.client.countryID, "countryCode": resp.client.countryCode, "clientdata": resp.client, "headList": resp.headList, "shortCutMenu": resp.menuShortCuts, "userMobileNo": resp.mobileNo }))
          window.sessionStorage.setItem("languageId", JSON.stringify({ "languageId": response.responseValue[0].client.languagePreferredId }))

          if (rememberMe) {
            window.localStorage.setItem('LoginData', JSON.stringify({ 'token': response.token, 'userId': resp.id, 'name': resp.name, "roleId": resp.roleId, 'clientId': resp.clientID, 'userName': resp.userName, 'languageId': response.responseValue[0].client.languagePreferredId, "headId": response.responseValue[0].headId, "countryId": resp.client.countryID, "countryCode": resp.client.countryCode, "clientdata": resp.client, "headList": resp.headList, "shortCutMenu": resp.menuShortCuts }))
            window.sessionStorage.setItem("languageId", JSON.stringify({ "languageId": response.responseValue[0].client.languagePreferredId }))

          }

          window.userId = resp.id
          window.clientId = resp.clientID
          window.token = response.token

          window.languageId = response.responseValue[0].client.languagePreferredId
          // console.log("mob", resp.mobileNo)
          let countryCode = "+91";
          let cornCallUrl = resp.mobileNo;
          let res = await PostChatCornCall({ "mobileNO": countryCode + cornCallUrl });
          // console.log('res', res);

          navigate("/dashboard/")

        }
        else {
          setShowOTP(1)
          setUserId(response.responseValue.userId)
          // inputElement.current.focus();
        }

      }
      else {
        setLoder(0)
        setShowAlert(1)
        setMessage(response.responseValue)

      }
    }
    else {
      setLoder(0)
      setShowAlert(1)
      setMessage(validationResponse[1])

    }

  }


  let handleKeyDown = async (e) => {
    if (e.keyCode === 13) {
      setLoder(1)
      let validationResponse = ValidationLogin(sendForm.userName, sendForm.password)

      if (validationResponse[0]) {

        let send = encodeQuery(sendForm)

        let response = await PostApiLogin(send)

        if (response.status === 1) {
          setLoder(0)
          if (response.responseValue[0] !== undefined) {
            let resp = response.responseValue[0];
            // console.log('resp', resp)
            // window.sessionStorage.setItem('LoginData', JSON.stringify({ 'token': resp.token, 'userId': resp.id, 'name': resp.name, 'clientId': resp.clientID, 'userName': resp.userName,  "countryId":resp.client.countryID , "countryCode":resp.client.countryCode }))
            // window.sessionStorage.setItem('LoginData', JSON.stringify({ 'token': response.token, 'userId': resp.id, 'name': resp.name, 'clientId': resp.clientID, 'userName': resp.userName, 'languageId': response.responseValue[0].client.languagePreferredId, "headId": response.responseValue[0].headId, "countryId": resp.client.countryID, "countryCode": resp.client.countryCode,"mobileNo":resp.client.mobileNo,"address":resp.client.address,"defaultLanguage": resp.defaultLanguage,"localLanguage":resp.localLanguage}))
            window.sessionStorage.setItem('LoginData', JSON.stringify({ 'token': response.token, 'userId': resp.id, 'name': resp.name, 'clientId': resp.clientID, 'userName': resp.userName, "roleId": resp.roleId, 'languageId': response.responseValue[0].client.languagePreferredId, "headId": response.responseValue[0].headId, "countryId": resp.client.countryID, "countryCode": resp.client.countryCode, "clientdata": resp.client, "headList": resp.headList, "shortCutMenu": resp.menuShortCuts }))
            window.sessionStorage.setItem("languageId", JSON.stringify({ "languageId": response.responseValue[0].client.languagePreferredId }))

            if (rememberMe) {
              window.localStorage.setItem('LoginData', JSON.stringify({ 'token': response.token, 'userId': resp.id, 'name': resp.name, "roleId": resp.roleId, 'clientId': resp.clientID, 'userName': resp.userName, 'languageId': response.responseValue[0].client.languagePreferredId, "headId": response.responseValue[0].headId, "countryId": resp.client.countryID, "countryCode": resp.client.countryCode, "clientdata": resp.client, "headList": resp.headList, "shortCutMenu": resp.menuShortCuts }))
              window.sessionStorage.setItem("languageId", JSON.stringify({ "languageId": response.responseValue[0].client.languagePreferredId }))

            }
            window.userId = resp.id
            window.clientId = resp.clientID
            window.token = response.token

            window.languageId = response.responseValue[0].client.languagePreferredId

            let countryCode = resp.client.countryCode !== null ? resp.client.countryCode : "+91";
            let cornCallUrl = resp.mobileNo;

            let res = await PostChatCornCall({ "mobileNO": countryCode + cornCallUrl });
            // console.log('res', res);
            navigate("/dashboard/")
          }
          else {
            setShowOTP(1)
            setUserId(response.responseValue.userId)
            // inputElement.current.focus();
          }
        }
        else {
          setLoder(0)
          setShowAlert(1)
          setMessage(response.responseValue)
        }
      }
      else {
        setLoder(0)
        setShowAlert(1)
        setMessage(validationResponse[1])
      }
    }
  }

  const showHidePwd = () => {
    var input = document.getElementById("passwordLogin");
    if (input.type === "password") {
      input.type = "text";
      document.getElementById("eyeFill").className = "bi-eye-slash-fill";
    } else {
      input.type = "password";
      document.getElementById("eyeFill").className = "bi bi-eye-fill bi";
    }

  }

  let handleOTPChange = (e) => {
    let d = e.target.value;
    let f = saveOTP + d;
    // console.log(f)
    setSaveOTP(f)
  }
  let handleSaveWithOTP = async () => {
    setLoder(1)
    let saveOTP = document.getElementById("n1").value + document.getElementById("n2").value + document.getElementById("n3").value + document.getElementById("n4").value + document.getElementById("n5").value + document.getElementById("n6").value
    let data = {
      "userName": sendForm.userName,
      "otp": saveOTP,
      "userId": userId
    }
    let response = await POSTVerifyOtp(data);
    if (response.status === 1) {
      setLoder(0)
      let resp = response.responseValue[0];
      //console.log(resp)
      //console.log(response)
      // window.sessionStorage.setItem('LoginData', JSON.stringify({ 'token': response.token, 'userId': resp.id, 'name': resp.name, 'clientId': resp.clientID, 'userName': resp.userName, 'languageId': response.responseValue[0].client.languagePreferredId, "headId": response.responseValue[0].headId, "countryId": resp.client.countryID, "countryCode": resp.client.countryCode }))
      window.sessionStorage.setItem('LoginData', JSON.stringify({ 'token': response.token, 'userId': resp.id, 'name': resp.name, "roleId": resp.roleId, 'clientId': resp.clientID, 'userName': resp.userName, 'languageId': response.responseValue[0].client.languagePreferredId, "headId": response.responseValue[0].headId, "countryId": resp.client.countryID, "countryCode": resp.client.countryCode, "clientdata": resp.client, "headList": resp.headList, "shortCutMenu": resp.menuShortCuts }))
      window.userId = resp.id
      window.token = response.token

      window.clientId = resp.clientID
      window.sessionStorage.setItem("languageId", JSON.stringify({ "languageId": response.responseValue[0].client.languagePreferredId }))
      window.languageId = response.responseValue[0].client.languagePreferredId

      let countryCode = resp.client.countryCode !== null ? resp.client.countryCode : "+91";
      let cornCallUrl = resp.mobileNo;

      let res = await PostChatCornCall({ "mobileNO": countryCode + cornCallUrl });
      //console.log('res', res);
      navigate("/dashboard/")
    }
    else {
      setLoder(0)
      setShowAlert(1)
      setMessage(response.responseValue)
    }
  }

  let handleSaveWithOTPOnkey = async (e) => {
    if (e.keyCode === 13) {
      setLoder(1)
      let data = {
        "userName": sendForm.userName,
        "otp": saveOTP,
        "userId": userId
      }

      let response = await POSTVerifyOtp(data);
      if (response.status === 1) {
        setLoder(0)
        let resp = response.responseValue[0];
        //console.log(resp)
        //console.log(response)
        // window.sessionStorage.setItem('LoginData', JSON.stringify({ 'token': response.token, 'userId': resp.id, 'name': resp.name, 'clientId': resp.clientID, 'userName': resp.userName, 'languageId': response.responseValue[0].client.languagePreferredId, "headId": response.responseValue[0].headId, "countryId": resp.client.countryID, "countryCode": resp.client.countryCode }))
        window.sessionStorage.setItem('LoginData', JSON.stringify({ 'token': response.token, 'userId': resp.id, 'name': resp.name, "roleId": resp.roleId, 'clientId': resp.clientID, 'userName': resp.userName, 'languageId': response.responseValue[0].client.languagePreferredId, "headId": response.responseValue[0].headId, "countryId": resp.client.countryID, "countryCode": resp.client.countryCode, "clientdata": resp.client, "headList": resp.headList, "shortCutMenu": resp.menuShortCuts }))
        window.sessionStorage.setItem("languageId", JSON.stringify({ "languageId": response.responseValue[0].client.languagePreferredId }))
        window.languageId = response.responseValue[0].client.languagePreferredId

        window.userId = resp.id
        window.token = response.token
        window.clientId = resp.clientID
        let countryCode = resp.client.countryCode !== null ? resp.client.countryCode : "+91";
        let cornCallUrl = resp.mobileNo;

        let res = await PostChatCornCall({ "mobileNO": countryCode + cornCallUrl });
        // console.log('res', res);
        navigate("/dashboard/")
      }
      else {
        setLoder(0)
        setShowAlert(1)
        setMessage(response.responseValue)
      }
    }
  }
  let handleCancle = () => {
    setShowOTP(0)
    document.getElementById("n1").value = "";
    document.getElementById("n2").value = "";
    document.getElementById("n3").value = "";
    document.getElementById("n4").value = "";
    document.getElementById("n5").value = "";
    document.getElementById("n6").value = "";
    setSaveOTP("")
  }

  let hanldeRememberMe = () => {
    if (rememberMe) {
      setRememberMe(false)
    }
    else {
      setRememberMe(true)
    }
  }

  useEffect(() => {
    if (JSON.parse(window.sessionStorage.getItem('LoginData')) !== null) {
      navigate('/dashboard/')
    }
    else if (JSON.parse(window.localStorage.getItem('LoginData')) !== null) {
      window.sessionStorage.setItem('LoginData', window.localStorage.getItem('LoginData'))
      navigate('/dashboard/')

    }
    // window.localStorage.clear();

    // ------------------OTP Input JS-------------------------------------
    const inputs = document.querySelectorAll(".input-fieldOTPWrapper input"),
      button = document.querySelector("button");
    inputs.forEach((input, index1) => {
      input.addEventListener("keyup", (e) => {
        const currentInput = input,
          nextInput = input.nextElementSibling,
          prevInput = input.previousElementSibling;
        if (currentInput.value.length > 1) {
          currentInput.value = "";
          return;
        }
        if (nextInput && nextInput.hasAttribute("disabled") && currentInput.value !== "") {
          nextInput.removeAttribute("disabled");
          nextInput.focus();
        }
        if (e.key === "Backspace") {
          inputs.forEach((input, index2) => {

            if (index1 <= index2 && prevInput) {
              input.setAttribute("disabled", true);
              input.value = "";
              prevInput.focus();
            }
          });
        }
        if (!inputs[3].disabled && inputs[3].value !== "") {
          button.classList.add("active");
          return;
        }
        button.classList.remove("active");
      });
    });
    window.addEventListener("load", () => inputs[0].focus());

  }, [])

  return (
    <>
      <div className="med-login-wrapper">
        <div className="login-content-wrapper">
          <div className="left-blank"></div>
          <div className="right-fill">
            <div className="right-fill-content">
              <div className="login-img"><img src={LoginImgLogo} alt="" /></div>
              {/* <div className="login-img"><img src='' alt="" /></div> */}
              <div className="welcome-text">Welcome to Medvantage</div>
              <div className="welcome-text-second">Login with your data that you entered during registration.</div>

              <div className="login-text-btn mt-4">
                <div className="mb-3"><input type="text" placeholder="User ID" name="userName" onChange={handleChange} onKeyDown={handleKeyDown} /></div>

                <div className="mb-2" style={{ position: 'relative' }}>
                  <input type="password" placeholder="Password" id="passwordLogin" name="password" onChange={handleChange} onKeyDown={handleKeyDown} />
                  <span className="showPasswordicon"><i className="bi bi-eye-fill" onClick={showHidePwd} id="eyeFill"></i></span>
                </div>

                <div className="d-flex justify-content-between flex-wrap row-gap-2 rememberForgot mb-5">
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="rememberMe" value="rememberMe" checked={rememberMe} onClick={() => { hanldeRememberMe() }} />
                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                  </div>
                  <div data-bs-toggle="modal" data-bs-title="Forgot" data-bs-target="#ForgotModal">Forgot password?</div>
                </div>

                <div className="d-grid">
                  <button className="btn btn-primary btnLogin" type="button" onClick={saveForm}>Sign In</button>
                </div>

                <div className="mt-3 dontHaveAcc"> <span>Don't have an account?</span> <a href="/registration">Sign up</a></div>
                <div className="mt-3 dontHaveAcc"> <span>Are you a Patient?</span> <a href="/PatientLogin/">Sign In</a></div>


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
                  <input type="number" id="n1" ref={inputElement} onChange={handleOTPChange} autofocus />
                  <input type="number" id="n2" disabled onChange={handleOTPChange} />
                  <input type="number" id="n3" disabled onChange={handleOTPChange} />
                  <input type="number" id="n4" disabled onChange={handleOTPChange} />
                  <input type="number" id="n5" disabled onChange={handleOTPChange} />
                  <input type="number" id="n6" disabled onChange={handleOTPChange} onKeyDown={handleSaveWithOTPOnkey} />
                </div>


                <div className='otpresend' onClick={saveForm}>Not received your code? <a href="##">Resend Code</a></div>
              </div>
            </div>
            <div className="modal-footer1 text-center">

              <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal" onClick={handleCancle}>Cancel</button>
              <button type="button" className="btn-delete popBtnDelete" data-bs-dismiss="modal" onClick={handleSaveWithOTP}>Verify OTP</button>
            </div>
          </div>
        </div>
      </div>
      {/* {/ -----------------------End OTP Modal Popup--------------------- /} */}



      <ForgotPasswordApp />





      <Loder val={loder} />
      {
        showAlert === 1 ?
          <AlertToster handle={setShowAlert} message={message} /> : ""
      }
    </>
  )
}
