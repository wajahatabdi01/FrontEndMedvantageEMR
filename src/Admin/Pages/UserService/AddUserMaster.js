import React, { useEffect, useState } from "react";
import MultiStepForm from "./MultiStepForm";
import Heading from "../../../Component/Heading";
import BoxContainer from "../../../Component/BoxContainer";
import UserIcon from "../../../assets/images/icons/UserIcon.svg";
import IconPassword from "../../../assets/images/icons/IconPassword.svg";
import IconMobile from "../../../assets/images/icons/IconMobile.svg";
import IconUserType from "../../../assets/images/icons/IconUserType.svg";
import IconUserId from "../../../assets/images/icons/IconUserId.svg";
import IconRole from "../../../assets/images/icons/IconRole.svg";
import IconEmail from "../../../assets/images/icons/IconEmail.svg";
import IconLogin from "../../../assets/images/icons/IconLogin.svg";
import IconShowOTP from "../../../assets/images/icons/IconShowOTP.svg";
import IconDepartment from "../../../assets/images/icons/IconDepartment.svg";
import IconEdit from "../../../assets/images/icons/IconEdit.svg";
import IconDelete from "../../../assets/images/icons/IconDelete.svg";
import GetMenuMaster from "../../../SuperAdmin/Api/Master/MenuMaster/GetMenuMaster";
import GetAddUser from "../../Api/UserService/GetAddUser";
import GetHeadMaster from "../../Api/Master/HeadMaster/GetHeadMaster";
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

import savebtn from "../../../assets/images/icons/savebtn.svg";
import deletebtn from "../../../assets/images/icons/deletebtn.svg";
import editbtn1 from "../../../assets/images/icons/editbtn1.svg";
import GetDepartmentMaster from "../../../SuperAdmin/Api/Master/DepartmentMaster/GetDepartmentMaster";
import GetRoleMaster from "../../Api/Master/RoleMaster/GetRoleMaster";
import GetDesignationMaster from "../../../SuperAdmin/Api/UtilityMaster/DesignationMaster/GetDesignationMaster";
import PostAddUser from "../../Api/UserService/PostAddUser";
import Toster from '../../../Component/Toster'
import TosterUnderProcess from '../../../Component/TosterUnderProcess'
import ValidationAddUserMaster from "../../../Validation/Admin/UserService/ValidationAddUserMaster";
import Search, { SearchIndex } from "../../../Code/Serach";
import GetUserTypeMaster from "../../../SuperAdmin/Api/Master/UserTypeMaster/GetUserTypeMaster";
import DeleteAddUser from "../../Api/UserService/DeleteAddUser";
import checkStrength from "../../../Code/StrongPassword";

