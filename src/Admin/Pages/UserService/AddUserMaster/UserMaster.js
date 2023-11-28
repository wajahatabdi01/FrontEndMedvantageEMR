import React from 'react'
import { useState } from 'react'
import UserIcon from "../../../../assets/images/icons/UserIcon.svg";
import IconPassword from "../../../../assets/images/icons/IconPassword.svg";
import IconMobile from "../../../../assets/images/icons/IconMobile.svg";
import IconUserType from "../../../../assets/images/icons/IconUserType.svg";
import IconUserId from "../../../../assets/images/icons/IconUserId.svg";
import IconRole from "../../../../assets/images/icons/IconRole.svg";
import IconEmail from "../../../../assets/images/icons/IconEmail.svg";
import IconShowOTP from "../../../../assets/images/icons/IconShowOTP.svg";
import IconDepartment from "../../../../assets/images/icons/IconDepartment.svg";
import GetDepartmentMaster from '../../../../SuperAdmin/Api/Master/DepartmentMaster/GetDepartmentMaster';
import GetRoleMaster from '../../../Api/Master/RoleMaster/GetRoleMaster';
import GetDesignationMaster from '../../../../SuperAdmin/Api/UtilityMaster/DesignationMaster/GetDesignationMaster';
import GetUserTypeMaster from '../../../../SuperAdmin/Api/Master/UserTypeMaster/GetUserTypeMaster';
import GetAddUser from '../../../Api/UserService/GetAddUser';
import { useEffect } from 'react';
import checkStrength from '../../../../Code/StrongPassword';
import AlertToster from '../../../../Component/AlertToster';
import ValidationAddUser from '../../../../Validation/Admin/UserService/ValidationAddUser';
import GetAllMenusAndDepartmentsByRoleId from '../../../Api/UserService/GetAllMenusAndDepartmentsByRoleId';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function UserMaster(props) {

  let [userMasterDeatils, setUserMasterDeatils] = useState({
    "clientID": 0,
    "name": "",
    "userName": "",
    "email": "",
    "mobileNo": "",
    // "password": "",
    "roleId": -1,
    "userId": -1,
    "userTypeId": -1,
    "userName": "",
    "designationId": -1,
    "departmentId": -1,
    "isOtpAuthentication": true,
    "deptHeadId": 0
  })
  let [passwordShown, setPasswordShown] = useState(0)
  let [userTypeList, setUserTypeList] = useState([])
  let [designationList, setDesignationList] = useState([])
  let [roleList, setRoleList] = useState([])
  let [departmentList, setDepartmentList] = useState([])

  const {t} = useTranslation();


  // let [showError, setShowError] = useState(0)
  // let [showErrorMsg, setShowErrorMsg] = useState("")

  let getdata = async () => {
    const clientID = JSON.parse(window.sessionStorage.getItem("LoginData")).clientId;
    let response = await GetAddUser(clientID);
    // let getHead = await GetHeadMaster();
    // let getMenu = await GetMenuMaster();
    let getDepartment = await GetDepartmentMaster();
    let getRole = await GetRoleMaster();
    let getDesignation = await GetDesignationMaster();
    let getUserType = await GetUserTypeMaster();
    if (response.status === 1) {
      // setUserList(response.responseValue);
      // setHeadList(getHead.responseValue);
      // setMenuList(getMenu.responseValue);
      setDepartmentList(getDepartment.responseValue);
      setRoleList(getRole.responseValue);
      setDesignationList(getDesignation.responseValue);
      setUserTypeList(getUserType.responseValue);
    }
  };

  let getDataByRole = async (id) => {
    let resp = await GetAllMenusAndDepartmentsByRoleId(id)
    if (resp.status === 1) {
      props.setEditData(resp.responseValue,1)
    }
  }

  let handleOnChange = (e) => {
    let name = e.target.name;
    let value = e.target.value
    // if (name === "password") {
    //   checkStrength(e.target.value)
    //   setUserMasterDeatils(userMasterDeatils => ({ ...userMasterDeatils, [name]: value }))

    //   props.setUserData(userMasterDeatils => ({ ...userMasterDeatils, [name]: value }))
    // }
    if (name === "isOtpAuthentication") {
      if (parseInt(value) === 1) {
        setUserMasterDeatils(userMasterDeatils => ({ ...userMasterDeatils, [name]: true }))

        props.setUserData(userMasterDeatils => ({ ...userMasterDeatils, [name]: true }))
      }
      else {
        setUserMasterDeatils(userMasterDeatils => ({ ...userMasterDeatils, [name]: false }))

        props.setUserData(userMasterDeatils => ({ ...userMasterDeatils, [name]: false }))
      }
    }

    else {
      if (name === "roleId") {
        getDataByRole(value)
      }
      setUserMasterDeatils(userMasterDeatils => ({ ...userMasterDeatils, [name]: value }))

      props.setUserData(userMasterDeatils => ({ ...userMasterDeatils, [name]: value }))
    }


  }
  
  // useEffect(() => {
  //   console.log("sxcbsbj")
  //   let respoonse = ValidationAddUser(userMasterDeatils.name, userMasterDeatils.email, userMasterDeatils.mobileNo, userMasterDeatils.empNo, userMasterDeatils.roleId, userMasterDeatils.designationId, userMasterDeatils.departmentId)
   
  //  console.log("res", respoonse)
  //   if (respoonse[0] === true) {

  //   }
  //   else {

  //     if (userMasterDeatils.tt > 1) {
  //       props.setStep(1)
  //       setShowError(1)
  //       setShowErrorMsg(respoonse[1])
  //       console.log("enter", props.step)
  //     }
  //     userMasterDeatils.tt = userMasterDeatils.tt + 1

  //   }

  // }, [props.step])


  useEffect(() => {
    getdata()
  }, [])

  


  useEffect(() => {

    document.getElementById("userName").value = props.editedUserData.userName ?? ""
    document.getElementById("name").value = props.editedUserData.name ?? ""
    document.getElementById("mobileNo").value = props.editedUserData.mobileNo ?? ""
    document.getElementById("otpMobileNo").value = props.editedUserData.otpMobileNo ?? ""
    document.getElementById("userTypeId").value = props.editedUserData.userTypeId ?? "0"
    document.getElementById("designationId").value = props.editedUserData.designationId ?? "0"
    document.getElementById("roleId").value = props.editedUserData.roleId ?? "0"
    document.getElementById("isOtpAuthentication").value = props.editedUserData.isOtpAuthentication === false ? "0" : props.editedUserData.isOtpAuthentication === true ? "1" : "-1"
    document.getElementById("departmentId").value = props.editedUserData.departmentId ?? "0"
    document.getElementById("email").value = props.editedUserData.email ?? ""
    // document.getElementById("empNo").value = props.editedUserData.empNo??""
    // document.getElementById("empNo").value = props.editedUserData.empNo??""
    // document.getElementById("empNo").value = props.editedUserData.empNo??""
    // document.getElementById("empNo").value = props.editedUserData.empNo??""
    props.setUserData(props.editedUserData)
  }, [props.editedUserData])
 
   document.body.dir = i18n.dir();


  return (
    <div className="col-12" id="t">
      {/* <Heading text="User Master" /> */}
      <div className="fieldsett-in">
        <div className="fieldsett">
          <span className="fieldse"> {t("User_Master")}</span>
          <div className="row mt-2 px-2">
            <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="mb-2">
                <img src={UserIcon} className="icnn" alt="" />
                <label htmlFor="empNo" className="form-label"> {" "} {t("Employee Number")}  {" "} <span className="starMandatory">*</span>{" "} </label>
                <input type="text" className="form-control form-control-sm" id="userName" name="userName" onChange={handleOnChange} placeholder= {t("Enter Employee Number")} />
                <small id="errEmpNo" className="form-text text-danger" style={{ display: "none" }} >Fill Employee Number</small>
              </div>
            </div>
            <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="mb-2">
                <img src={UserIcon} className="icnn" alt="" />
                <label htmlFor="name*" className="form-label"> {" "} {t("NAME")} <span className="starMandatory">*</span>{" "} </label>
                <input type="text" className="form-control form-control-sm" id="name" name="name" onChange={handleOnChange} placeholder= {t("Name")}/>
                <small id="errName" className="form-text text-danger" style={{ display: "none" }} >Fill Name</small>
              </div>
            </div>
            {/* <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="mb-2" style={{ position: 'relative' }}>
                <img src={IconPassword} className="icnn" alt="" />
                <label htmlFor="password*" className="form-label"> {" "} Password<span className="starMandatory">*</span>{" "} </label>
                <input id="inputPassword" type={passwordShown ? "text" : "password"} placeholder="Password" required="" name="password" onChange={handleOnChange} className="pass-input form-control" />
                {passwordShown ? <span className="fa fa-eye-slash showPasswordicon1" onClick={() => { setPasswordShown(passwordShown === 1 ? 0 : 1) }}></span> : <span className="fas fa-eye showPasswordicon1" onClick={() => { setPasswordShown(passwordShown === 1 ? 0 : 1) }}></span>}
                <input type="password" className="form-control form-control-sm" id="password" value={password} name="password" onChange={handleChange} placeholder="Enter password" />
                <small id="" className="form-text text-danger" style={{ display: "none" }} ></small>
                <div id="popover-password">
                  <p><span id="result"></span></p>
                  <div className="progress mb-2">
                    <div id="password-strength" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{ "width": "0%" }}>
                    </div>
                  </div>
                  <br />
                  <ul className="list-unstyled" style={{ display: "none_" }}>
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
                        &nbsp;Atleast 8 Character
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div> */}
            {/* <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
            <div className="mb-2">
              <img src={UserIcon} className="icnn" alt="" />
              <label htmlFor="userName*" className="form-label"> {" "} User Name<span className="starMandatory">*</span>{" "} </label>
              <input type="text" className="form-control form-control-sm" id="userName" name="userName" onChange={handleChange} placeholder="Enter user name" />
              <small id="" className="form-text text-danger" style={{ display: "none" }} ></small>
            </div>
          </div> */}

            {/* <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
            <div className="mb-2">
              <img src={UserIcon} className="icnn" alt="" />
              <label htmlFor="empID*" className="form-label"> {" "} Display Name<span className="starMandatory">*</span> </label>
              <input type="text" className="form-control form-control-sm" id="empID" name="empID" placeholder="Enter name" />
              <small id="" className="form-text text-danger" style={{ display: "none" }} ></small>
            </div>
          </div> */}
            <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="mb-2">
                <img src={IconMobile} className="icnn" alt="" />
                <label htmlFor="mobileNo*" className="form-label">{t("MOBILE_NUMBER")}<span className="starMandatory">*</span> </label>
                <input type="text" className="form-control form-control-sm" id="mobileNo" name="mobileNo" onChange={handleOnChange} placeholder= {t("Mobile_Number")} />
                <small id="" className="form-text text-danger" style={{ display: "none" }} ></small>
              </div>
            </div>
            <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="mb-2">
                <img src={IconMobile} className="icnn" alt="" />
                <label htmlFor="otpMobNo" className="form-label"> {t("OTP_Mobile_Number")}<span className="starMandatory">*</span> </label>
                <input type="text" className="form-control form-control-sm" id="otpMobileNo" name="otpMobileNo" onChange={handleOnChange} placeholder= {t("OTP_Mobile_Number")}/>
                <small id="" className="form-text text-danger" style={{ display: "none" }} ></small>
              </div>
            </div>
            <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="mb-2">
                <img src={IconUserType} className="icnn" alt="" />
                <label htmlFor="userType" className="form-label"> {t("User_Type")}<span className="starMandatory">*</span> </label>
                <select name='userTypeId' id="userTypeId" onChange={handleOnChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                  <option value="0">{t("Select_User")}</option>
                  {userTypeList && userTypeList.map((val, index) => {
                    return (
                      <option value={val.id}>{val.userType}</option>
                    )
                  })}
                </select>
                <small id="" className="form-text text-danger" style={{ display: "none" }} ></small>
              </div>
            </div>
            <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="mb-2">
                <img src={IconUserId} className="icnn" alt="" />
                <label htmlFor="designationId" className="form-label">{t("Designation_Name")}<span className="starMandatory">*</span> </label>
                <select name='designationId' id="designationId" onChange={handleOnChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                  <option value="-1">{t("All_Designation_List")}</option>
                  {designationList && designationList.map((val, index) => {
                    return (
                      <option value={val.id}>{val.designationName}</option>
                    )
                  })}
                </select>
                <small id="" className="form-text text-danger" style={{ display: "none" }} ></small>
              </div>
            </div>
            {/* <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
            <div className="mb-2">
              <img src={IconUserType} className="icnn" alt="" />
              <label htmlFor="empID*" className="form-label"> Active<span className="starMandatory">*</span> </label>
              <input type="text" className="form-control form-control-sm" id="empID" name="empID" onChange={handleChange} placeholder="Enter employee number" />
              <small id="" className="form-text text-danger" style={{ display: "none" }} ></small>
            </div>
          </div> */}
            <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="mb-2">
                <img src={IconRole} className="icnn" alt="" />
                <label htmlFor="roleId" className="form-label"> {t("Select_Role")}<span className="starMandatory">*</span> </label>
                <select name='roleId' id="roleId" onChange={handleOnChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                  <option value="-1">{t("Select_Role")}</option>
                  {roleList && roleList.map((val, index) => {
                    return (
                      <option value={val.id}>{val.roleTitle}</option>
                    )
                  })}
                </select>
                <small id="" className="form-text text-danger" style={{ display: "none" }} ></small>
              </div>
            </div>
            <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="mb-2">
                <img src={IconEmail} className="icnn" alt="" />
                <label htmlFor="email*" className="form-label">{t("EMAIL_ID")}<span className="starMandatory">*</span> </label>
                <input type="text" className="form-control form-control-sm" id="email" name="email" onChange={handleOnChange} placeholder= {t("ENTER_EMAIL_ID")}/>
                <small id="" className="form-text text-danger" style={{ display: "none" }} ></small>
              </div>
            </div>
            {/* <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
            <div className="mb-2">
              <img src={IconLogin} className="icnn" alt="" />
              <label htmlFor="empID*" className="form-label"> Login Status<span className="starMandatory">*</span> </label>
              <input type="text" className="form-control form-control-sm" id="empID" name="empID" onChange={handleChange} placeholder="Enter login status" />
              <small id="" className="form-text text-danger" style={{ display: "none" }} ></small>
            </div>
          </div> */}
            <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="mb-2">
                <img src={IconShowOTP} className="icnn" alt="" />
                <label htmlFor="isOtpAuthentication*" className="form-label"> {t("LOGIN OTP STATUS")}<span className="starMandatory">*</span> </label>
                <select name='isOtpAuthentication' id="isOtpAuthentication" onChange={handleOnChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                  <option value="-1"> {t("SELECT")}</option>
                  <option value={"1"}>{t("Yes")}</option>
                  <option value={"0"}>{t("No")}</option>
                </select>
                <small id="" className="form-text text-danger" style={{ display: "none" }}></small>
              </div>
            </div>
            <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
              <div className="mb-2">
                <img src={IconDepartment} className="icnn" alt="" />
                <label htmlFor="departmentId" className="form-label"> {t("Select_Department")} <span className="starMandatory">*</span> </label>
                <select name='departmentId' id="departmentId" onChange={handleOnChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                  <option value="0">{t("Select_Department")}</option>
                  {departmentList && departmentList.map((val, index) => {
                    return (
                      <option value={val.id}>{val.departmentName}</option>
                    )
                  })}
                </select>
                <small id="" className="form-text text-danger" style={{ display: "none" }} ></small>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {
        showError === 1 ? <AlertToster handle={setShowError} message={showErrorMsg} /> : ""
      } */}
    </div>
  )
}

