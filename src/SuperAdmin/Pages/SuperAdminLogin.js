import React, { useEffect, useState } from 'react'
import ValidationLogin from '../../Validation/Clinical/Login/ValidationLogin';
import { useNavigate } from 'react-router-dom';
import SuperLoginPost from '../Api/Login/ApiSuperAdmin';
import Loader from "../../Component/Loader"
import LoginImgLogo from "../../assets/images//LoginPage/RMD-Logo-login.png"
import AlertToster from '../../Component/AlertToster';
export default function SuperAdminLogin() {
  let navigate = useNavigate();
  let [sendForm, setSendForm] = useState({
    email:"",
    password:""
  })
  let [loder, setLoder] = useState(0)
  let [alertmesg, setAlertmesg] = useState("")
  let [showAlert, setShowAlert] = useState(0)
  let handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    setSendForm(sendForm => ({
      ...sendForm,
      [name]: value
    }))
  }

  let saveForm = async () => {
    setLoder(1)

    let validationResponse = ValidationLogin(sendForm.email, sendForm.password)
    if (validationResponse[0]) {

      let response = await SuperLoginPost(sendForm)

      if (response.status === 1) {
        setLoder(0)
        setShowAlert(0)
        let resp = response.responseValue;
       
        window.sessionStorage.setItem('SuperAdminData', JSON.stringify({ 'token': response.token, 'userId': resp.id, 'name': resp.name, 'clientId': resp.clientID, 'userName': resp.userName }))
        window.superAdminUserId = resp.id
        window.SuperAdminToken = response.token
        navigate("/countrymaster/")
      }
      else {
        setLoder(0)
        setShowAlert(1)
        setAlertmesg(response.responseValue)
      }
    }
    else {
      
      setLoder(0)
      setShowAlert(1)
      setAlertmesg(validationResponse[1])

    }

  }


  let handleKeyDown = async (e) => {
    if (e.keyCode === 13) {
      let validationResponse = ValidationLogin(sendForm.email, sendForm.password)

      if (validationResponse) {

        let response = await SuperLoginPost(sendForm)
      

        if (response.status === 1) {
          let resp = response.responseValue;
          window.sessionStorage.setItem('SuperAdminData', JSON.stringify({ 'token': response.token, 'userId': resp.id, 'name': resp.name, 'clientId': resp.clientID, 'userName': resp.userName }))
          window.superAdminUserId = resp.id
          window.SuperAdminToken = response.token
          navigate("/apidoucmentdetails/")
        }
        else {
          setLoder(0)
          setShowAlert(1)
          setAlertmesg(response.responseValue)
        }
      }
      else {
        setLoder(0)
        setShowAlert(1)
        setAlertmesg(validationResponse[1])

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


  useEffect(() => {
    if (JSON.parse(window.sessionStorage.getItem('SuperAdminData')) !== null) {
      navigate('/countrymaster/')
    }
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
                <div className="mb-3"><input type="text" placeholder="User ID" name="email" onChange={handleChange} onKeyDown={handleKeyDown} /></div>

                <div className="mb-2" style={{ position: 'relative' }}>
                  <input type="password" placeholder="Password" id="passwordLogin" name="password" onChange={handleChange} onKeyDown={handleKeyDown} />
                  <span className="showPasswordicon"><i className="bi bi-eye-fill" onClick={showHidePwd} id="eyeFill"></i></span>
                </div>

                <div className="d-flex justify-content-between flex-wrap row-gap-2 rememberForgot mb-5">
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="rememberMe" value="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                  </div>
                  <div>Forgot password?</div>
                </div>

                <div className="d-grid">
                  <button className="btn btn-primary btnLogin" type="button" onClick={saveForm}>Sign In</button>
                </div>
                <div className="weRespect">We respect your privacy we hate spam as much as you do.</div>

              </div>

            </div>
          </div>
        </div>
      </div>

      <Loader val={loder} />
      {
        showAlert === 1 ?
          <AlertToster handle={setShowAlert} message={alertmesg} /> : ""
      }
    </>
  )
}
