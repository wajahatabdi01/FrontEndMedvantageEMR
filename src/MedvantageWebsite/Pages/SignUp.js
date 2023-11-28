import React, { useState, useEffect } from 'react'
import LoginGif from '../assest/image/119048-login-verification.gif'
import GetCountryList from '../API/GET/GetCountryList';
import GetStateList from '../API/GET/GetStateList';
import GetCityList from '../API/GET/GetCityList';
import VerifyAndSignUp from '../API/POST/SignUp';
import { useNavigate } from 'react-router-dom';
import GetLanguageMaster from '../../Admin/Api/Master/LanguageMaster/GetLanguageMaster';
export default function SignUp() {
    const navigate = useNavigate();
    let [passwordType, setPasswordType] = useState('password');
    let [confirmPasswordType, setConfirmPasswordType] = useState('password');
    let [companyName, setCompanyName] = useState('');
    let [emailOrMobile, setEmailOrMobile] = useState('');
    let [countryList, setCountryList] = useState('');
    let [stateList, setStateList] = useState('');
    let [cityList, setCityList] = useState('');
    let [txtpassword, setTxtpassword] = useState('');
    let [txtconfirmpassword, setTxtconfirmpassword] = useState('');
    let [txtaddress, setTxtaddress] = useState('');
    let [txtpostalCode, setTxtpostalCode] = useState('');
    let [txtContactPersonName, setTxtContactPersonName] = useState('');
    let [txtContactpersonmobieno, setTxtContactpersonmobieno] = useState('');
    let [OTPmobileNumber, setOTPmobileNumber] = useState('');
    let [language, setLanguage] = useState('');
    let [companyLogo, setCompanyLogo] = useState('');


    let getData = async () => {
        setCompanyName(window.sessionStorage.getItem("accountOrCompanyName"));
        setEmailOrMobile(window.sessionStorage.getItem("EmailOrMobileNumber"));
        let response = await GetLanguageMaster()
        if (response.status === 1) {
            setLanguage(response.responseValue)
            document.getElementById("ddlLanguage").value = "1";

        }
    }
    let handlerChange = async (e) => {
        if (e.target.name === "password") {
            let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})')
            let mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))')
            setTxtpassword(e.target.value);
            let state = false;
            let password = e.target.value
            let passwordStrength = document.getElementById("password-strength");
            let lowUpperCase = document.querySelector(".low-upper-case i");
            let number = document.querySelector(".one-number i");
            let specialChar = document.querySelector(".one-special-char i");
            let eightChar = document.querySelector(".eight-character i");
            if (password !== "") {
                checkStrength(password);

            }
            else {
                // passwordStrength.classList.remove('progress-bar-warning');
                // passwordStrength.classList.remove('progress-bar-success');
                // passwordStrength.classList.add('progress-bar-danger');
                passwordStrength.style = 'width: 0%';
            }

            function checkStrength(password) {
                let strength = 0;

                //If password contains both lower and uppercase characters
                if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
                    strength += 1;
                    lowUpperCase.classList.remove('fa-circle');
                    lowUpperCase.classList.add('fa-check');
                } else {
                    lowUpperCase.classList.add('fa-circle');
                    lowUpperCase.classList.remove('fa-check');
                }
                //If it has numbers and characters
                if (password.match(/([0-9])/)) {
                    strength += 1;
                    number.classList.remove('fa-circle');
                    number.classList.add('fa-check');
                } else {
                    number.classList.add('fa-circle');
                    number.classList.remove('fa-check');
                }
                //If it has one special character
                if (password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
                    strength += 1;
                    specialChar.classList.remove('fa-circle');
                    specialChar.classList.add('fa-check');
                } else {
                    specialChar.classList.add('fa-circle');
                    specialChar.classList.remove('fa-check');
                }
                //If password is greater than 7
                if (password.length > 7) {
                    strength += 1;
                    eightChar.classList.remove('fa-circle');
                    eightChar.classList.add('fa-check');
                } else {
                    eightChar.classList.add('fa-circle');
                    eightChar.classList.remove('fa-check');
                }

                // If value is less than 2

                if (strength < 2) {
                    passwordStrength.classList.remove('progress-bar-warning');
                    passwordStrength.classList.remove('progress-bar-success');
                    passwordStrength.classList.add('progress-bar-danger');
                    passwordStrength.style = 'width: 10%';
                } else if (strength == 3) {
                    passwordStrength.classList.remove('progress-bar-success');
                    passwordStrength.classList.remove('progress-bar-danger');
                    passwordStrength.classList.add('progress-bar-warning');
                    passwordStrength.style = 'width: 60%';
                } else if (strength == 4) {
                    passwordStrength.classList.remove('progress-bar-warning');
                    passwordStrength.classList.remove('progress-bar-danger');
                    passwordStrength.classList.add('progress-bar-success');
                    passwordStrength.style = 'width: 100%';
                }
            }
        }
        else if (e.target.name === "confirmpassword") {
            setTxtconfirmpassword(e.target.value);
        }
        else if (e.target.name === "address") {
            setTxtaddress(e.target.value);
        }
        else if (e.target.name === "postalCode") {
            setTxtpostalCode(e.target.value);
        }
        else if (e.target.name === "ContactPersonName") {
            setTxtContactPersonName(e.target.value);
        }
        else if (e.target.name === "Contactpersonmobieno") {
            setTxtContactpersonmobieno(e.target.value);
        }
        else if (e.target.name === "OTPmobileNumber") {
            setOTPmobileNumber(e.target.value);
        }
        else if (e.target.name === "formFile") {
            const formData = new FormData();
            formData.append('formFile', e.target.files[0])
            setCompanyLogo(formData);
        }


    }
    let getCountry = async () => {
        let data = await GetCountryList();
        console.log('res', data.responseValue);
        setCountryList(data.responseValue);
    }
    let getStateByCountry = async (event) => {
        const countryID = event.target.value;
        let data = await GetStateList(countryID);
        console.log('countryID', countryID);
        console.log('res', data.responseValue);
        setStateList(data.responseValue);
    }
    let getCityByState = async (event) => {
        const stateID = event.target.value;
        let data = await GetCityList(stateID);
        console.log('stateID', stateID);
        console.log('res', data.responseValue);
        setCityList(data.responseValue);
    }
    let togglePasswordHandler = () => {
        if (passwordType === "password") {
            setPasswordType("text");

        } else {
            setPasswordType("password");
        }
    }
    let toggleConfirmPasswordHandler = () => {
        if (confirmPasswordType === "password") {
            setConfirmPasswordType("text");

        } else {
            setConfirmPasswordType("password");
        }
    }
    function encodeQuery(data) {
        let query = ""
        for (let d in data)
          query += encodeURIComponent(d) + '='
            + encodeURIComponent(data[d]) + '&'
        return "?" + query.slice(0, -1)
      }
    let registerUser = async () => {
        const ddl_country = document.getElementById('ddlCountry').value;
        const ddl_state = document.getElementById('ddlState').value;
        const ddl_city = document.getElementById('ddlCity').value;
        const languageId = parseInt(document.getElementById("ddlLanguage").value)
        document.getElementById('invalidPassword').style.display = "none";
        document.getElementById('notMachPassword').style.display = "none";
        document.getElementById('notSelectedCountry').style.display = "none";
        document.getElementById('notSelectedState').style.display = "none";
        document.getElementById('notSelectedCity').style.display = "none";
        document.getElementById('notFillAddress').style.display = "none";
        document.getElementById('notFillPostalCode').style.display = "none";
        document.getElementById('failureResponse').style.display = 'none';
        document.getElementById('success').style.display = 'none';
        if (txtpassword.length > 10 || txtpassword.length < 6) {
            document.getElementById('invalidPassword').style.display = "block";
            return false;
        }
        if (txtconfirmpassword !== txtpassword) {
            document.getElementById('notMachPassword').style.display = "block";
            return false;
        }
        if (txtconfirmpassword !== txtpassword) {
            document.getElementById('notMachPassword').style.display = "block";
            return false;
        }
        if (ddl_country == '0' || ddl_country == '' || ddl_country === undefined) {
            document.getElementById('notSelectedCountry').style.display = "block";
            return false;
        }
        if (ddl_state == '0' || ddl_state == '' || ddl_state === undefined) {
            document.getElementById('notSelectedState').style.display = "block";
            return false;
        }
        if (ddl_city == '0' || ddl_city == '' || ddl_city === undefined) {
            document.getElementById('notSelectedCity').style.display = "block";
            return false;
        }
        if (txtaddress == '' || txtaddress === null) {
            document.getElementById('notFillAddress').style.display = "block";
            return false;
        }
        if (txtpostalCode == '' || txtpostalCode === undefined) {
            document.getElementById('notFillPostalCode').style.display = "block";
            return false;
        }
        if (txtContactPersonName == '' || txtContactPersonName === undefined) {
            document.getElementById('notFillContactPersonName').style.display = "block";
            return false;
        }
        if (txtContactpersonmobieno == '' || txtContactpersonmobieno === undefined) {
            document.getElementById('notFillContactpersonmobieno').style.display = "block";
            return false;
        }
        if (OTPmobileNumber == '' || OTPmobileNumber === undefined) {
            document.getElementById('notFillOTPmobileNumber').style.display = "block";
            return false;
        }
        else {
            var dataObj = {
                name: companyName,
                userName: emailOrMobile,
                password: txtconfirmpassword,
                address: txtaddress,
                country: ddl_country,
                state: ddl_state,
                city: ddl_city,
                pinCode: txtpostalCode,
                languagePreferredId: languageId,
                otpMobileNo: OTPmobileNumber,
                contactPersonName: txtContactPersonName,
                contactPersonMobileNo: txtContactpersonmobieno,
                
            }
            let dataenctypt  = encodeQuery(dataObj)
            console.log('dataObj', dataenctypt);
            let data = await VerifyAndSignUp(dataenctypt, companyLogo);
            console.log('data', data);
            if (data.status === 1) {
                navigate('/login');
            }
            else if (data.status === 0) {
                document.getElementById('errResponseMessages').innerHTML = data.responseValue;
                document.getElementById('failureResponse').style.display = 'block';
            }
        }
    }

    useEffect(() => {
        getData();
        getCountry();

    }, []);
    return (
        <>
            <section className="login-wrapper mb-5">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-6">
                            <div className="login-label-input" style={{ borderLeft: '1px solid white' }}>
                                <div className="text-bold-gray mb-1 mt-3">Sign Up</div>
                                <div className="text-bold-gray mb-1">Innovative, Healthcare
                                    Products</div>
                                <div className="text-thin-gray">To learn more, visit our plans.</div>
                                <img src={LoginGif} alt="" className="login-side-img" />
                            </div>
                        </div>
                        <div className="col-sm-6">

                            <div className="for-alert">
                                <div id="success" className="alert alert-success alert-dismissible fade show" role="alert"
                                    style={{ display: 'none' }}>
                                    <strong><i className="fa fa-check" aria-hidden="true"></i> </strong> Your registration has been successfully completed
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        {/* <!-- <span aria-hidden="true">×</span> --> */}
                                    </button>
                                </div>
                                <div id="failureResponse" className="alert alert-danger alert-dismissible fade show" role="alert"
                                    style={{ display: 'none' }}>
                                    <strong><i className="fa fa-exclamation-triangle" aria-hidden="true"></i> </strong> <span id="errResponseMessages"></span>
                                    {/* <button type="button" className="close" data-dismiss="alert" aria-label="Close"> */}
                                    {/* <!-- <span aria-hidden="true">×</span> --> */}
                                    {/* </button> */}
                                </div>
                                <div id="failureSecond" className="alert alert-danger alert-dismissible fade show" role="alert"
                                    style={{ display: 'none' }}>
                                    <strong><i className="fa fa-exclamation-triangle" aria-hidden="true"></i> </strong> Please Fill Authentic Information!
                                    <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                                        {/* <!-- <span aria-hidden="true">×</span> --> */}
                                    </button>
                                </div>
                            </div>


                            <div className="login-label-input">
                                <div className="mt-4 mb-3"><b style={{ letterSpacing: '1px', fontSize: '17px' }}>Complete your account
                                    profile</b></div>

                                <div className="register-para">
                                    <label>Company Name<sup style={{ color: 'red' }}>*</sup></label>
                                    {/* <!-- <span id="labelGetEmail"></span> --> */}
                                    <input type="text" name="companyName" value={companyName} id="labelGetCompanyName" readonly />
                                </div>

                                <div className="register-para">
                                    {/* <!-- <label>Email or Mobile</label> --> */}
                                    <label>User ID<sup style={{ color: 'red' }}>*</sup></label>
                                    <input type="text" name="getEmailOrMobile" value={emailOrMobile} id="labelGetEmail" readonly />
                                </div>

                                <div className="register-para relative">
                                    <label>Password<sup style={{ color: 'red' }}>*</sup></label>
                                    <input type={passwordType} id="Password" name="password" value={txtpassword} onChange={handlerChange} />
                                    {passwordType === "password" ? <i id='#passOpenEye' className="fa-solid fa-eye view-password" style={{ marginLeft: '4px', cursor: 'pointer' }} onClick={togglePasswordHandler}></i>
                                        : <i id='#passCloseEye' className="fa-solid fa-eye-slash view-password" style={{ marginLeft: '4px', cursor: 'pointer' }} onClick={togglePasswordHandler}></i>}
                                    <small id="invalidPassword" className="form-text text-danger" style={{ display: 'none' }}>
                                        Your Password must be 6-10 characters long.
                                    </small>
                                    {/* new  */}
                                    <div id="popover-password">
                                        <p><span id="result"></span></p>
                                        <div className="progress mb-2">
                                            <div id="password-strength"
                                                className="progress-bar"
                                                role="progressbar"
                                                aria-valuenow="40"
                                                aria-valuemin="0"
                                                aria-valuemax="100"
                                                style={{ "width": "0%" }}>
                                            </div>
                                        </div>
                                        {/* <br /> */}
                                        <ul className="list-unstyled">
                                            <li className="">
                                                <span className="low-upper-case">
                                                    <i className="fas fa-circle" aria-hidden="true"></i>
                                                    &nbsp;Lowercase &amp; Uppercase
                                                </span>
                                            </li>
                                            <li className="">
                                                <span className="one-number">
                                                    <i className="fas fa-circle" aria-hidden="true"></i>
                                                    &nbsp;Number (0-9)
                                                </span>
                                            </li>
                                            <li className="">
                                                <span className="one-special-char">
                                                    <i className="fas fa-circle" aria-hidden="true"></i>
                                                    &nbsp;Special Character (!@#$%^&*)
                                                </span>
                                            </li>
                                            <li className="">
                                                <span className="eight-character">
                                                    <i className="fas fa-circle" aria-hidden="true"></i>
                                                    &nbsp;Atleast 6 Character
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="register-para relative">
                                    <label>Confirm Password<sup style={{ color: 'red' }}>*</sup></label>
                                    <input type={confirmPasswordType} id="rePassword" name="confirmpassword" value={txtconfirmpassword} onChange={handlerChange} />
                                    {confirmPasswordType === "password" ? <i id='#cpassOpenEye' className="fa-solid fa-eye view-password" style={{ marginLeft: '4px', cursor: 'pointer' }} onClick={toggleConfirmPasswordHandler}></i>
                                        : <i id='#cpassCloseEye' className="fa-solid fa-eye-slash view-password" style={{ marginLeft: '4px', cursor: 'pointer' }} onClick={toggleConfirmPasswordHandler}></i>}
                                    <small id="notMachPassword" className="form-text text-danger" style={{ display: 'none' }}>
                                        Your Password and Confirm Password did not match.
                                    </small>
                                </div>

                                <div className="register-para">
                                    <label>Country<sup style={{ color: 'red' }}>*</sup></label>
                                    <select id="ddlCountry" onChange={getStateByCountry}>
                                        <option value="">Select</option>
                                        {countryList && countryList.map((list) => {
                                            return (
                                                <option value={list.id}>{list.countryName}</option>
                                            )
                                        })}
                                    </select>
                                    <small id="notSelectedCountry" className="form-text text-danger" style={{ display: 'none' }}>
                                        Please Select Country
                                    </small>
                                </div>

                                <div className="register-para">
                                    <label>State<sup style={{ color: 'red' }}>*</sup></label>
                                    <select id="ddlState" onChange={getCityByState}>
                                        <option value="">Select</option>
                                        {stateList && stateList.map((list) => {
                                            return (
                                                <option value={list.id}>{list.stateName}</option>
                                            )
                                        })}
                                    </select>
                                    <small id="notSelectedState" className="form-text text-danger" style={{ display: 'none' }}>
                                        Please Select State
                                    </small>
                                </div>

                                <div className="register-para">
                                    <label>City<sup style={{ color: 'red' }}>*</sup></label>
                                    <select id="ddlCity">
                                        <option value="">Select</option>
                                        {cityList && cityList.map((list) => {
                                            return (
                                                <option value={list.id}>{list.name}</option>
                                            )
                                        })}
                                    </select>
                                    <small id="notSelectedCity" className="form-text text-danger" style={{ display: 'none' }}>
                                        Please Select City
                                    </small>
                                </div>

                                <div className="register-para">
                                    <label>Language<sup style={{ color: 'red' }}>*</sup></label>
                                    <select id="ddlLanguage">
                                        <option value="">Select</option>
                                        {language && language.map((list) => {
                                            if (list.id === 1) {
                                                return (
                                                    <option value={list.id} selected>{list.language}</option>
                                                )

                                            }
                                            else {
                                                return (
                                                    <option value={list.id}>{list.language}</option>
                                                )
                                            }
                                        })}
                                    </select>
                                    <small id="notSelectedCity" className="form-text text-danger" style={{ display: 'none' }}>
                                        Please Select Language
                                    </small>
                                </div>

                                <div className="register-para">
                                    <label>Address<sup style={{ color: 'red' }}>*</sup></label>
                                    <input type="text" id="Address" name="address" value={txtaddress} onChange={handlerChange} />
                                    <small id="notFillAddress" className="form-text text-danger" style={{ display: 'none' }}>
                                        Please Fill Address..
                                    </small>
                                </div>

                                <div className="register-para">
                                    <label>Postal Code<sup style={{ color: 'red' }}>*</sup></label>
                                    <input type="text" id="PostalCode" name="postalCode" value={txtpostalCode} onChange={handlerChange} />
                                    <small id="notFillPostalCode" className="form-text text-danger" style={{ display: 'none' }}>
                                        Please Fill Postal Code..
                                    </small>
                                </div>

                                <div className="register-para">
                                    <label>Contact Person Name<sup style={{ color: 'red' }}>*</sup></label>
                                    <input type="text" id="ContactPersonName" name="ContactPersonName" value={txtContactPersonName} onChange={handlerChange} />
                                    <small id="notFillContactPersonName" className="form-text text-danger" style={{ display: 'none' }}>
                                        Please Fill Contact Person Name...
                                    </small>
                                </div>
                                <div className="register-para">
                                    <label>Contact Person Mobile Number<sup style={{ color: 'red' }}>*</sup></label>
                                    <input type="text" id="Contactpersonmobieno" name="Contactpersonmobieno" value={txtContactpersonmobieno} onChange={handlerChange} />
                                    <small id="notFillContactpersonmobieno" className="form-text text-danger" style={{ display: 'none' }}>
                                        Please Fill Contact Person Mobile Number...
                                    </small>
                                </div>
                                <div className="register-para">
                                    <label>OTP mobile Number<sup style={{ color: 'red' }}>*</sup></label>
                                    <input type="text" id="OTPmobileNumber" name="OTPmobileNumber" value={OTPmobileNumber} onChange={handlerChange} />
                                    <small id="notFillOTPmobileNumber" className="form-text text-danger" style={{ display: 'none' }}>
                                        Please Fill OTP mobile Number...
                                    </small>
                                </div>
                                <div className="register-para">
                                    <label>Company Logo<sup style={{ color: 'red' }}>*</sup></label>
                                    <input type="file" id="formFile" name="formFile"  onChange={handlerChange} />
                                    <small id="notFillformFile" className="form-text text-danger" style={{ display: 'none' }}>
                                        Please Select Company Logo...
                                    </small>
                                </div>

                                {/* <!-- <div className="register-para">
                            <div style="display: flex; gap:10px; align-items: flex-start;">
                                <input type="checkbox" name="" id="read-term">
                                <label for="read-term" style="font-size: 11px;font-weight: 300;"> I have read and agree
                                    to the terms and
                                    conditions</label>
                            </div>
                        </div> --> */}

                                <div className="register-para">
                                    <button type="button" className="btn-coral" onClick={registerUser}>Verify and
                                        Continue</button>
                                </div>


                            </div>
                        </div>
                    </div>
                </div>

            </section>
        </>
    )
}