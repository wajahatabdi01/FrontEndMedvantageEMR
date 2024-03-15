import React, { useEffect, useState } from 'react';
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import verificationGif from '../assest/image/119048-login-verification.gif';
import VerifyEmailOrMobile from '../API/POST/VerifyEmailOrMobile';
import { useNavigate } from 'react-router-dom';
import ExportPatientDataVerifyOtp from '../API/GET/ExportPatientDataVerifyOtp';
import ExportPatientDataVerifyUHID from '../API/GET/ExportPatientDataVerifyUHID';
export default function VerifyUHID() {
    let [uhid, setUHID] = useState('');
    let [otp, setOTP] = useState('');
    let [mobileNo, setMobileNo] = useState('');
    let [formatMobNo, setFormatMobNo] = useState('');
    let [isVerifyUHID, setIsVerifyUHID] = useState(false);
    let [navigateTo, setNavigateTo] = useState(window.sessionStorage.getItem("isClickedExportPatientData"));
    const navigate = useNavigate();
    let handlerChange = (e) => {
        if (e.target.name === "uhid") {
            clearStepOneErrorMsg();
            setUHID(e.target.value);
        }
        if (e.target.name === "textOTP") {
            clearStepTwoErrorMsg();
            setOTP(e.target.value.replace(/\D/g, ''));
        }
    }
    let handleVerifyUHID = async () => {
        clearStepOneErrorMsg();
        if (uhid.trim() === '' || uhid === null || uhid === undefined) {
            document.getElementById('failureEmptyUhid').style.display = "block";
            return false;
        }
        else if (uhid.length < 7 || uhid.length > 10) {
            document.getElementById('failureWrongUhid').style.display = "block";
            return false;
        }
        else {
            let resposne = await ExportPatientDataVerifyUHID(uhid);
            if (resposne.status === 1) {
                var showLastDigitMonNo = 'XXXXXX' + resposne.responseValue.slice(-4);
                setMobileNo(resposne.responseValue);
                setFormatMobNo(showLastDigitMonNo);
                setIsVerifyUHID(true);
            }
            else {
                document.getElementById('failureMsg').style.display = "block";
                document.getElementById("showErrMsg").innerHTML = resposne.responseValue;
            }
        }

    }
    let handleVerifyOtp = async () => {
        clearStepTwoErrorMsg();
        if (otp.trim() === '' || otp === undefined || otp === null) {
            document.getElementById('failureEmptyOtp').style.display = "block";
        }
       else if (otp.length < 6 || otp === undefined || otp === null) {
            document.getElementById('resposneMessage').innerHTML = "Invalid OTP";
            document.getElementById('failureOTPResponse').style.display = "block";
        }
        else {
            var obj = {
                mobileNo: mobileNo,
                otp: otp
            }
            let response = await ExportPatientDataVerifyOtp(obj);
            if (response.status === 1) {
                window.sessionStorage.setItem('key', uhid);
                
                 if (parseInt(navigateTo) === 1) {

                    navigate("/patientData/");
                 }
                 else if (parseInt(navigateTo) === 2) {

                    navigate("/patientCCDAData/");
                 }
            }
            else {
                document.getElementById('failureOTPResponse').style.display = "block";
                document.getElementById('resposneMessage').innerHTML = response.responseValue;

            }
        }

    }
    let handleResendOTP = async () => {
        clearStepTwoErrorMsg();
        if (uhid !== '' || uhid !== undefined || uhid !== null) {
            let resposne = await ExportPatientDataVerifyUHID(uhid);
            if (resposne.status === 1) {
                document.getElementById('successResendOTP').style.display = "block";
            }
            else {
                document.getElementById('failureOTPResponse').style.display = "block";
                document.getElementById("resposneMessage").innerHTML = resposne.message;
            }
        }
    }
    let clearStepOneErrorMsg = () => {
        document.getElementById('failureEmptyUhid').style.display = "none";
        document.getElementById('failureWrongUhid').style.display = "none";
        document.getElementById('failureMsg').style.display = "none";
    }
    let clearStepTwoErrorMsg = () => {
        document.getElementById('successResendOTP').style.display = "none";
        document.getElementById('failureOTPResponse').style.display = "none";
        document.getElementById('failureEmptyOtp').style.display = "none";
    }
    return (
        <>
        <Navbar/>
         <section className='about-us12' style={{minHeight:'50vh', background:'#fff'}}>
            <div class="loaderReg" id="loader"><img src="./image/LoginIcon.gif" alt=''/></div>
                <div class="container">
                    <div class="uhidvery-in">
                        <div class="uhidvery">
                            <div class="login-label-input1 vverifypic">
                                {isVerifyUHID === false ? <div class="veryfyopf">Verify UHID</div>
                                    : <div class="text-bold-gray mb-1 mt-3 text-center">Verify OTP</div>}
                                <img src={verificationGif} alt="" class="login-side-img" />
                            </div>
                        </div>
                        {isVerifyUHID === false ?
                            <div class="uhidvery verifybox">

                                <div class="for-alert">
                                    <div id="failureEmptyUhid" class="alert alert-danger alert-dismissible fade show" role="alert"
                                        style={{ display: 'none' }}>
                                        <strong><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> </strong> Please Fill UHID..!!
                                    </div>
                                    <div id="failureWrongUhid" class="alert alert-danger alert-dismissible fade show" role="alert"
                                        style={{ display: 'none' }}>
                                        <strong><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> </strong> Please Fill Correct UHID..!!
                                    </div>
                                    <div id="failureMsg" class="alert alert-danger alert-dismissible fade show" role="alert"
                                        style={{ display: 'none' }}>
                                        <strong><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> </strong> <span id='showErrMsg'></span>
                                    </div>

                                </div>
                                <div class="login-label-input2">
                                    <div class="login-para">
                                        <label>Enter UHID</label>
                                        <input type="text" name="uhid" value={uhid} id="companyName" required onChange={handlerChange} />
                                    </div>
                                    <div class="login-para">
                                        <button class="btn-coral" onClick={handleVerifyUHID}>Verify UHID</button>

                                    </div>
                                </div>
                            </div>
                            : ''
                        }

                        {/* Used To Verify OTP */}
                        {isVerifyUHID === true ?
                            <div class="uhidvery">
                                <div class="for-alert">
                                    <div id="successResendOTP" class="alert alert-success alert-dismissible fade show" role="alert"
                                        style={{ display: 'none' }}>
                                        <strong><i class="fa fa-check" aria-hidden="true"></i> </strong> Otp Resend Successfully
                                    </div>
                                    <div id="failureEmptyOtp" class="alert alert-danger alert-dismissible fade show" role="alert"
                                        style={{ display: 'none' }}>
                                        <strong><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> </strong> Please Fill OTP..!!
                                    </div>
                                    <div id="failureOTPResponse" class="alert alert-danger alert-dismissible fade show" role="alert"
                                        style={{ display: 'none' }}>
                                        <strong><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> </strong><span id="resposneMessage"></span>
                                    </div>
                                </div>
                                <div class="login-label-input1">
                                    <div class="text-thin-gray e1 mt-4"><b>Confirmation for your identity</b></div>
                                    <div class="text-thin-gray e2">We sent an message with a verification code to your register mobile number</div>
                                    <div class="text-thin-gray e2"><b><span id="labelGetEmailOrMobile">{formatMobNo}</span> <a href="##">Not
                                        You?</a></b></div>
                                    <div class="text-thin-gray e3">Enter it below to confirm your identity.</div>
                                    <div class="login-para mt-2">
                                        <div class="login-text-w300 e4 ">Enter Verification code</div>
                                        <input type="text" name="textOTP" value={otp} id="textOTP" placeholder='Enter OTP...' maxLength={6} autocomplete="off" inputmode="numeric" onChange={handlerChange} />
                                    </div>
                                    <div class="login-para">
                                        <button type="button" class="btn-coral" onClick={handleVerifyOtp}>Verify OTP</button>
                                    </div>
                                    <div>
                                        <button type="button" class="btn-border" onClick={handleResendOTP}>Resend verificationcode</button>
                                    </div>
                                </div>
                            </div>
                            : ''}

                    </div>
                </div>
         </section>
        <Footer/>
        </>
    )
}