import React, { useEffect, useState } from 'react'
import PostApiLogin from '../../Clinical/Api/Login/PostApiLogin';
import ValidationLogin from '../../Validations/Clinical/Login/ValidationLogin'//'../../../Validations/Clinical/Login/ValidationLogin';
import { useNavigate } from 'react-router-dom';
import Loder from '../../Components/Loder'//'../../../Components/Loder';
import LoginImgLogo from '../../assets/images/LoginPage/RMD-Logo-login.png'//'../../../assets/images/LoginPage/RMD-Logo-login.png'
import AlertToster from '../../Components/AlertToster'//'../../../Components/AlertToster';
// import LoderIcon from "../../../assets/images/Animation/LoginIcon.gif"

// import LoginText from '../../../assets/images/LoginPage/LoginAnimation.gif'
export default function SpringBoardLogin() {

  let navigate = useNavigate();
  let [sendForm, setSendForm] = useState({})
  let [loder, setLoder] = useState(0)
  let [message, setMessage] = useState("")
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
    let validationResponse = ValidationLogin(sendForm.userName, sendForm.password)
    if (validationResponse[0]) {

      let response = await PostApiLogin(sendForm)

      if (response.status === 1) {
        setLoder(0)
        let resp = response.responseValue[0];
        console.log(resp)
        console.log(response)
        window.sessionStorage.setItem('LoginData', JSON.stringify({ 'token': response.token, 'userId': resp.id,'roleId':resp.roleId, 'name': resp.name, 'clientId': resp.clientID, 'userName': resp.userName, 'languageId':response.responseValue[0].client.languagePreferredId, "headId":response.responseValue[0].headId, "countryId":resp.client.countryID, "countryCode":resp.client.countryCode}))
        console.log("cdscbmsnm")
        navigate("/SprintBacklog/")
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

      if (validationResponse) {

        let response = await PostApiLogin(sendForm)

        if (response.status === 1) {
          setLoder(0)
          let resp = response.responseValue;
          console.log('resp',resp)
          window.sessionStorage.setItem('LoginData', JSON.stringify({ 'token': resp.token, 'userId': resp.id, 'name': resp.name, 'clientId': resp.clientID, 'userName': resp.userName,  "countryId":resp.client.countryID , "countryCode":resp.client.countryCode }))
          navigate("/SprintBacklog/")
        }
        else {
          setLoder(0)
        }
      }
      else {
        setLoder(0)
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
    if (JSON.parse(window.sessionStorage.getItem('LoginData')) !== null) {
      navigate('/dashboard/')
    }
  }, [])
  return (





    <>
      <div className="med-login-wrapper">
        <div className="login-content-wrapper">
          <div className="left-blank"></div>
          <div className="right-fill">
            <div className="right-fill-content">
              {/* <div className="login-img"><img src={LoginImgLogo} alt="" /></div> */}
              {/* <div className="login-img"><img src='' alt="" /></div> */}
              <div className="welcome-text">Welcome to Springboard</div>
              <div className="welcome-text-second">Login with your data that you entered during registration.</div>

              <div className="login-text-btn mt-4">
                <div className="mb-3"><input type="text" placeholder="User ID" name="userName" onChange={handleChange} onKeyDown={handleKeyDown} /></div>

                <div className="mb-2" style={{ position: 'relative' }}>
                  <input type="password" placeholder="Password" id="passwordLogin" name="password" onChange={handleChange} onKeyDown={handleKeyDown} />
                  <span className="showPasswordicon"><i className="bi bi-eye-fill" onClick={showHidePwd} id="eyeFill"></i></span>
                </div>

                <div className="d-flex justify-content-between flex-wrap row-gap-2 rememberForgot mb-5">
                  <div className="form-check form-check-inline">
                    <input className="form-check-input" type="checkbox" id="rememberMe" value="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                  </div>
                  <div style={{ visibility: 'hidden' }}>Forgot password?</div>
                </div>

                <div className="d-grid">
                  <button className="btn btn-primary btnLogin" type="button" onClick={saveForm}>Sign In</button>
                </div>

                <div className="mt-3 dontHaveAcc"> <span>Don't have an account?</span> <a href="/registration">Sign up</a></div>


                <div className="weRespect">We respect your privacy We hate spam as much as you do.</div>

              </div>

            </div>
          </div>
        </div>
      </div>

      <Loder val={loder} />
      {
        showAlert === 1 ?
          <AlertToster handle={setShowAlert} message={message} /> : ""
      }
    </>
  )
}
