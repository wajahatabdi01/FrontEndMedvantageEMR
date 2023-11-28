import React,{useEffect,useState} from 'react';
import verificationGif from '../assest/image/119048-login-verification.gif';
import VerifyEmailOrMobile from '../API/POST/VerifyEmailOrMobile';
import { useNavigate } from 'react-router-dom';
export default function VerifyEmail() {
    let [valEmailOrMobile,setvalEmailOrMobile]=useState('');
    let [valAccntOrCmpnyName,setvalAccntOrCmpnyName]=useState('');
    const navigate = useNavigate();
    let handlerChange = (e)=>{
    if(e.target.name === "emailOrMobile"){
        setvalEmailOrMobile(e.target.value);
       
    }
    else if(e.target.name === "companyName"){
        setvalAccntOrCmpnyName(e.target.value);
    }
    }
    let btnVerify = async ()=>{
        document.getElementById('failureEmptyEmailOrMbl').style.display="none";
        document.getElementById('failureEmptyAccntOrCmpny').style.display="none";
        document.getElementById('failureResponse').style.display="none";
        if(valEmailOrMobile === '' || valEmailOrMobile === null || valEmailOrMobile === undefined){
            document.getElementById('failureEmptyEmailOrMbl').style.display="block";
            return false;
        }
        else if(valAccntOrCmpnyName === '' || valAccntOrCmpnyName === null || valAccntOrCmpnyName === undefined){
            document.getElementById('failureEmptyAccntOrCmpny').style.display="block";
            return false;
        }
        else{
            window.sessionStorage.setItem("EmailOrMobileNumber",valEmailOrMobile);
            window.sessionStorage.setItem("accountOrCompanyName",valAccntOrCmpnyName);
            let data = await VerifyEmailOrMobile(valEmailOrMobile);
            console.log('data',data);
            if(data.status === 1){
                navigate('/verify-otp'); 
            }
            if(data.status === 0){
                document.getElementById('responseMessage').innerHTML=data.responseValue;
                document.getElementById('failureResponse').style.display="block";
            }
              
        }
      console.log('email',valEmailOrMobile);
      console.log('com',valAccntOrCmpnyName);
    }
    let existingAccount =()=>{
        navigate('/login'); 
    }
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
                                {/* <div id="success" className="alert alert-success alert-dismissible fade show" role="alert"
                                    style={{ display: 'none' }}>
                                    <strong><i className="fa fa-check" aria-hidden="true"></i> </strong> Your travel request has been successfully submitted */}
                                    {/* <button type="button" className="close" data-dismiss="alert" aria-label="Close"> */}
                                        {/* <!-- <span aria-hidden="true">×</span> --> */}
                                    {/* </button> */}
                                {/* </div> */}
                                <div id="failureEmptyEmailOrMbl" className="alert alert-danger alert-dismissible fade show" role="alert"
                                    style={{ display: 'none' }}>
                                    <strong><i className="fa fa-exclamation-triangle" aria-hidden="true"></i> </strong> Please fill email or mobile number..!!
                                    {/* <button type="button" className="close" data-dismiss="alert" aria-label="Close"> */}
                                        {/* <!-- <span aria-hidden="true">×</span> --> */}
                                    {/* </button> */}
                                </div>
                                <div id="failureEmptyAccntOrCmpny" className="alert alert-danger alert-dismissible fade show" role="alert"
                                    style={{ display: 'none' }}>
                                    <strong><i className="fa fa-exclamation-triangle" aria-hidden="true"></i> </strong> Please fill  account name or company name..!!
                                    {/* <button type="button" className="close" data-dismiss="alert" aria-label="Close"> */}
                                        {/* <!-- <span aria-hidden="true">×</span> --> */}
                                    {/* </button> */}
                                </div>
                                <div id="failureResponse" className="alert alert-danger alert-dismissible fade show" role="alert"
                                    style={{ display: 'none' }}>
                                    <strong><i className="fa fa-exclamation-triangle" aria-hidden="true"></i> </strong> <span id="responseMessage"></span>
                                    {/* <button type="button" className="close" data-dismiss="alert" aria-label="Close"> */}
                                        {/* <!-- <span aria-hidden="true">×</span> --> */}
                                    {/* </button> */}
                                </div>
                            </div>

                            <div className="login-label-input">
                                <div className="text-thin-gray mt-4 mb-5">Let’s get you all set up so you can verify your personal
                                    account and begin setting up your profile.</div>
                                <div className="login-para">
                                    <label>Enter user email or mobile</label>
                                    <div className="login-text-w300">Used for account recovery </div>
                                    <input type="text" name="emailOrMobile" value={valEmailOrMobile} id="EmailorMobile" required onChange={handlerChange}/>
                                </div>

                                <div className="login-para">
                                    <label>Enter account name or company name</label>
                                    <div className="login-text-w300">Enter a name for your account</div>
                                    <input type="text" name="companyName" value={valAccntOrCmpnyName} id="companyName" required onChange={handlerChange}/>
                                </div>

                                <div className="login-para">
                                    {/* <!-- <input type="submit" className="btn-coral" id="btnSubmit" value="Verify Email Address"/> --> */}
                                    {/* <!-- <button type="submit" id="btnSubmit" className="btn-coral" value="Verify Email Address" >Verify Email Address</button> --> */}
                                    <button className="btn-coral" onClick={btnVerify}>Verify email or mobile</button>
                                    <div className="text-center mt-4">
                                        <a href="##" className="forgot-password-text">Or</a>
                                    </div>
                                </div>

                                <div>
                                    <button type="button" className="btn-border" onClick={existingAccount}>Signin to an existing
                                        account</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}