function AddUserMaster() {

  let [updateBool, setUpdateBool] = useState(0)
  // let [sendForm, setSendForm] = useState({ "userId": window.userId, "clientID": 13})
  let [sendForm, setSendForm] = useState({ "userId": window.userId, "clientID": window.clientId })
  let [isOpen, setIsOpen] = useState(false);
  let [userList, setUserList] = useState([]);
  let [headList, setHeadList] = useState();
  let [menuList, setMenuList] = useState();
  let [roleList, setRoleList] = useState();
  let [userTypeList, setUserTypeList] = useState();
  let [designationList, setDesignationList] = useState();
  let [departmentList, setDepartmentList] = useState();
  const { t } = useTranslation();
  document.body.dir = i18n.dir();

  let [showUnderProcess, setShowUnderProcess] = useState(0)
  let [showToster, setShowToster] = useState(0)
  let [tosterMessage, setTosterMessage] = useState("")
  let [tosterValue, setTosterValue] = useState(0);
  let [empNo, setEmpNo] = useState('');
  let [name, setName] = useState('');
  let [password, setPassword] = useState('');
  let [mobileNo, setMobileNo] = useState('');
  let [otpMobNo, setOtpMobNo] = useState('');
  let [email, setEmail] = useState('');
  let [userType, setUserType] = useState('');
  let [designation, setDesignation] = useState('');
  let [role, setRole] = useState('');
  let [loginOtpStatus, setLoginOtpStatus] = useState('');
  let [departemnt, setDepartemnt] = useState('');
  let [assignHeadArr, setAssignHeadArr] = useState([]);
  let [isCheckedAssignHeadSlctAll, setIsCheckedAssignHeadSlctAll] = useState(false);
  let [assignDepartmentArr, setAssignDepartmentArr] = useState([]);
  let [isCheckedAssignDeptSlctAll, setIsCheckedAssignDeptSlctAll] = useState(false);
  let [assignMenuArr, setAssignMenuArr] = useState([]);
  let [checkedParentMenuArr, setCheckedParentMenuArr] = useState([]);
  let [rowId, setRowId] = useState('')

  let [passwordShown, setPasswordShown] = useState(false);

  const [step, setStep] = useState(1);
  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };
  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };


  const [checkMenu, setCheckMenu] = useState([]);
  let [sendHeadList, setSendHeadList] = useState([]);
  let [sendDepartmentList, setSendDepartmentList] = useState([]);

  // const [formData, setFormData] = useState({ name: "", username: "", email: "" });
  const [formData, setFormData] = useState();

  let togglePassword = () => {

    setPasswordShown(!passwordShown);

  };

  // get data from api
  let getdata = async () => {
    const clientID = JSON.parse(window.sessionStorage.getItem("LoginData")).clientId;
    let response = await GetAddUser(clientID);
    let getHead = await GetHeadMaster();
    let getMenu = await GetMenuMaster();
    let getDepartment = await GetDepartmentMaster();
    let getRole = await GetRoleMaster();
    let getDesignation = await GetDesignationMaster();
    let getUserType = await GetUserTypeMaster();
    if (response.status === 1) {
      setUserList(response.responseValue);
      setHeadList(getHead.responseValue);
      setMenuList(getMenu.responseValue);
      setDepartmentList(getDepartment.responseValue);
      setRoleList(getRole.responseValue);
      setDesignationList(getDesignation.responseValue);
      setUserTypeList(getUserType.responseValue);
    }
  };

  //Handle Change
  let handleChange = (e) => {
    if (e.target.name === 'empNo') {
      setEmpNo(e.target.value);
    }
    if (e.target.name === 'name') {
      setName(e.target.value);
    }
    if (e.target.name === 'password') {
      setPassword(e.target.value);
      checkStrength(e.target.value)
    }
    if (e.target.name === 'mobileNo') {
      setMobileNo(e.target.value);
    }
    if (e.target.name === 'otpMobNo') {
      setOtpMobNo(e.target.value);
    }
    if (e.target.name === 'email') {
      setEmail(e.target.value);
    }
    if (e.target.name === 'userType') {
      setUserType(e.target.value);
    }
    if (e.target.name === 'designation') {
      setDesignation(e.target.value);
    }
    if (e.target.name === 'role') {
      setRole(e.target.value);
    }
    if (e.target.name === 'loginOtpStatus') {
      setLoginOtpStatus(e.target.value);
    }
    if (e.target.name === 'departemnt') {
      setDepartemnt(e.target.value);
    }
    return;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    let name = e.target.name;
    let value = e.target.value;
    setSendForm((sendForm) => ({
      ...sendForm,
      [name]: value,
    }));
  };

  //Handle Clear
  let handleClear = () => {
    setCheckedParentMenuArr([]);
    setSendForm([])
    setSendForm({ "userId": window.userId, "clientID": 13 })
    document.getElementById("name").value = "";
    document.getElementById("userName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("mobileNo").value = "";
    setUpdateBool(0)
  }


  // ------------------Start Tree view Function------------------------ add click

  const handleToggle = (e) => {
    console.log('e', e.target);
    const { name } = e.target;
    let status = checkMenu.some((item) => item.itemName === name);
    if (!status) {
      checkMenu.push({ itemName: name });
      setCheckMenu([...checkMenu]);
    } else {
      let newCheckMenu = checkMenu.filter((item) => item.itemName !== name);
      setCheckMenu(newCheckMenu);
    }
  };

  // ------------------End Tree view Function------------------------

  useEffect(() => {
    getdata();
  }, []);

  //Used To Get Assign Head Checkboxes clear 
  let handleAssignHead = (key) => {
    console.log('key', key);
    if (assignHeadArr.length === 0) {
      assignHeadArr.push({
        id: key
      });
    }
    else {
      var index = assignHeadArr.findIndex((arr) => arr.id === key);
      console.log('index', index);
      if (index !== -1) {
        document.getElementById("selectAllHead").checked = false;
        setIsCheckedAssignHeadSlctAll(false);
        assignHeadArr.splice(index, 1)
      }
      else {
        assignHeadArr.push({
          id: key
        });
      }
    }
    console.log('assignHeadArr', assignHeadArr)

  }
  // Used To Select All Assign Head  clear
  let handleSelectAllHead = () => {
    if (document.getElementById("selectAllHead").checked === true) {
      setIsCheckedAssignHeadSlctAll(true)
      for (var i = 0; i < headList.length; i++) {
        document.getElementById(headList[i].id + "assignHeadCB").checked = true;
        var index = assignHeadArr.findIndex((arr) => arr.id === headList[i].id);
        if (index === -1) {
          assignHeadArr.push({
            id: headList[i].id
          })
        }
      }
      console.log('assignHeadArr', assignHeadArr)
    }
    else {
      for (var j = 0; j < headList.length; j++) {
        document.getElementById(headList[j].id + "assignHeadCB").checked = false;
      }
      setIsCheckedAssignHeadSlctAll(false);
      setAssignHeadArr([]);
    }
  }
  //Used To Get Assign Department Checkboxes
  let handleAssignDepartment = (key) => {
    console.log('key', key);
    if (assignDepartmentArr.length === 0) {
      assignDepartmentArr.push({
        id: key
      });
    }
    else {
      var index = assignDepartmentArr.findIndex((arr) => arr.id === key);
      console.log('index', index);
      if (index !== -1) {
        assignDepartmentArr.splice(index, 1)
      }
      else {
        assignDepartmentArr.push({
          id: key
        });
      }
    }
    console.log('assignDepartmentArr', assignDepartmentArr)

  }
  // Used To Select All Assign Department
  let handleSelectAllDepartment = () => {
    if (document.getElementById("selectAllDepartment").checked === true) {
      setIsCheckedAssignDeptSlctAll(true)
      for (var i = 0; i < departmentList.length; i++) {
        document.getElementById(departmentList[i].id + "assignDepartmentCB").checked = true;
        var index = assignDepartmentArr.findIndex((arr) => arr.id === departmentList[i].id);
        if (index === -1) {
          assignDepartmentArr.push({
            id: departmentList[i].id
          })
        }
      }
      console.log('assignDepartmentArr', assignDepartmentArr)
    }
    else {
      for (var j = 0; j < departmentList.length; j++) {
        document.getElementById(departmentList[j].id + "assignDepartmentCB").checked = false;
      }
      setIsCheckedAssignDeptSlctAll(false);
      setAssignDepartmentArr([]);
    }
  }
  // //Used To Get Assign Menu Checkboxes
  let hadleAssignMenu = (key, parentKey) => {
    console.log('key', key)

    if (assignMenuArr.length === 0) {
      assignMenuArr.push({
        id: key
      })
    }
    else {
      var index = assignMenuArr.findIndex((arr) => arr.id === key);
      if (index !== -1) {
        document.getElementById(parentKey + "checkParentMenu").checked = false;
        var pmIndex = checkedParentMenuArr.findIndex((ar) => ar.id === parentKey);
        if (pmIndex !== -1) {
          checkedParentMenuArr.splice(pmIndex, 1);
        }
        assignMenuArr.splice(index, 1)
      }
      else {
        assignMenuArr.push({
          id: key
        });
      }
    }
    console.log('assignMenuArr', assignMenuArr)

  }
  //Used TO Check All Sub menus of parent menu
  let handleCheckAll = (key) => {
    console.log('key', key);
    console.log('menuList', menuList);
    setAssignMenuArr([]);
    let temp = [...assignMenuArr];
    const parentMenu = document.getElementById(key + "checkParentMenu").checked;
    if (parentMenu === true) {
      checkedParentMenuArr.push({
        id: key
      })
      for (var i = 0; i < menuList.length; i++) {
        if (menuList[i].id === key) {
          for (var j = 0; j < menuList[i].parent.length; j++) {
            var index = temp.findIndex((arr) => arr.id === menuList[i].parent[j].id);
            if (index === -1) {
              document.getElementById(menuList[i].parent[j].id + "assignMenuCB").checked = true;
              temp.push({
                id: menuList[i].parent[j].id
              });
            }
          }
          setAssignMenuArr(temp);
          console.log('temp', temp);
          console.log(' check parent menu', checkedParentMenuArr)

        }
      }
    }
    else {
      var getIndex = checkedParentMenuArr.findIndex((data) => data.id === key);
      if (getIndex !== -1) {
        checkedParentMenuArr.splice(getIndex, 1);
      }
      for (var k = 0; k < menuList.length; k++) {
        if (menuList[k].id === key) {
          for (var l = 0; l < menuList[k].parent.length; l++) {
            var findIndex = temp.findIndex((arrNew) => arrNew.id === menuList[k].parent[l].id);
            console.log('findIndex', findIndex)
            if (findIndex !== -1) {
              document.getElementById(menuList[k].parent[l].id + "assignMenuCB").checked = false;
              temp.splice(findIndex, 1);
            }
          }
          setAssignMenuArr(temp);
          console.log('temp uncheck', temp)
          console.log(' uncheck parent menu', checkedParentMenuArr)

        }
      }
    }


  }

  //Used To Save Data
  let handleSave = async () => {
    var colHead = "";
    var colDept = "";
    var colMenu = "";
    console.log('assignHeadArr', assignHeadArr)
    console.log('assignDepartmentArr', assignDepartmentArr)
    console.log('sendFassignMenuArrorm', assignMenuArr);
    for (var i = 0; i < assignHeadArr.length; i++) {
      colHead = colHead === '' ? + assignHeadArr[i].id : colHead + ',' + assignHeadArr[i].id;
    }
    for (var j = 0; j < assignDepartmentArr.length; j++) {
      colDept = colDept === '' ? + assignDepartmentArr[j].id : colDept + ',' + assignDepartmentArr[j].id;

    }
    for (var k = 0; k < assignMenuArr.length; k++) {
      // colMenu = colMenu + assignMenuArr[k].id+','
      colMenu = colMenu === '' ? + assignMenuArr[k].id : colMenu + ',' + assignMenuArr[k].id;
    }
    console.log('colHead', colHead)
    console.log('colDept', colDept)
    console.log('colMenu', colMenu)
    var selectedHead = JSON.parse('[' + colHead.replace(/,\s*,/, ',0,') + ']');
    var selectedDept = JSON.parse('[' + colDept.replace(/,\s*,/, ',0,') + ']');
    var selectedMenu = JSON.parse('[' + colMenu.replace(/,\s*,/, ',0,') + ']');
    console.log('selectedHead', selectedHead);
    console.log('selectedHead', selectedDept);
    console.log('selectedHead', selectedMenu);
    //  const userType = document.getElementById('userTypeId').value;
    //  const designation = document.getElementById('designationId').value;
    //  const role = document.getElementById('roleId').value;
    //  const otpAuth = document.getElementById('isOtpAuthentication').value;
    //  const department = document.getElementById('departmentId').value;
    //   if(empNo.trim() ===''|| empNo === "" || empNo === null || empNo === undefined){
    //     document.getElementById("errEmpNo").style.display="block";
    //   }
    //   else if(name.trim() ===''|| name === "" || name === null || name === undefined){
    //         document.getElementById("errName").style.display="block";
    //  }
    //  else{

    var obj = {
      clientID: JSON.parse(window.sessionStorage.getItem("LoginData")).clientId,
      titleID: 1,
      name: name,
      userName: empNo,
      email: email,
      mobileNo: mobileNo,
      password: password,
      roleId: role,
      userId: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
      userTypeId: userType,
      empNo: 0,
      designationId: designation,
      departmentId: departemnt,
      isOtpAuthentication: loginOtpStatus === "1" ? true : false,
      deptHeadId: 0,
      headId: selectedHead,
      menuIdList: selectedMenu,
      departmentIds: selectedDept,
    }
    console.log('obj', obj);
    return
    if (checkStrength(password) === true) {
      var obj = {
        clientID: JSON.parse(window.sessionStorage.getItem("LoginData")).clientId,
        titleID: 1,
        name: name,
        userName: empNo,
        email: email,
        mobileNo: mobileNo,
        password: password,
        roleId: role,
        userId: JSON.parse(window.sessionStorage.getItem("LoginData")).userId,
        userTypeId: userType,
        empNo: 0,
        designationId: designation,
        departmentId: departemnt,
        isOtpAuthentication: loginOtpStatus === "1" ? true : false,
        deptHeadId: 0,
        headId: selectedHead,
        menuIdList: selectedMenu,
        departmentIds: selectedDept,
      }
      var response = await PostAddUser(obj);
      console.log('response', response);
      if (response.status === 1) {
        setShowUnderProcess(0)
        setShowToster(1)
        setTosterMessage("Data Saved SuccessFully!")
        setTosterValue(0)
        setTimeout(() => {
          setShowToster(0)
        }, 2000)

        setUpdateBool(0)
        getdata()
        handleClear();
      }
      else {
        setShowUnderProcess(0)
        setShowToster(1)
        setTosterMessage(response.responseValue)
        setTosterValue(1)
        setTimeout(() => {
          setShowToster(0)
        }, 2000)
      }
    }
    else {
      setTosterMessage("Please enter strong password");
    }
  }

  //Handle Delete
  let handleDeleteRow = async () => {
    // setLoder(1)
    setShowUnderProcess(1);
    let obj = {
      id: rowId
    }
    let response = await DeleteAddUser(obj)
    if (response.status === 1) {
      setShowUnderProcess(0)
      setShowToster(1)
      setTosterMessage("Data Deleted SuccessFully!")
      setTosterValue(0)
      setTimeout(() => {
        setShowToster(0)
      }, 2000)
      getdata()
    }
    else {
      setShowUnderProcess(0)
      setShowToster(1)
      setTosterMessage(response.responseValue)
      setTosterValue(1)
      setTimeout(() => {
        setShowToster(0)
      }, 2000)
    }
  }
  return (
    <>
      <section className="main-content mt-5 pt-3">
        <div className="container-fluid">
          {/* <MultiStepForm /> */}
          <div className="App">
            {step === 1 ?
              <div>
                {/* ---------------------------------------------User Details Section------------------------------------------------------- */}
                {/* <h2>Step 1: Name</h2> */}
                <div className="col-12">
                  {/* <Heading text="User Master" /> */}
                  <div className="fieldsett-in">
                    <div className="fieldsett">
                      <span className="fieldse">{t("User_Master")}</span>
                      <div className="row mt-2 px-2">
                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
                          <div className="mb-2">
                            <img src={UserIcon} className="icnn" alt="" />
                            <label htmlFor="empNo" className="form-label"> {" "}  {t("Employee Number")} {" "} <span className="starMandatory">*</span>{" "} </label>
                            <input type="text" className="form-control form-control-sm" id="empNo" name="empNo" value={empNo} onChange={handleChange} placeholder="Enter employee number" />
                            <small id="errEmpNo" className="form-text text-danger" style={{ display: "none" }} >{t("Fill_Employee_Number")}</small>
                          </div>
                        </div>
                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
                          <div className="mb-2">
                            <img src={UserIcon} className="icnn" alt="" />
                            <label htmlFor="name*" className="form-label"> {" "}{t("NAME")}<span className="starMandatory">*</span>{" "} </label>
                            <input type="text" className="form-control form-control-sm" id="name" name="name" value={name} onChange={handleChange} placeholder="Enter name" />
                            <small id="errName" className="form-text text-danger" style={{ display: "none" }} >{t("Fill_Name")}</small>
                          </div>
                        </div>
                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
                          <div className="mb-2" style={{ position: 'relative' }}>
                            <img src={IconPassword} className="icnn" alt="" />
                            <label htmlFor="password*" className="form-label"> {" "} {t("Password")} <span className="starMandatory">*</span>{" "} </label>
                            <input id="inputPassword" type={passwordShown ? "text" : "password"} placeholder={t("Password")} required="" name="password" onChange={handleChange} className="pass-input form-control" />
                            {passwordShown ? <span className="fa fa-eye-slash showPasswordicon1" onClick={togglePassword}></span> : <span className="fas fa-eye showPasswordicon1" onClick={togglePassword}></span>}
                            {/* <input type="password" className="form-control form-control-sm" id="password" value={password} name="password" onChange={handleChange} placeholder="Enter password" /> */}
                            <small id="" className="form-text text-danger" style={{ display: "none" }} ></small>
                            <div id="popover-password">
                              <p><span id="result"></span></p>
                              <div className="progress mb-2">
                                <div id="password-strength" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style={{ "width": "0%" }}>
                                </div>
                              </div>
                              {/* <br /> */}
                              <ul className="list-unstyled" style={{ display: "none1" }}>
                                <li className="">
                                  <span className="low-upper-case">
                                    <i className="fas fa-circle" aria-hidden="true"></i>
                                    &nbsp;{t("Lowercase")} &amp; {t("Uppercase")}
                                  </span>
                                </li>
                                <li className="">
                                  <span className="one-number">
                                    <i className="fas fa-circle" aria-hidden="true"></i>
                                    &nbsp;{t("Number_0-9")}
                                  </span>
                                </li>
                                <li className="">
                                  <span className="one-special-char">
                                    <i className="fas fa-circle" aria-hidden="true"></i>
                                    &nbsp;{t("Special_Character")}
                                  </span>
                                </li>
                                <li className="">
                                  <span className="eight-character">
                                    <i className="fas fa-circle" aria-hidden="true"></i>
                                    &nbsp;{t("Atleast_6_Character")}
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
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
                            <input type="text" className="form-control form-control-sm" id="mobileNo" name="mobileNo" value={mobileNo} onChange={handleChange} placeholder={t("Mobile_Number")} />
                            <small id="" className="form-text text-danger" style={{ display: "none" }} ></small>
                          </div>
                        </div>
                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
                          <div className="mb-2">
                            <img src={IconMobile} className="icnn" alt="" />
                            <label htmlFor="otpMobNo" className="form-label"> {t("OTP_Mobile_Number")} <span className="starMandatory">*</span> </label>
                            <input type="text" className="form-control form-control-sm" id="otpMobNo" name="otpMobNo" value={otpMobNo} onChange={handleChange} placeholder={t("OTP_Mobile_Number")} />
                            <small id="" className="form-text text-danger" style={{ display: "none" }} ></small>
                          </div>
                        </div>
                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
                          <div className="mb-2">
                            <img src={IconUserType} className="icnn" alt="" />
                            <label htmlFor="userType" className="form-label">{t("USER TYPE")}<span className="starMandatory">*</span> </label>
                            <select name='userType' id="userTypeId" onChange={handleChange} value={userType} className="form-select form-select-sm" aria-label=".form-select-sm example">
                              <option value="0">Select</option>
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
                            <label htmlFor="designationId" className="form-label"> {t("Designation_Name")}<span className="starMandatory">*</span> </label>
                            <select name='designation' id="designationId" onChange={handleChange} value={designation} className="form-select form-select-sm" aria-label=".form-select-sm example">
                              <option value="0">Select</option>
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
                            <label htmlFor="roleId" className="form-label">{t("Role")}<span className="starMandatory">*</span> </label>
                            <select name='role' id="roleId" onChange={handleChange} value={role} className="form-select form-select-sm" aria-label=".form-select-sm example">
                              <option value="0">{t("SELECT")}</option>
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
                            <input type="text" className="form-control form-control-sm" id="email" name="email" value={email} onChange={handleChange} placeholder={t("ENTER_EMAIL_ID")} />
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
                            <label htmlFor="isOtpAuthentication*" className="form-label">{t("LOGIN OTP STATUS")}<span className="starMandatory">*</span> </label>
                            <select name='loginOtpStatus' id="isOtpAuthentication" onChange={handleChange} value={loginOtpStatus} className="form-select form-select-sm" aria-label=".form-select-sm example">
                              <option value="-1">{t("SELECT")}</option>
                              <option value="1">{t("Yes")}</option>
                              <option value="0">{t("No")}</option>
                            </select>
                            <small id="" className="form-text text-danger" style={{ display: "none" }}></small>
                          </div>
                        </div>
                        <div className="col-xxl-2 col-xl-3 col-lg-4 col-md-6 col-sm-12">
                          <div className="mb-2">
                            <img src={IconDepartment} className="icnn" alt="" />
                            <label htmlFor="departmentId" className="form-label"> {t("Department")}<span className="starMandatory">*</span> </label>
                            <select name='departemnt' id="departmentId" onChange={handleChange} value={departemnt} className="form-select form-select-sm" aria-label=".form-select-sm example">
                              <option value="0">{t("SELECT")}</option>
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
                </div>
              </div>
              : ''}

            {step === 2 ?
              <div>
                {/* <h2>Step 2:</h2> */}
                {/* ---------------------------------------------Assign Head Section------------------------------------------------------- */}
                <div className="col-12">
                  <div className="fieldsett-in">
                    <div className="fieldsett">
                      <span className="fieldse">{t("Assign Head")}</span>
                      <div className="row mt-2 px-2">
                        <div className="col-sm-10">
                          <ul className="headList">
                            <li className="Headlist-in regularCheck d-flex gap-1">
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="selectAllHead" onChange={handleSelectAllHead} defaultChecked={isCheckedAssignHeadSlctAll === true ? true : false} />
                              </div>
                              <label htmlFor="All">{t("Select All")}</label>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="row mt-2 px-2">
                        <div className="col-sm-12">
                          <ul className="headList">
                            {headList && headList.map((val, index) => {
                              console.log("header value", assignHeadArr)
                              return (

                                <>
                                  <li className="Headlist-in regularCheck d-flex gap-1">
                                    <div className="form-check">
                                      <input className="form-check-input" type="checkbox" id={val.id + 'assignHeadCB'} defaultChecked={SearchIndex(assignHeadArr, "id", val.id) !== "" ? true : false} name="headId" onClick={() => { handleAssignHead(val.id); }} />
                                    </div>
                                    <label htmlFor={val.id}>{val.headName}</label>
                                  </li>

                                </>
                              )
                            })}


                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              : ''}

            {step === 3 ?
              <div>
                {/* <h2>Step 3:</h2> */}
                {/* ---------------------------------------------Assign Department Section------------------------------------------------------- */}

                <div className="col-12">
                  <div className="fieldsett-in">
                    <div className="fieldsett">
                      <span className="fieldse">{t("Assign Department")}</span>
                      <div className="row mt-2 px-2">
                        <div className="col-sm-10">
                          <ul className="headList">
                            <li className="Headlist-in regularCheck d-flex gap-1">
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="selectAllDepartment" onChange={handleSelectAllDepartment} defaultChecked={isCheckedAssignDeptSlctAll === true ? true : false} />
                              </div>
                              <label htmlFor="All">{t("Select All")}</label>
                            </li>
                          </ul>
                        </div>
                        <div className="col-sm-2" style={{ float: "right" }}>
                          <div className="mb-2 me-2">
                            <select name='headId' id="headId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                              <option value="0">{t("SELECT")}</option>
                              {headList && headList.map((val, index) => {
                                return (
                                  <option value={val.id}>{val.headName}</option>
                                )
                              })}
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-2 px-2"  >
                        <div className="col-sm-12">
                          <ul className="headList">
                            {departmentList && departmentList.map((val, index) => {
                              return (
                                <>
                                  <li className="Headlist-in regularCheck d-flex gap-1">
                                    <div className="form-check">
                                      <input className="form-check-input" type="checkbox" id={val.id + 'assignDepartmentCB'} defaultChecked={SearchIndex(assignDepartmentArr, "id", val.id) !== "" ? true : false} name="departmentId" onClick={() => { handleAssignDepartment(val.id); }} />
                                    </div>
                                    <label htmlFor={val.id}>{val.departmentName}</label>
                                  </li>
                                </>
                              );
                            })}


                          </ul>

                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              : ''}

            {step === 4 ?
              <div>
                {/* <h2>Step 4:</h2> */}
                {/* ---------------------------------------------Assign Menu Section------------------------------------------------------- */}

                <div className="col-12">
                  <div className="fieldsett-in">
                    <div className="fieldsett">
                      <span className="fieldse">{t("Assign Menu")}</span>
                      {/* <div className="row mt-2 px-2">
                        <div className="col-sm-10">
                          <ul className="headList ps-4">
                            <li className="Headlist-in regularCheck d-flex gap-1">
                              <div className="form-check">
                                <input className="form-check-input" type="checkbox" id="All" name="863" value="true" />
                              </div>
                              <label htmlFor="All">Select All</label>
                            </li>
                          </ul>
                        </div>
                      </div> */}
                      {/* <div className="col-sm-2" style={{ float: "right" }}>
                          <div className="mb-2 me-2">
                            <select name='headId' id="headId" onChange={handleChange} className="form-select form-select-sm" aria-label=".form-select-sm example">
                              <option value="0">Select</option>
                              {headList && headList.map((val, index) => {
                                return (
                                  <option value={val.id}>{val.headName}</option>
                                )
                              })}
                            </select>
                          </div>
                        </div> */}
                      <div className="row mt-3" style={{ paddingLeft: '29px' }}>
                        <div className="col-sm-12">
                          <ul id="myUL" className="userIdMasterUl headList">
                            {menuList && menuList.map((val, index) => {
                              return (
                                <li className="multi">
                                  {/* <div className="orangechk">
                                    <label htmlFor={val.id}>
                                      <span className="caret"></span>{" "}
                                    </label>
                                    <input type="checkbox" id={val.id} value="id" onClick={handleToggle} name={"a" + val.id} />{" "}
                                    <label htmlFor={val.id}>{val.menuName}</label>
                                  </div> */}
                                  <div className="orangechk">
                                    <label htmlFor={val.id} >
                                      <span className="caret" >
                                        <input type="checkbox" id={val.id} value="id" onClick={handleToggle} name={"a" + val.id} style={{ display: 'none' }} />{" "}
                                      </span>{" "}
                                    </label>
                                    <input type="checkbox" value="parentMenu" id={val.id + "checkParentMenu"} defaultChecked={SearchIndex(checkedParentMenuArr, "id", val.id) !== "" ? true : false} onClick={() => { handleCheckAll(val.id) }} name={"a" + val.id} />{" "}
                                    <label>{val.headName}</label>
                                  </div>

                                  {val.menuList.map((list, index) => {
                                    return (
                                      <div className="graycheckbox">
                                        <ul className={`nested ${checkMenu.some((item) => item.itemName === "a" + val.id) ? "active" : ""}`}>
                                          <li className="crudP">
                                            <input type="checkbox" name="menuName" value="menuName" id={list.id + 'assignMenuCB'} defaultChecked={SearchIndex(assignMenuArr, "id", list.id) !== "" ? true : false} onClick={() => { hadleAssignMenu(list.id, val.id); }} />{" "}
                                            <label htmlFor={list.id}>{list.menuName}</label>
                                          </li>
                                          <li className="crud">
                                            <input type="checkbox" id="Save" value="Save" />{" "}
                                            <label for="Save"> {" "} <img src={savebtn} className="icnnchk" alt="" />{" "} {t("Save")} </label>
                                          </li>
                                          <li className="crud">
                                            <input type="checkbox" id="Edit" value="Edit" />{" "}
                                            <label for="Edit"> <img src={editbtn1} className="icnnchk" alt="" />{" "} {t("Edit")} </label>
                                          </li>
                                          <li className="crud">
                                            <input type="checkbox" id="Delete" value="Delete" />{" "}
                                            <label for="Delete"> <img src={deletebtn} className="icnnchk" alt="" /> {t("Delete")} </label>
                                          </li>
                                        </ul>
                                      </div>
                                    )
                                  })}
                                  {/* {val.parent.map((list, index) => {
                                    return (
                                      <div className="graycheckbox">
                                        <ul className={`nested ${checkMenu.some((item) => item.itemName === "a" + val.id) ? "active" : ""}`} >
                                          <li className="crudP">
                                            <input type="checkbox" id={list.menuName} name="menuName" value="menuName" />{" "}
                                            <label htmlFor={list.id}>{list.menuName}</label>
                                          </li>
                                          <li className="crud">
                                            <input type="checkbox" id="Save" value="Save" />{" "}
                                            <label for="Save"> {" "} <img src={savebtn} className="icnnchk" alt="" />{" "} Save </label>
                                          </li>
                                          <li className="crud">
                                            <input type="checkbox" id="Edit" value="Edit" />{" "}
                                            <label for="Edit"> <img src={editbtn1} className="icnnchk" alt="" />{" "} Edit </label>
                                          </li>
                                          <li className="crud">
                                            <input type="checkbox" id="Delete" value="Delete" />{" "}
                                            <label for="Delete"> <img src={deletebtn} className="icnnchk" alt="" /> Delete </label>
                                          </li>
                                        </ul>
                                      </div>
                                    )
                                  })} */}
                                </li>
                              );
                            })}






                            {/* <li className="multi">
                                <div className="orangechk">
                                  <label for="BedCensus2"> <span className="caret"></span>{" "} </label>
                                  <input type="checkbox" id="BedCensus2" value="BedCensus2" onChange={handleToggle} name="b" />{" "}
                                  <label for="BedCensus">Bed Census2</label>
                                </div>
                                <div className="graycheckbox">
                                  <ul className={`nested ${checkMenu.some((item) => item.itemName === "b") ? "active" : ""}`} >
                                    <li className="crudP">
                                      <input type="checkbox" id="BioChemistry" value="BioChemistry" />{" "}
                                      <label for="BioChemistry"> Bio Chemistry2</label>
                                    </li>
                                    <li className="crud">
                                      <input type="checkbox" id="Save" value="Save" />{" "}
                                      <label for="Save"> {" "} <img src={savebtn} className="icnnchk" alt="" />{" "}  Save </label>
                                    </li>
                                    <li className="crud">
                                      <input type="checkbox" id="Edit" value="Edit" />{" "}
                                      <label for="Edit"> <img src={editbtn1} className="icnnchk" alt="" />{" "} Edit </label>
                                    </li>
                                    <li className="crud">
                                      <input type="checkbox" id="Delete" value="Delete" />{" "}
                                      <label for="Delete"> <img src={deletebtn} className="icnnchk" alt="" />  Delete </label>
                                    </li>

                                    <li className="crudP">
                                      <input type="checkbox" id="BioChemistry2" value="BioChemistry2" />{" "}
                                      <label for="BioChemistry"> Bio Chemistry 2 </label>
                                    </li>
                                    <li className="crud">
                                      <input type="checkbox" id="Save" value="Save" />{" "}
                                      <label for="Save"> <img src={savebtn} className="icnnchk" alt="" /> Save </label>
                                    </li>
                                    <li className="crud">
                                      <input type="checkbox" id="Edit" value="Edit" />{" "}
                                      <label for="Edit">
                                        <img src={editbtn1} className="icnnchk" alt="" /> Edit </label>
                                    </li>
                                    <li className="crud">
                                      <input type="checkbox" id="Delete" value="Delete" />{" "}
                                      <label for="Delete"> <img src={deletebtn} className="icnnchk" alt="" /> Delete </label>
                                    </li>
                                  </ul>
                                </div>
                              </li> */}


                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              : ''}
            {/* ---------------------------------------------Button Section------------------------------------------------------- */}
            <div className="mb-2 relative">
              {showUnderProcess === 1 ? <TosterUnderProcess /> :
                <>
                  {showToster === 1 ?
                    <div className="d-flex justify-content-end">
                      <Toster value={tosterValue} message={tosterMessage} />
                    </div>
                    :
                    <div>
                      <div className="rt-btns">
                        {/* <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={saveForm}><i className="far fa-save me-1"></i>Save </button> */}
                        {step > 1 && (
                          <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handlePrevious} > <i className="fas fa-angle-double-left me-1"></i>  {t("PREVIOUS")}</button>
                        )}
                        {step < 4 && (
                          <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleNext} ><i className="fas fa-angle-double-right me-1"></i> {t("NEXT")}  </button>
                        )}

                        {step >= 4 && (
                          <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" onClick={handleSave}><i className="far fa-save me-1" ></i>{t("Save")}</button>
                        )}


                      </div>
                    </div>
                  }
                </>
              }
            </div>
          </div>

          {/* --------------------Table Section----------------------- */}
          <div className="row">
            <div className="col-12 mt-2">
              <div className="med-table-section" style={{ height: "581px" }}>
                <table className="med-table border_ striped">
                  <thead>
                    <tr>
                      <th className="" style={{ width: "5%" }}>
                        {t("S.No.")}
                      </th>
                      <th>{t("USER ID")}</th>
                      <th>{t("USER INFO")}</th>
                      <th>{t("OTP_Mobile_Number")}</th>
                      <th>{t("USER TYPE")}</th>
                      <th>{t("DESIGNATION/ROLE")}</th>
                      <th>{t("Department")}</th>
                      <th>{t("EMAIL_ID")}</th>
                      <th>{t("Login")}</th>
                      <th>{t("Current_Status_Name")}</th>
                      <th>{t("OTP LOGIN")}</th>
                      <th style={{ width: "10%" }} className="text-center">
                        {t("Action")}
                      </th>
                    </tr>
                  </thead>

                  <tbody>


                    {/* <tr>
                      <td className="" style={{ paddingLeft: "7px", fontSize: "13px" }} > 1 </td>
                      <td><span></span>  <br /> <span style={{ fontSize: "13px", color: "#929292" }}> 1235883 </span> </td>
                      <td>
                        <span style={{ color: "#2D8AF5", fontSize: "14px" }}> Support{" "} </span> (10104) <br />
                        <span style={{ color: "#7B7B7B", fontSize: "13px" }}> Suman Gupta </span> <br />
                        <span style={{ fontSize: "13px", color: "#929292" }}> 9867528872 </span>
                      </td>
                      <td>
                        <span style={{ color: "#7B7B7B", fontSize: "13px" }}> 123456789 </span>
                      </td>
                      <td>
                        <span style={{ color: "#7B7B7B", fontSize: "13px" }}> Operator </span>
                      </td>
                      <td>
                        <span style={{ color: "#7B7B7B", fontSize: "14px" }}> Operator </span> <br />
                        <span style={{ color: "#7B7B7B", fontSize: "13px" }}> Suman Gupta </span>
                      </td>
                      <td>
                        <span style={{ color: "#7B7B7B", fontSize: "13px" }}> Not Printed </span>
                      </td>
                      <td>
                        <span style={{ color: "#7B7B7B", fontSize: "13px" }}> Suman@gmail.com </span>
                      </td>
                      <td>
                        <span style={{ color: "#7B7B7B", fontSize: "13px" }}> Yes </span>
                      </td>
                      <td>
                        <span style={{ color: "#7B7B7B", fontSize: "13px" }}> Active </span>
                      </td>
                      <td>
                        <span style={{ color: "#7B7B7B", fontSize: "13px" }}> No </span>
                      </td>
                      <td className="text-center">
                        <div className="action-button">
                          <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" >
                            <img src={IconEdit} alt="" />
                          </div>
                          <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal" >
                            <img src={IconDelete} alt="" />
                          </div>
                        </div>
                      </td>
                    </tr> */}

                    {userList && userList.map((val, ind) => {
                      return (
                        <tr>
                          <td className="" style={{ paddingLeft: "7px", fontSize: "13px" }} > {ind + 1} </td>
                          <td><span></span>  <br /> <span style={{ fontSize: "13px", color: "#929292" }}> {val.id} </span> </td>
                          <td>
                            <span style={{ color: "#2D8AF5", fontSize: "14px" }}> {val.name}{" "} </span> ({val.userName}) <br />
                            <span style={{ color: "#7B7B7B", fontSize: "13px" }}> {val.userName} </span> <br />
                            <span style={{ fontSize: "13px", color: "#929292" }}> {val.mobileNo} </span>
                          </td>
                          <td>
                            <span style={{ color: "#7B7B7B", fontSize: "13px" }}> {val.mobileNo} </span>
                          </td>
                          <td>
                            <span style={{ color: "#7B7B7B", fontSize: "13px" }}> {t("Operator")} </span>
                          </td>
                          <td>
                            <span style={{ color: "#7B7B7B", fontSize: "14px" }}> {t("Operator")} </span> <br />
                            <span style={{ color: "#7B7B7B", fontSize: "13px" }}> {t("Suman Gupta")}</span>
                          </td>
                          <td>
                            <span style={{ color: "#7B7B7B", fontSize: "13px" }}> {t("Not Printed")}</span>
                          </td>
                          <td>
                            <span style={{ color: "#7B7B7B", fontSize: "13px" }}> {val.email} </span>
                          </td>
                          <td>
                            <span style={{ color: "#7B7B7B", fontSize: "13px" }}> {t("Yes")} </span>
                          </td>
                          <td>
                            <span style={{ color: "#7B7B7B", fontSize: "13px" }}> {t("Active")} </span>
                          </td>
                          <td>
                            <span style={{ color: "#7B7B7B", fontSize: "13px" }}> {t("No")} </span>
                          </td>
                          <td className="text-center">
                            <div className="action-button">
                              <div data-bs-toggle="tooltip" data-bs-title="Edit Row" data-bs-placement="bottom" title="Edit Row" >
                                <img src={IconEdit} alt="" />
                              </div>
                              <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal" onClick={() => { setRowId(val.id) }}>
                                <img src={IconDelete} alt="" />
                              </div>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/*  ---------Start Delete Modal---------------  */}
        <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" >
          <div className="modal-dialog modalDelete">
            <div className="modal-content">
              <div className="modal-body modelby text-center">
                <div className="popDeleteIcon">
                  <i className="fa fa-trash"></i>
                </div>
                <div className="popDeleteTitle mt-3">{t("Delete?")}</div>
                <div className="popDeleteContent">{t("Are_you_sure_you_want_to_delete?")} </div>
              </div>
              <div className="modal-footer1 text-center">
                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal" > {t("Cancel")}</button>
                <button type="button" className="btn-delete popBtnDelete" data-bs-dismiss="modal" onClick={handleDeleteRow}>{t("Delete")} </button>
              </div>
            </div>
          </div>
        </div>
        {/* END MODAL */}
      </section>
    </>
  );
}
export default AddUserMaster;
