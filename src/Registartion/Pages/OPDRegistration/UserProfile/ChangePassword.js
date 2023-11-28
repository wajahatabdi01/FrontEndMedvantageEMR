import React, { useEffect, useState } from "react";
import changepassword from "../../../../assets/images/LoginPage/changepassword.png"
import GetUserDetailsById from "../../../API/GET/GetUserDetailsById";
import PostChangePassword from "../../../API/UserProfileAPI/PostChangePassword";
import SuccessToster from "../../../../Component/SuccessToster";
import WarningToaster from "../../../../Component/WarningToaster";
import AlertToster from "../../../../Component/AlertToster";

export default function ChangePassword() {
    let [userList, setUserList] = useState([])
    let [sendForm, setSendForm] = useState({ "userId": window.userId })
    let [oldPassword, setOldPassword] = useState('')
    let [password, setPassword] = useState('')
    let [confirmPassword, setConfirmPassword] = useState('');
    let [passwordMatchError, setPasswordMatchError] = useState('');
    let [invalidPasswordText, setInvalidPasswordText] = useState('');
    let [oldPasswordShown, setOldPasswordShown] = useState(false);
    let [newPasswordShown, setNewPasswordShown] = useState(false);
    let [cnfPasswordShown, setCnfPasswordShown] = useState(false);

    const [oldPasswordError, setOldPasswordError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    let [message, setMessage] = useState("")
    let [showToster, setShowToster] = useState(0)

    let togglePasswordOld = () => {
        setOldPasswordShown(!oldPasswordShown);
    };
    let togglePasswordNew = () => {
        setNewPasswordShown(!newPasswordShown);
    };
    let togglePasswordCnf = () => {
        setCnfPasswordShown(!cnfPasswordShown);
    };

    //User By ID
    let getdataByID = async (val) => {
        let getResponse = await GetUserDetailsById(val);
        if (getResponse.status === 1) {
            setUserList(getResponse.responseValue[0])
        }
    }


    // Handle Update Password
    let changePassword = async () => {
        if (!oldPassword) {
            setOldPasswordError('Field cannot be blank');
            return;
        }
        if (!password) {
            setPasswordError('Field cannot be blank');
            return;
        }
        if (!confirmPassword) {
            setConfirmPasswordError('Field cannot be blank');
            return;
        }
        if (password !== confirmPassword) {
            setPasswordMatchError('Passwords do not match');
            return;
        }
        let data = {
            userId: sendForm.userId,
            oldPassword: oldPassword,
            password: password,
        };
        let response = await PostChangePassword(data);
        console.log('API Response:', response);
        if (response.status === 1) {
            // alert(response.message)
            setMessage("Password Changed successfully.")
            setShowToster(1);
            handleClear();
        }
        else {
            // alert(response.message);
            setMessage(response.responseValue)
            setShowToster(3)
        }
    };


    //Handle Change
    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        if (name === 'oldPassword') {
            setOldPassword(value);
            setOldPasswordError(value ? '' : 'Field cannot be blank');
            // setOldPasswordError(value ? '' : 'Field cannot be blank' || value.trim() === '' || value=== undefined || value===null ? 'Field cannot be blank' : 'Field must be filled');
        }
        if (name === 'password') {
            const strongPasswordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
            setPassword(value);
            if (!value) {
                setPasswordError('Field cannot be blank');
            } else if (!strongPasswordPattern.test(value)) {
                setInvalidPasswordText(
                    'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number.'
                );
            } else {
                setPasswordError('');
                setInvalidPasswordText('');
            }
        }
        if (name === 'cnfpassword') {
            setConfirmPassword(value);
            setConfirmPasswordError(value ? '' : 'Field cannot be blank');
        }
    };

    //Handle Clear
    let handleClear = () => {
        // setOldPassword("")
        // setPassword("")
        // setCnfPasswordShown("")
        document.getElementById("oldPassword").value = "";
        document.getElementById("password").value = "";
        document.getElementById("cnfpassword").value = "";
    };

    useEffect(() => {
        getdataByID(window.userId)
    }, [])
    return (
        <>
        <div className="wt-box cp">
            <div className='model-c'>
                <div className='leftm navv'>
                    <img src={changepassword} alt="" />
                </div>
                <div className='rightm navv'>
                    <h3>Change Password</h3>
                    <p>Enter a new password below to change your password.</p>
                    <label>Old Password</label>
                    <div className='txticon' style={{ position: 'relative' }}>
                        <input type={oldPasswordShown ? "text" : "password"} placeholder='Old Password' className="form-control form-control-sm" id='oldPassword' name='oldPassword' onChange={handleChange} />
                        {oldPasswordShown ? <span className="fa fa-eye-slash showChangePasswordicon" onClick={togglePasswordOld}></span> : <span className="fas fa-eye showChangePasswordicon" onClick={togglePasswordOld}></span>}
                        <span className="lockIcon"><i className='fa fa-lock'></i></span>
                    </div>
                    {oldPasswordError && <div className="error-message alertWarning">{oldPasswordError}</div>}

                    <label>New Password</label>
                    <div className='txticon'>
                        <input type={newPasswordShown ? "text" : "password"} placeholder='New Password' className="form-control form-control-sm" id='password' name='password' onChange={handleChange} />
                        {newPasswordShown ? <span className="fa fa-eye-slash showChangePasswordicon" onClick={togglePasswordNew}></span> : <span className="fas fa-eye showChangePasswordicon" onClick={togglePasswordNew}></span>}
                        <span className="lockIcon"><i className='fa fa-unlock-alt'></i></span>
                        {invalidPasswordText && (<div className="fw-light alertWarning">{invalidPasswordText}</div>)}
                    </div>
                    {passwordError && <div className="error-message alertWarning">{passwordError}</div>}

                    <label>Confirm Password</label>
                    <div className='txticon' style={{ position: 'relative' }}>
                        <input type={cnfPasswordShown ? "text" : "password"} className="form-control form-control-sm" placeholder='Confirm Password' id='cnfpassword' name='cnfpassword' onChange={(e) => { setConfirmPassword(e.target.value); setPasswordMatchError(''); }} />
                        {cnfPasswordShown ? <span className="fa fa-eye-slash showChangePasswordicon" onClick={togglePasswordCnf}></span> : <span className="fas fa-eye showChangePasswordicon" onClick={togglePasswordCnf}></span>}

                        <span className="lockIcon"><i className='fa fa-unlock-alt'></i></span>
                        {passwordMatchError && (<div className="fw-light alertWarning">{passwordMatchError}</div>)}
                    </div>
                    {confirmPasswordError && <div className="error-message alertWarning">{confirmPasswordError}</div>}

                    <div className='changepass'><button type='button' onClick={changePassword}>Save</button></div>
                </div>

                {showToster === 1 ? <SuccessToster message={message} handle={setShowToster} /> : ""}
                {showToster === 2 ? <WarningToaster message={message} handle={setShowToster} /> : ""}
                {showToster === 3 ? <AlertToster message={message} handle={setShowToster} /> : ""}
            </div>
        </div>
        </>
    )
}
