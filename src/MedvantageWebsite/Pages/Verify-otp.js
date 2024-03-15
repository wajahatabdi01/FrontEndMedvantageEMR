import React,{useEffect,useState} from 'react';
import verificationGif from '../assest/image/119048-login-verification.gif';
import Verify_Otp from '../API/POST/Verify-otp';
import { useNavigate } from 'react-router-dom';
import VerifyEmailOrMobile from '../API/POST/VerifyEmailOrMobile';
export default function VerifyOtp() {
    let [emailOrMobile,setEmailOrMobile]=useState(window.sessionStorage.getItem("EmailOrMobileNumber"));
    let [accntOrCmpnyName,setaccntOrCmpnyName]=useState(window.sessionStorage.getItem("accountOrCompanyName"));
    let [otp,setOtp]=useState('');
    const navigate=useNavigate();
    let getUserDetails=()=>{
        // setEmailOrMobile(window.sessionStorage.getItem("EmailOrMobileNumber"));
        // setaccntOrCmpnyName(window.sessionStorage.getItem("accountOrCompanyName"));
        // document.getElementById('labelGetEmailOrMobile').innerHTML=emailOrMobile;
    }
    let handlerChange = (e)=>{
        if(e.target.name === "textOTP"){
            setOtp(e.target.value);
        
        }
    }
    let BtnVerifyOtp = async ()=>{
        document.getElementById('failureEmptyOtp').style.display="none";
        document.getElementById('failureResponse').style.display="none";
        document.getElementById('success').style.display="none";
        if(otp === '' || otp === null || otp === undefined || otp === 0){
            document.getElementById('failureEmptyOtp').style.display="block";
            return false;
        }
        else{
            let data= await Verify_Otp(otp,emailOrMobile);
            
            if(data.status === 1){
                navigate('/signup');
            }
            if(data.status === 0){
                document.getElementById('resposneMessage').innerHTML=data.responseValue;
                document.getElementById('failureResponse').style.display="block";
            }
              
        } 
    }
    let resendOTP = async()=>{
        document.getElementById('failureEmptyOtp').style.display="none";
        document.getElementById('failureResponse').style.display="none";
        document.getElementById('success').style.display="none";
         let data = await VerifyEmailOrMobile(emailOrMobile);
         
         if(data.status === 1){
            document.getElementById('success').style.display="block";
         }
        if(data.status === 0){
            document.getElementById('responseMessage').innerHTML=data.responseValue;
            document.getElementById('failureResponse').style.display="block";
        }
    }
    useEffect(()=>{
        getUserDetails();
    },[]);
    return (
        <>
            <div className="loaderReg" id="loader"><img src="./image/LoginIcon.gif" /></div>
            <section className="login-wrapper">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="login-label-input" style={{ borderLeft: '1px solid white' }}>
                                <div className="text-bold-gray mb-1 mt-3">Sign Up</div>
                                <div className="text-bold-gray mb-1">Innovative, Healthcare
                                    Products</div>
                                <div className="text-thin-gray">To learn more, visit our plans.</div>
                                <img src={verificationGif} alt="" className="login-side-img" />

                            </div>
                        </div>
                        <div className="col-sm-6">

                            <div className="for-alert">
                                <div id="success" className="alert alert-success alert-dismissible fade show" role="alert"
                                    style={{ display: 'none' }}>
                                    <strong><i className="fa fa-check" aria-hidden="true"></i> </strong> Otp Resend Successfully
                                    {/* <button type="button" className="close" data-dismiss="alert" aria-label="Close"> */}
                                        {/* <!-- <span aria-hidden="true">×</span> --> */}
                                    {/* </button> */}
                                </div>
                                <div id="failureEmptyOtp" className="alert alert-danger alert-dismissible fade show" role="alert"
                                    style={{ display: 'none' }}>
                                    <strong><i className="fa fa-exclamation-triangle" aria-hidden="true"></i> </strong> Please Fill OTP..!!
                                    {/* <button type="button" className="close" data-dismiss="alert" aria-label="Close"> */}
                                        {/* <!-- <span aria-hidden="true">×</span> --> */}
                                    {/* </button> */}
                                </div>
                                <div id="failureResponse" className="alert alert-danger alert-dismissible fade show" role="alert"
                                    style={{ display: 'none' }}>
                                    <strong><i className="fa fa-exclamation-triangle" aria-hidden="true"></i> </strong><span id="resposneMessage"></span>
                                    {/* <button type="button" className="close" data-dismiss="alert" aria-label="Close"> */}
                                        {/* <!-- <span aria-hidden="true">×</span> --> */}
                                    {/* </button> */}
                                </div>
                               
                            </div>

                            <div className="login-label-input">
						<div className="text-thin-gray mt-4"><b>Confirmation for your identity</b></div>
						<div className="text-thin-gray">We sent an email with a verification code to</div>
						<div className="text-thin-gray login-text-w300"><b><span id="labelGetEmailOrMobile">{emailOrMobile}</span> <a href="##">Not
									You?</a></b></div>
						<div className="text-thin-gray mt-4">Enter it below to confirm your email.</div>

						<div className="login-para mt-2">
							<div className="login-text-w300">Verification code</div>
							<input type="text" name="textOTP" value={otp} id="textOTP" onChange={handlerChange}/>
							<input type="hidden" name="" id="textGetEmail" />
						</div>

						<div className="login-para">
							<button type="button" className="btn-coral" onClick={BtnVerifyOtp}>Verify</button>
						</div>

						<div>
							<button type="button" className="btn-border" onClick={resendOTP}>Resend verification
								code</button>
						</div>
					</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}