import React, { useEffect, useState } from 'react'
import Heading from '../../../Component/Heading'
import GetStateList from '../../API/GET/GetStateList'
import GetCityList from '../../API/GET/GetCityList';
import GetDepartmentList from '../../API/GET/GetDepartmentList';
import GetRoomList from '../../API/GET/GetRoomList';
import ValidationOPDRegistration from '../../../Validation/OPD/OpdRegistration'
import DemographyPatientPriviousNames from '../../../Validation/Registartion/DemographyPatientPriviousNames'
import GetMaritalStatusList from '../../API/GET/GetMaritalStatusList';
import GetDoctorList from '../../API/GET/GetDoctorList';
import { OPDPatientRegistration, InsertFHIRPatientHistory } from '../../API/POST/OPDPatientRegistration';
import GetWardList from '../../API/GET/GetWardList';
import SuccessToster from '../../../Component/SuccessToster';
import AlertToster from '../../../Component/AlertToster';
import GetRaceType from '../../API/GET/GetRaceType';
import GetEthinicity from '../../API/GET/GetEthinicity';
import GetLanguage from '../../API/GET/GetLanguage';
import GetGender from '../../API/GET/GetGender';

import PatientDetails from './Components/PatientDetails';
import ContactDetails from './Components/ContactDetails';

// Icons Import 
import smartphone from '../../../assets/images/icons/smartphone.svg';
import patientOPD from '../../../assets/images/icons/patientOPD.svg';
import calendar from '../../../assets/images/icons/calendar.svg';
import emailIcon from '../../../assets/images/icons/email.svg';
import city from '../../../assets/images/icons/city.svg';
import addressIcon from '../../../assets/images/icons/addressIcon.svg';
import stateIcon from '../../../assets/images/icons/stateIcon.svg';
import zipCodeIcon from '../../../assets/images/icons/zipCodeIcon.svg';
import userOPD from '../../../assets/images/icons/userOPD.svg';
import ageIcon from '../../../assets/images/icons/ageIcon.svg';
import IconPatientRelation from '../../../assets/images/icons/IconPatientRelation.svg';
import home from '../../../assets/images/icons/home.svg';
import medicalAssistance from '../../../assets/images/icons/medical-assistance.svg';
import roomIcon from '../../../assets/images/icons/room.svg';
import identityIcon from '../../../assets/images/icons/id-card.svg';
import genderIcon from '../../../assets/images/icons/genders.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import printIcon from '../../../assets/images/icons/print.svg';
//Api
import GetPatientDetailsByMobileNo from '../../API/GET/GetPatientDetailsByMobileNo';
import PatientRevisit from '../../API/POST/PatientRevisit';
import GetCountryList from '../../API/GET/GetCountryList';
import UpdatePatientDetails from '../../API/UPDATE/UpdatePatientDetails';
import TosterUnderProcess from '../../../Component/TosterUnderProcess';
import Toster from '../../../Component/Toster';
import GetRegisterDetailsByUHID from '../../API/GET/GetRegisterDetailsByUHID';
import GetPatientPersonalDashboardByUHID from '../../API/GET/GetPatientPersonalDashboardByUHID';
import GetCountryById from '../../API/GET/GetCountryById';
import { useTranslation } from 'react-i18next';


import GetInsuranceCompanyList from '../../API/GET/GetInsuranceCompanyList'


import i18n from "i18next";
import InsuranceDetails from './Components/InsuranceDetails';


export default function PatientRegistration() {
    let [stateList, setStateList] = useState([]);
    let [cityList, setCityList] = useState([]);
    let [deparetmentList, setDepartmentList] = useState([]);
    let [roomList, setRoomList] = useState([]);
    let [doctorList, setDoctorList] = useState([]);
    let [wardList, setWardList] = useState([]);
    let [maritalStatusList, setmMaritalStatusList] = useState([]);
    let [priviousNameList, setPriviousNameList] = useState([]);
    let [patientMobileNo, setPatientMobileNo] = useState('');
    let [patientName, setPatientName] = useState('');
    let [patientHomeMobNo, setPatientHomeMobNo] = useState('');
    let [email, setEmail] = useState('');
    let [patientAddress, setPatientAddress] = useState('');
    let [apt, setApt] = useState('');
    let [zipCode, setZipCode] = useState('');
    let [dob, setDob] = useState("");
    let [guardianName, setGuardianName] = useState('');
    let [guardianRelationToPatient, setGuardianRelationToPatient] = useState('');
    let [guardianAddress, setGuardianAddress] = useState('');
    let [guardianMobileNo, setGuardianMobileNo] = useState('');
    let [selectedCity, setSelectedCity] = useState('0');
    let [selectedState, setSelectedState] = useState('0');
    let [countryID, setCountryID] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).countryId);
    let [selectedDept, setSelectedDept] = useState('0');
    let [selectedRoom, setSelectedRoom] = useState('0');
    let [selectedWard, setSelectedWard] = useState('0');
    let [selectedDoctor, setSelectedDoctor] = useState('0');
    let [patientAge, setPatientAge] = useState("");
    let [patientGender, setPatientGender] = useState('0');
    let [getPatientGender, setGetPatientGender] = useState([]);
    let [PatientID, setPatientID] = useState('');
    let [patientUHID, setPatientUHID] = useState('');
    let [matarialStatus, setMatarialStatus] = useState('0');
    let [employmentStatus, setEmploymentStatus] = useState('0');
    let [showToster, setShowToster] = useState(0)
    let [showAlertToster, setShowAlertToster] = useState(0)
    let [showMessage, setShowMessage] = useState(0)
    let [lastUhid, setLastUhid] = useState('');
    let [raceTypeList, setRaceTypeList] = useState([])
    let [ethinicityList, setEthinicityList] = useState([])
    let [languageList, setLanguageList] = useState([])
    let [raceType, setRaceType] = useState("")
    let [ethinicity, setEthinicity] = useState("")
    let [language, setLanguage] = useState(0)
    let [IdentityNo, setIdentityNo] = useState("")
    let [consultantFee, setConsultantFee] = useState("")
    let [patientHeight, setPatientHeight] = useState('')
    let [patientWeight, setPatientWeight] = useState('');
    let [patientListByMobileNo, setPatientListByMobileNo] = useState([]);
    let [isRevisitPatient, setisRevisitPatient] = useState(0);
    let [uhid, setUhid] = useState('');
    let [showPatientHistory, setShowPatientHistory] = useState(0);
    let [showPreviousNamesPopUp, setShowPreviousNamesPopUp] = useState(false);
    let [showPrintHealthCardConfirmation, setShowPrintHealthCardConfirmation] = useState(0);
    let [isEdit, setIsEdit] = useState(false);
    let [showEdit, setShowEdit] = useState(false);
    let [countryList, setCountryList] = useState([]);
    let [countryCode, setCountryCode] = useState(JSON.parse(window.sessionStorage.getItem("LoginData")).countryCode);
    let [rowId, setRowId] = useState('');
    let [showUnderProcess, setShowUnderProcess] = useState(0);
    let [showUpdateToster, setShowUpdateToster] = useState(0);
    let [tosterMessage, setTosterMessage] = useState("");
    let [tosterValue, setTosterValue] = useState(0);
    let [printHealthCardData, setPrintHealthCardData] = useState([]);
    let [paymentType, setPaymentType] = useState(0);
    let [cashpayment, setCashpayment] = useState('');
    const { t } = useTranslation();
    let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);
    let [headingName, setHeadingName] = useState(JSON.parse(sessionStorage.getItem("activePage")).menuName);
    let [content, setContent] = useState('');

    // Insurance Company Lists
    let [CardNo, setCardNo] = useState('');
    let [insuranceCompany, setinsuranceCompany] = useState(0);
    let [InsuranceCompanyList, setInsuranceCompanyList] = useState([]);

    //   

    // let Content = JSON.parse(window.sessionStorage.getItem("departmentmenu")).content;
    // console.log("Content----->",Content)

    //changes done by wajahat
    // let langId = JSON.parse(window.sessionStorage.getItem("languageId")).languageId;
    // console.log('langId',langId);

    // Insurance Company List

    const GetInsuranceList = async () => {
        let InsuranceList = await GetInsuranceCompanyList()
        if (InsuranceList.status === 1) {
            setInsuranceCompanyList(InsuranceList.responseValue)
            console.log("InsuranceList", InsuranceList.responseValue)
        }
    }


    let handlerChange = (e) => {
        clearErrorMessages();
        if (e.target.name === "mobileNumber") {
            const checkLength = e.target.value;
            if (checkLength.toString().length > 10) {
                return false;
            }
            else {
                setPatientMobileNo(e.target.value);
                if (checkLength.toString().length === 10) {
                    const key = e.target.value;
                    getPatientDetailsByMobileNumber(key);
                }

            }

        }
        if (e.target.name === "patientName") {
            setPatientName(e.target.value);

        }
        if (e.target.name === "patientHomeMobNo") {
            setPatientHomeMobNo(e.target.value);
        }
        if (e.target.name === "email") {
            setEmail(e.target.value);
        }
        if (e.target.name === "address") {
            setPatientAddress(e.target.value);
        }
        if (e.target.name === "apt") {
            setApt(e.target.value);
        }

        if (e.target.name === "guardianName") {
            setGuardianName(e.target.value);
        }
        // if (e.target.name === "guardianRelationToPatient") {
        //     setGuardianRelationToPatient(e.target.value);
        // }
        if (e.target.name === "guardianAddress") {
            setGuardianAddress(e.target.value);
        }
        if (e.target.name === "guardianMobileNo") {
            const checkLength = e.target.value;
            if (checkLength.toString().length > 10) {
                return false;
            }
            else {
                setGuardianMobileNo(e.target.value);

            }

        }
        if (e.target.name === "UHID") {
            setPatientUHID(e.target.value);
        }
        if (e.target.name === "PatientID") {
            setPatientID(e.target.value);
        }
        if (e.target.name === "zip") {
            setZipCode(e.target.value);
            document.getElementById("errZip").style.display = "none";
        }
        if (e.target.name === "IdentityNo") {
            setIdentityNo(e.target.value);
            document.getElementById("errIdentityNo").style.display = "none";
        }
        if (e.target.name === "patientHeight") {
            if (e.target.valu !== '-') {

                setPatientHeight(e.target.value);
            }

        }
        if (e.target.name === "patientWeight") {
            if (e.target.valu !== '-') {
                setPatientWeight(e.target.value);
            }

        }
        if (e.target.name === "ddlAgeUnit") {
            const ageUnit = document.getElementById('ddlAgeUnit').value;
            handleAgeUnit(ageUnit)
        }
        if (e.target.name === "cashpayment") {
            setCashpayment(e.target.value)
        }
        if (e.target.name === "insuranceCompany") {
            setinsuranceCompany(e.target.value)
        }
        if (e.target.name === "cardNo") {
            setCardNo(e.target.value)
        }

    }

    let handlerChange2 = (e) => {

    }
    let getStateList = async (val) => {
        let data = await GetStateList(val);
        setStateList(data.responseValue);


    }
    let getRaceTypeList = async () => {
        let data = await GetRaceType()
        if (data.status === 1) {
            setRaceTypeList(data.responseValue)
        }
    }
    let getEthinicityIdList = async () => {
        let data = await GetEthinicity()
        if (data.status === 1) {
            setEthinicityList(data.responseValue)
        }
    }
    let getLanguageIdList = async () => {
        let data = await GetLanguage()
        if (data.status === 1) {

            setLanguageList(data.responseValue)
        }
    }
    let getDepartmentList = async () => {
        let data = await GetDepartmentList()
        setDepartmentList(data.responseValue);

    }
    let getCityListByState = async (val) => {
        clearErrorMessages();
        const stateID = document.getElementById('ddlState').value;
        if (stateID === "0" || stateID === undefined || stateID === null) {
            setCityList([]);
        }
        else {
            let data = await GetCityList(stateID);
            setCityList(data.responseValue);

        }


    }
    let getDdlListByDeptID = async (val) => {
        // if (val === 1) {
        document.getElementById("errDepartment").style.display = "none";
        const deptID = document.getElementById('ddlDepartment').value;
        let data = await GetRoomList(deptID);
        setSelectedDept(deptID);
        getWardListByDeptID(deptID);
        setRoomList(data.responseValue);
        // }
        // else {
        //     const deptID = document.getElementById('ddlDepartment').value;
        //     let data = await GetRoomList(deptID);
        //     setSelectedDept(deptID)
        //     setRoomList(data.responseValue);
        //     setSelectedRoom(data.responseValue[0].id)

        // }

    }
    let getWardListByDeptID = async (deptID) => {
        let data = await GetWardList(deptID);
        setWardList(data.responseValue);
    }
    let getMaritalStatusList = async () => {
        let data = await GetMaritalStatusList();
        setmMaritalStatusList(data.responseValue);
    }
    let getDoctorList = async () => {
        let data = await GetDoctorList();
        setDoctorList(data.responseValue);
    }
    let getCountryList = async () => {
        let response = await GetCountryList();
        if (response.status === 1) {
            setCountryList(response.responseValue);
            getStateList(countryID);

            // setTimeout(()=>{
            //     // document.getElementById('ddlCountryCode').value=countryID;
            //     getStateList(countryID);
            // },600);
        }
    }
    // Used to Get Value From Dropdown
    let getSelectedCity = () => {
        document.getElementById("errCity").style.display = "none";
        const cityID = document.getElementById('ddlCity').value;
        setSelectedCity(cityID)
    }
    let getSelectedRoom = () => {
        document.getElementById("errRoom").style.display = "none";
        const roomID = document.getElementById('ddlRoomNo').value;
        setSelectedRoom(roomID);
    }
    let getGenderData = async () => {
        let response = await GetGender()
        if (response.status === 1) {
            setGetPatientGender(response.responseValue)
        }
    }
    let getSelectedGender = () => {
        document.getElementById("errPatientGender").style.display = "none";
        const gender = document.getElementById('ddlGender').value;
        setPatientGender(gender);
    }
    let getSelectedMaritalSttaus = () => {
        const maritalStatus = document.getElementById('ddlMaritalStatus').value;
        setMatarialStatus(maritalStatus);
    }
    let getSelectRaceType = () => {
        const raceType = document.getElementById('ddlRaceType').value;
        setRaceType(raceType);
    }
    let getSelectedEthinicity = () => {
        const ethinicity = document.getElementById('ddlEthnicity').value;
        setEthinicity(ethinicity);
    }
    let getSelectedLanguage = () => {
        const language = document.getElementById('ddlPreferredLanguage').value;
        setLanguage(language);
    }
    let getRelationToPat = () => {
        const relationToPat = document.getElementById('ddlRelationToPat').value;
        setGuardianRelationToPatient(relationToPat);
    }
    let getSelectedWard = () => {
        document.getElementById("errWard").style.display = "none";
        const ward = document.getElementById('ddlWard').value;
        setSelectedWard(ward);

    }
    let getSelectedDoctor = () => {
        document.getElementById("errDoctor").style.display = "none";
        const doctor = document.getElementById('ddlDoctor').value;
        setSelectedDoctor(doctor);
    }
    let handleGetStateByCountry = async () => {
        const getCountryID = document.getElementById('ddlCountryCode').value;
        getStateList(getCountryID);
        setCountryID(getCountryID);
        getConsultantFee(getCountryID);

    }
    ///End Here
    let getPatientAge = (e) => {
        document.getElementById("errPatientDob").style.display = "none";
        document.getElementById("ddlAgeUnit").value = "1";
        const val = document.getElementById('txtDob').value;
        setDob(val);
        let today = new Date();
        let birthDate = new Date(val);
        let getAge = today.getFullYear() - birthDate.getFullYear();
        let getMonth = today.getMonth() - birthDate.getMonth();
        if (getMonth < 0 || (getMonth === 0 && today.getDate() - birthDate.getDate())) {
            getAge--;
        }
        setPatientAge(getAge);
    }
    let getPatientDobByAge = (e) => {
        clearErrorMessages();
        if (e.target.value > 0) {

            setPatientAge(e.target.value);
            const value = document.getElementById("ddlAgeUnit").value;
            handleAgeUnit(value)
        }
        else {
            setPatientAge("");
            setDob('')
        }

    }
    let handleAgeUnit = (value) => {
        let age = document.getElementById('txtAge').value
        var DOB = "";
        var month = "";
        var day = "";
        var year = "";
        var now = new Date();
        var nowMonth = now.getUTCMonth() + 1;
        var nowDay = now.getUTCDate();
        var nowYear = now.getUTCFullYear();
        if (value === "1") {             //Year
            year = nowYear - age;
            // DOB = year  + "-" + nowMonth + "-" + nowDay;
            var yyyy = year;
            var mm = nowMonth.toString().length === 2 ? nowMonth : '0' + nowMonth;
            var dd = nowDay.toString().length === 2 ? nowDay : '0' + nowDay;
            var getDob = yyyy + '-' + mm + '-' + dd;
            DOB = getDob;
            setDob(DOB)
        }
        else if (value === "2") {      //Month
            if ((age > nowMonth)) {
                if ((age / 12) >= 1) {
                    year = nowYear - parseInt((age / 12));
                    if (((age % 12) < nowMonth)) {
                        month = nowMonth - (age % 12);
                        // DOB = year + "-" + month + "-" + nowDay;
                        var yyyy = year;
                        var mm = month.toString().length === 2 ? month : '0' + month;
                        var dd = nowDay.toString().length === 2 ? nowDay : '0' + nowDay;
                        var getDob = yyyy + '-' + mm + '-' + dd;
                        DOB = getDob;

                        setDob(DOB)
                    }
                    else {
                        month = (nowMonth + 12) - (age % 12);
                        // DOB =  parseInt(year - 1)+ "-" + month + "-" +nowDay ;
                        var yyyy = parseInt(year - 1);
                        var mm = month.toString().length === 2 ? month : '0' + month;
                        var dd = nowDay.toString().length === 2 ? nowDay : '0' + nowDay;
                        var getDob = yyyy + '-' + mm + '-' + dd;
                        DOB = getDob;
                        setDob(DOB)
                    }
                }
                else {
                    year = nowYear - 1;
                    month = (nowMonth + 12) - age;
                    // DOB = year + "-" + month + "-" + nowDay;
                    var yyyy = year;
                    var mm = month.toString().length === 2 ? month : '0' + month;
                    var dd = nowDay.toString().length === 2 ? nowDay : '0' + nowDay;
                    var getDob = yyyy + '-' + mm + '-' + dd;
                    DOB = getDob;
                    setDob(DOB)
                }
            }
            else {
                month = nowMonth - age;
                var yyyy = nowYear;
                var mm = month.toString().length === 2 ? month : month.toString() === '0' ? '01' : '0' + month;
                var dd = nowDay.toString().length === 2 ? nowDay : '0' + nowDay;
                var getDob = yyyy + '-' + mm + '-' + dd;
                DOB = getDob;
                // DOB = nowYear + "-" + month + "-" + nowDay;

                setDob(DOB)
            }
        }
        else if (value === "3") {  //Day
            now.setDate(now.getDate() - age);
            var a = now.toLocaleDateString().split("/");
            var yyyy = a[2];
            var mm = a[0].length === 2 ? a[0] : '0' + a[0];
            var dd = a[1].length === 2 ? a[1] : '0' + a[1];
            var getDob = yyyy + '-' + mm + '-' + dd;
            // var b = a[2] + '-' + a[0].length === 2 ? a[0]: '0'+a[0]+ '-' + a[1].length === 2 ? a[1]: '0'+a[1];
            DOB = getDob;
            setDob(DOB)
        }

    }
    let getPatientDetailsByMobileNumber = async (value) => {
        setisRevisitPatient(1);
        let response = await GetPatientDetailsByMobileNo(value);
        if (response.status === 1) {
            setPatientListByMobileNo(response.responseValue);
            if (response.responseValue.length > 0) {
                setShowPatientHistory(1)
            }
        }
    }
    let getPatientRegHistory = async (list, isUpdated) => {
        setRowId(list.id)
        setShowEdit(true);
        setUhid(list.uhID);
        getStateList(list.countryId);
        const stateId = list.stateId;
        if (stateId === "0" || stateId === undefined || stateId === null) {
            setCityList([]);
        }
        else {
            let data = await GetCityList(stateId);
            setCityList(data.responseValue);
        }
        setTimeout(() => {
            document.getElementById('ddlCity').value = list.cityId;
            document.getElementById('ddlState').value = list.stateId;
        }, 1000);
        document.getElementById('ddlIdentityType').value = list.idTypeId;
        document.getElementById('ddlBloodGroup').value = list.bloodGroupId;
        document.getElementById('ddlAgeUnit').value = list.ageUnitId;
        document.getElementById('ddlRelationToPat').value = list.guardianRelationId === null ? 0 : list.guardianRelationId;
        document.getElementById('ddlGender').value = list.genderId;
        document.getElementById('ddlMaritalStatus').value = list.maritalStatusId === null ? 0 : list.maritalStatusId;
        document.getElementById('ddlPreferredLanguage').value = list.languageId === null ? 0 : list.languageId;
        document.getElementById('ddlEthnicity').value = list.ethinicityId === null ? 0 : list.ethinicityId;
        document.getElementById('ddlRaceType').value = list.raceTypeId === null ? 0 : list.raceTypeId;
        document.getElementById('ddlsexualOrientation').value = list.sexualOrientation == null ? 0 : list.sexualOrientation;
        setGuardianMobileNo(list.guardianMobileNo);
        setGuardianAddress(list.guardianAddress);
        setGuardianName(list.guardianName);
        setZipCode(list.zip);
        setPatientAddress(list.address);
        setEmail(list.emailID);
        setPatientHeight(list.height);
        setPatientWeight(list.weight);
        setPatientAge(list.age);
        setDob(list.dob);
        setPatientName(list.patientName);
        setIdentityNo(list.idNumber);
        disabledFields();
        if (isUpdated === 1) {
            document.getElementById("ddlRoomNo").disabled = false;
            document.getElementById("ddlDepartment").disabled = false;
            document.getElementById("ddlDoctor").disabled = false;
        }
    }
    let disabledFields = () => {
        //Used To Disabled Filed
        document.getElementById("txtMobileNo").disabled = true;
        document.getElementById("ddlIdentityType").disabled = true;
        document.getElementById("txtIdentityNo").disabled = true;
        document.getElementById("txtPatientName").disabled = true;
        document.getElementById("txtDob").disabled = true;
        document.getElementById("txtAge").disabled = true;
        document.getElementById("ddlAgeUnit").disabled = true;
        document.getElementById("ddlGender").disabled = true;
        document.getElementById("patientHeight").disabled = true;
        document.getElementById("patientWeight").disabled = true;
        document.getElementById("ddlBloodGroup").disabled = true;
        document.getElementById("txtEmailAddress").disabled = true;
        document.getElementById("txtAddress").disabled = true;
        document.getElementById("ddlState").disabled = true;
        document.getElementById("ddlCity").disabled = true;
        document.getElementById("txtZip").disabled = true;
        document.getElementById("ddlRaceType").disabled = true;
        document.getElementById("ddlEthnicity").disabled = true;
        document.getElementById("ddlPreferredLanguage").disabled = true;
        document.getElementById("ddlMaritalStatus").disabled = true;
        document.getElementById("txtGuardianName").disabled = true;
        document.getElementById("txtPatientRelationAddress").disabled = true;
        document.getElementById("txtPatientRelationMobNo").disabled = true;
        document.getElementById("ddlRelationToPat").disabled = true;
        document.getElementById("ddlsexualOrientation").disabled = true;
        document.getElementById("ddlCountryCode").disabled = true;
    }
    let clearDisabledFields = () => {
        //Used To Disabled Filed
        document.getElementById("txtMobileNo").disabled = false;
        document.getElementById("ddlIdentityType").disabled = false;
        document.getElementById("txtIdentityNo").disabled = false;
        document.getElementById("txtPatientName").disabled = false;
        document.getElementById("txtDob").disabled = false;
        document.getElementById("txtAge").disabled = false;
        document.getElementById("ddlAgeUnit").disabled = false;
        document.getElementById("ddlGender").disabled = false;
        document.getElementById("patientHeight").disabled = false;
        document.getElementById("patientWeight").disabled = false;
        document.getElementById("ddlBloodGroup").disabled = false;
        document.getElementById("txtEmailAddress").disabled = false;
        document.getElementById("txtAddress").disabled = false;
        document.getElementById("ddlState").disabled = false;
        document.getElementById("ddlCity").disabled = false;
        document.getElementById("txtZip").disabled = false;
        document.getElementById("ddlRaceType").disabled = false;
        document.getElementById("ddlEthnicity").disabled = false;
        document.getElementById("ddlPreferredLanguage").disabled = false;
        document.getElementById("ddlMaritalStatus").disabled = false;
        document.getElementById("txtGuardianName").disabled = false;
        document.getElementById("txtPatientRelationAddress").disabled = false;
        document.getElementById("txtPatientRelationMobNo").disabled = false;
        document.getElementById("ddlRelationToPat").disabled = false;
        document.getElementById("ddlsexualOrientation").disabled = false;
        document.getElementById("ddlCountryCode").disabled = false;
        document.getElementById("ddlRoomNo").disabled = false;
        document.getElementById("ddlDepartment").disabled = false;
        document.getElementById("ddlDoctor").disabled = false;
    }
    let savePriviousName = async () => {






        const previousNamePrefix = document.getElementById('txtPreviousNamePrefix').value;
        const previousNameFirst = document.getElementById('txtPreviousNameFirst').value;
        const previousNameMiddle = document.getElementById('txtPreviousNameMiddle').value;
        const previousNameLast = document.getElementById('txtPreviousNameLast').value;
        const previousNameSuffix = document.getElementById('txtPreviousNameSuffix').value;
        const previousNameEndDate = document.getElementById('txtPreviousNameEndDate').value;
        var dataObj = {
            previousNamePrefix: previousNamePrefix,
            previousNameFirst: previousNameFirst,
            previousNameMiddle: previousNameMiddle,
            previousNameLast: previousNameLast,
            previousNameSuffix: previousNameSuffix,
            previousNameEndDate: previousNameEndDate,
            fullName: previousNamePrefix + ' ' + previousNameFirst + ' ' + previousNameMiddle + ' ' + previousNameLast + ' ' + previousNameSuffix
        };
        // setPriviousNameList(dataObj);
        setPriviousNameList(prevList => [...prevList, dataObj]);
        // const res = DemographyPatientPriviousNames(previousNamePrefix,previousNameFirst,previousNameMiddle,previousNameLast,previousNameSuffix,previousNameEndDate)
        // if (res === true) {
        //     setShowUnderProcess(1);
        //     var dataObj = {
        //         uuid: PatientID,
        //         date:
        //     };
        //     let data = await InsertFHIRPatientHistory(dataObj);
        //     if (data.status === 1) {
        //         setShowUnderProcess(0);
        //         setShowToster(1)

        //         setTimeout(() => {
        //             clear();
        //             setShowToster(0);
        //         }, 2000)
        //     }
        //     else {
        //         setShowUnderProcess(0)
        //         setShowAlertToster(1)
        //         setShowMessage(data.responseValue)
        //         setTimeout(() => {
        //             setShowToster(0)
        //         }, 2000)
        //     }
        // }

    };
    let save = async () => {

        //Patient Visit
        if (uhid === "" || uhid === null) {
            //Used To Get Country Code
            var getDdlList = document.getElementById('ddlCountryCode');
            var getSelectedIndex = getDdlList.selectedIndex
            const getCountryCode = getDdlList.options[getSelectedIndex].text;
            const identityType = document.getElementById('ddlIdentityType').value;
            const bloodGroup = document.getElementById('ddlBloodGroup').value;
            const ageUnit = document.getElementById('ddlAgeUnit').value;
            const roomNo = document.getElementById('ddlRoomNo').value;
            const state = document.getElementById('ddlState').value;
            const city = document.getElementById('ddlCity').value;
            const sexualOrientation = document.getElementById('ddlsexualOrientation').value;
            const res = ValidationOPDRegistration(patientMobileNo, identityType, IdentityNo, patientName, patientAddress, state, city, dob, patientAge, patientGender, patientHeight, patientWeight, selectedDept, selectedDoctor, selectedRoom);
            var id = res[1];
            let getCityName = document.getElementById('ddlCity');
            let getStateName = document.getElementById('ddlState');
            let getGenderName = document.getElementById('ddlGender');
            let getRaceName = document.getElementById('ddlRaceType');
            let getEthnicityName = document.getElementById('ddlEthnicity');
            let getSelectedCityName = getCityName.options[getCityName.selectedIndex].text;
            let getSelectedStateName = getStateName.options[getStateName.selectedIndex].text;
            let getSelectedGenderName = getGenderName.options[getGenderName.selectedIndex].text;
            let getSelectedRaceName = getRaceName.options[getRaceName.selectedIndex].text;
            let getSelectedEthnicityName = getEthnicityName.options[getEthnicityName.selectedIndex].text;
            let lastName = patientName.trim().split(' ');
            let getLastName = lastName[lastName.length - 1];
            const clientID = JSON.parse(sessionStorage.getItem("LoginData")).clientId;

            if (res === true) {
                setShowUnderProcess(1);
                var dataObj = {
                    patientId: PatientID,
                    patientName: patientName,
                    patientType: 0,
                    dob: dob,
                    genderId: patientGender,
                    guardianName: guardianName,
                    countryCallingCode: getCountryCode,
                    mobileNo: patientMobileNo,
                    countryId: countryID,
                    stateId: state,
                    cityId: city,
                    address: patientAddress,
                    userId: userID,
                    maritalStatusId: matarialStatus,
                    age: patientAge,
                    departmentId: selectedDept,
                    doctorId: selectedDoctor,
                    emailID: email,
                    uhID: patientUHID,
                    // wardID: selectedWard,
                    raceTypeId: raceType,
                    ethinicityId: ethinicity,
                    languageId: language,
                    idTypeId: parseInt(identityType),
                    idNumber: IdentityNo,
                    ageUnitId: ageUnit,
                    height: patientHeight,
                    weight: patientWeight,
                    bloodGroupId: bloodGroup,
                    zip: zipCode,
                    guardianAddress: guardianAddress,
                    guardianMobileNo: guardianMobileNo,
                    roomId: roomNo,
                    guardianRelationId: guardianRelationToPatient,
                    sexualOrientation: sexualOrientation,
                    clientId: clientID
                    // cityName : getSelectedCityName,
                    // stateName :getSelectedStateName,
                    // countryCode : getCountryCode,
                    // genderName : getSelectedGenderName,
                    // raceName : getSelectedRaceName,
                    // ethnicityName : getSelectedEthnicityName,
                    // lastName:getLastName
                }


                let data = await OPDPatientRegistration(dataObj);
                if (data.status === 1) {
                    setShowUnderProcess(0);
                    setShowToster(1)
                    window.sessionStorage.setItem("PrintOpdData", JSON.stringify(data.responseValue[0]));
                    window.sessionStorage.setItem("PrintOpdDataConsultantFee", consultantFee);
                    window.open("/opdPrint/", 'noopener,noreferrer');
                    setLastUhid(data.responseValue[0].uhID);
                    setShowPrintHealthCardConfirmation(1);

                    setTimeout(() => {
                        clear();
                        setShowToster(0);
                    }, 2000)
                }
                else {
                    setShowUnderProcess(0)
                    setShowAlertToster(1)
                    setShowMessage(data.responseValue)
                    setTimeout(() => {
                        setShowToster(0)
                    }, 2000)
                }
            }
            else {
                console.log("id", id)
                document.getElementById(id).style.display = "block";
                document.getElementById(id).innerHTML = res[0];

            }
        }
        else {
            const roomID = document.getElementById('ddlRoomNo').value;
            if (uhid === "" || uhid === null) {
                return false;
            }
            else if (selectedDept === "0" || selectedDept === undefined) {
                document.getElementById('errDepartment').style.display = "block";
                document.getElementById('errDepartment').innerHTML = "Select Department";
            }
            else if (selectedDoctor === "0" || selectedDoctor == undefined) {
                document.getElementById('errDoctor').style.display = "block";
                document.getElementById('errDoctor').innerHTML = "Select Doctor";
            }
            else if (roomID === "0" || roomID == undefined) {
                document.getElementById('errRoom').style.display = "block";
                document.getElementById('errRoom').innerHTML = "Select Room";
            }
            else {
                let response = await PatientRevisit(selectedDept, selectedDoctor, userID, uhid, roomID);
                if (response.status === 1) {
                    setShowToster(1)
                    window.sessionStorage.setItem("PrintOpdData", JSON.stringify(response.responseValue[0]));
                    window.sessionStorage.setItem("PrintOpdDataConsultantFee", consultantFee);
                    window.open("/opdPrint/", 'noopener,noreferrer');
                    setLastUhid(response.responseValue[0].uhID);
                    setShowPrintHealthCardConfirmation(1);
                    clear();

                }
                else {
                    setShowAlertToster(1)
                    setShowMessage(response.responseValue)
                }
            }
        }
    }
    let clear = () => {
        setPatientMobileNo('');
        setPatientName('');
        setPatientHomeMobNo('');
        setEmail('');
        setPatientAddress('');
        setApt('');
        setDob('');
        setZipCode('');
        setGuardianName('');
        setGuardianRelationToPatient('');
        setGuardianAddress('');
        setGuardianMobileNo('');
        setPatientAge('');
        setPatientUHID('');
        setPatientID('');
        setPatientHeight('');
        setPatientWeight('');
        setWardList([]);
        setRoomList([]);
        setIdentityNo('');
        setCityList([]);
        setisRevisitPatient(0);
        setUhid('');
        clearDisabledFields();
        clearErrorMessages();
        setShowEdit(false);
        setIsEdit(false);
        setPaymentType(0);
        setCashpayment('');
        document.getElementById('ddlState').value = 0;
        document.getElementById('ddlCity').value = 0;
        document.getElementById('ddlRoomNo').value = 0;
        document.getElementById('ddlDoctor').value = 0;
        document.getElementById('ddlBloodGroup').value = 0;
        document.getElementById('ddlIdentityType').value = '0';
        document.getElementById('ddlGender').value = '0';
        document.getElementById('ddlDepartment').value = '0';
        document.getElementById('ddlBloodGroup').value = '0';
        document.getElementById('ddlRaceType').value = '0';
        document.getElementById('ddlEthnicity').value = '0';
        document.getElementById('ddlPreferredLanguage').value = '0';
        document.getElementById('ddlMaritalStatus').value = '0';
        document.getElementById('ddlRelationToPat').value = '0';
        document.getElementById("ddlAgeUnit").value = "1";
        document.getElementById("ddlsexualOrientation").value = "0";
        document.getElementById("ddlPaymentType").value = "0";
        // document.getElementById("ddlInsuranceCompany").value = "0";
        const getClientCountryID = JSON.parse(window.sessionStorage.getItem("LoginData")).countryId;
        document.getElementById('ddlCountryCode').value = getClientCountryID;
        setCountryID(getClientCountryID);
        getStateList(getClientCountryID);
        getConsultantFee(getClientCountryID);
    }
    let handleRedirect = () => {
        window.open("/healthCard/")
    }
    let clearErrorMessages = () => {
        document.getElementById("errMobile").style.display = "none";
        document.getElementById("errPatientName").style.display = "none";
        document.getElementById("errPatientDob").style.display = "none";
        document.getElementById("errPatientAge").style.display = "none";
        document.getElementById("errPatientAddress").style.display = "none";
        document.getElementById("errState").style.display = "none";
        document.getElementById("errCity").style.display = "none";
        document.getElementById("errDepartment").style.display = "none";
        document.getElementById("errDoctor").style.display = "none";
        document.getElementById("errRoom").style.display = "none";
        document.getElementById("errPatientHeight").style.display = "none";
        document.getElementById("errPatientWeight").style.display = "none";
        document.getElementById("errPatientGender").style.display = "none";
        document.getElementById("errIdentityNo").style.display = "none";
        document.getElementById("errIdentityType").style.display = "none";
    }
    let prinData = () => {
        window.open("/opdPrint/", '_blank', 'noopener,noreferrer');
    }
    let checkLength = (e) => {
        if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);
    }
    let handleEdit = () => {
        setIsEdit(true);
        setShowEdit(false);
        enableEditFields();
    }
    let enableEditFields = () => {
        document.getElementById("ddlIdentityType").disabled = false;
        document.getElementById("txtIdentityNo").disabled = false;
        document.getElementById("patientHeight").disabled = false;
        document.getElementById("patientWeight").disabled = false;
        document.getElementById("ddlBloodGroup").disabled = false;
        document.getElementById("txtEmailAddress").disabled = false;
        document.getElementById("txtAddress").disabled = false;
        document.getElementById("ddlState").disabled = false;
        document.getElementById("ddlCity").disabled = false;
        document.getElementById("txtZip").disabled = false;
        document.getElementById("ddlRaceType").disabled = false;
        document.getElementById("ddlEthnicity").disabled = false;
        document.getElementById("ddlPreferredLanguage").disabled = false;
        document.getElementById("ddlMaritalStatus").disabled = false;
        document.getElementById("txtGuardianName").disabled = false;
        document.getElementById("txtPatientRelationAddress").disabled = false;
        document.getElementById("txtPatientRelationMobNo").disabled = false;
        document.getElementById("ddlRelationToPat").disabled = false;
        document.getElementById("ddlsexualOrientation").disabled = false;
        document.getElementById("ddlAgeUnit").disabled = false;
        document.getElementById("txtAge").disabled = false;
        document.getElementById("txtDob").disabled = false;
        document.getElementById("txtPatientName").disabled = false;
        document.getElementById("ddlGender").disabled = false;
        document.getElementById("ddlRoomNo").disabled = true;
        document.getElementById("ddlDepartment").disabled = true;
        document.getElementById("ddlDoctor").disabled = true;

    }
    let handleUpdate = async () => {

        const identityType = document.getElementById('ddlIdentityType').value;
        const bloodGroup = document.getElementById('ddlBloodGroup').value;
        const state = document.getElementById('ddlState').value;
        const city = document.getElementById('ddlCity').value;
        const sexualOrientation = document.getElementById('ddlsexualOrientation').value;
        const ageUnit = document.getElementById('ddlAgeUnit').value;
        const gender = document.getElementById('ddlGender').value;
        const res = ValidationOPDRegistration('1234567899', identityType, IdentityNo, patientName, patientAddress, state, city, dob, patientAge, gender, patientHeight, patientWeight, '1', '1', '1');
        var id = res[1];

        if (res === true) {
            // setShowUnderProcess(1);
            var dataObj = {
                patientName: patientName,
                pid: rowId,
                patientType: 0,
                guardianName: guardianName,
                countryId: countryID,
                stateId: state,
                cityId: city,
                address: patientAddress,
                userId: userID,
                maritalStatusId: matarialStatus == "" ? null : matarialStatus,
                emailID: email,
                raceTypeId: raceType == "" ? null : raceType,
                ethinicityId: ethinicity == "" ? null : ethinicity,
                languageId: language == "" ? 0 : language,
                idTypeId: identityType == "" ? null : parseInt(identityType),
                idNumber: IdentityNo,
                height: patientHeight,
                weight: patientWeight,
                bloodGroupId: bloodGroup,
                zip: zipCode,
                guardianAddress: guardianAddress,
                guardianMobileNo: guardianMobileNo,
                guardianRelationId: guardianRelationToPatient == "" ? null : guardianRelationToPatient,
                sexualOrientation: sexualOrientation,
                age: patientAge,
                dob: dob,
                ageUnitId: ageUnit,
                genderId: gender
            }

            let response = await UpdatePatientDetails(dataObj);
            if (response.status === 1) {
                setShowUnderProcess(0);
                setTosterValue(0);
                setShowUpdateToster(1);
                setTosterMessage("Data Updated Successfully!");
                setTimeout(() => {
                    setShowUpdateToster(0);
                    setRowId('');
                    setIsEdit(false);
                    getPatientRegHistory(response.responseValue[0], 1)

                }, 2000)
            }
            else {
                setShowUnderProcess(0)
                setShowUpdateToster(1)
                setTosterMessage(response.responseValue)
                setTosterValue(1)
                setTimeout(() => {
                    setShowUpdateToster(0)
                }, 2000)
            }
        }
        else {
            document.getElementById(id).style.display = "block";
            document.getElementById(id).innerHTML = res[0];

        }
    }
    let handlePrintHealthCard = async () => {
        if (uhid === "" || uhid === null || uhid === undefined) {
            if (lastUhid !== "" || lastUhid !== null) {
                let response = await GetPatientPersonalDashboardByUHID(lastUhid);
                if (response.status === 1) {
                    // setPrintHealthCardData(response.responseValue[0]);
                    window.sessionStorage.setItem(
                        "UHIDQRData",
                        JSON.stringify({
                            patientData: response.responseValue[0],
                            uhid: lastUhid,
                        })
                    );
                    window.open("/printHealthCard/", "noopener,noreferrer");
                    setShowPrintHealthCardConfirmation(0)
                }
            }
        }
        else {
            let response = await GetPatientPersonalDashboardByUHID(uhid);
            if (response.status === 1) {
                // setPrintHealthCardData(response.responseValue[0]);
                window.sessionStorage.setItem(
                    "UHIDQRData",
                    JSON.stringify({
                        patientData: response.responseValue[0],
                        uhid: uhid,
                    })
                );
                window.open("/printHealthCard/", "noopener,noreferrer");
                setShowPrintHealthCardConfirmation(0);
                clear();
            }
        }
    }
    let getConsultantFee = async (key) => {
        let response = await GetCountryById(key);
        if (response.status === 1) {
            const curr = response.responseValue.currency === null ? '' : response.responseValue.currency === undefined ? '' : response.responseValue.currency;
            setConsultantFee(curr + ' - 500')
        }

    }
    let handlePaymentChange = () => {
        let ddlPatmentType = parseInt(document.getElementById('ddlPaymentType').value);
        if (ddlPatmentType === 1) {
            // setPaymentType(1)
        }
        else if (ddlPatmentType === 2) {
            setPaymentType(2)
        }
        else {
            setPaymentType(0)
        }
    }
    let handlerdentity = () => {
        clearErrorMessages();
    }
    useEffect(() => {
        document.getElementById('ddlAgeUnit').value = 1;
        getCountryList();
        getDepartmentList();
        getMaritalStatusList();
        getRaceTypeList();
        getDoctorList();
        // getLanguageIdList();
        getEthinicityIdList();
        getGenderData();
        let UHID = window.sessionStorage.getItem("PrintOpdData") ? JSON.parse(window.sessionStorage.getItem("PrintOpdData")).uhID : ""
        setLastUhid(UHID);
        getConsultantFee(countryID)
        GetInsuranceList()
        // setContent(JSON.parse(window.sessionStorage.getItem("departmentmenu")).menuList[0].content)


    }, []);
    document.body.dir = i18n.dir();

    let showPreviousNamesPopUpHandle = (val) => {
        setShowPreviousNamesPopUp(val);
    }
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row ">
                        <div class="col-12">
                            <div class="med-box commong">
                                <div className="title">{headingName ? headingName : 'Patient Registration'}</div>
                            </div>
                        </div>
                        <div className="col-12">

                            <div className="med-box" style={{ border: 'transparent' }}>
                                {/* <Heading text={t("Patient_Details")}/> */}
                                {/* <Heading text={content} /> */}
                                <div class="fieldsett-in">
                                    <div class="fieldsett">
                                        <span class="fieldse">{t("Patient_Details")}</span>
                                        <div className="inner-content">
                                            <div className="dflex regEqualColums1">


                                                <PatientDetails onPatientDetailsChange={handlerChange2} onPriviousNamesAddButtonClick={showPreviousNamesPopUpHandle} isShowPriviousModal={showPreviousNamesPopUp} priviousNames={priviousNameList} />



                                            </div>
                                        </div>
                                    </div>
                                </div>




                                <div className="inner-content mb-2">
                                    <div className="row">
                                        <div className="accordion accordionPatientRaceSection" id="accordionExample">
                                            <div className="accordion-item position-relative">
                                                <h2 className="accordion-header otherinfo ">
                                                    <span className='collapsetxt'> {t("Contact")}</span>
                                                    <span
                                                        className="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#contactInfo"
                                                        aria-expanded="false"
                                                        aria-controls="contactInfo"
                                                    >
                                                    </span>
                                                </h2>
                                                <div
                                                    id="contactInfo"
                                                    className="accordion-collapse collapse show1"
                                                    data-bs-parent="#accordionExample"

                                                >
                                                    <div className="accordion-body">
                                                        <div className="dflex">
                                                            <ContactDetails onPatientDetailsChange={handlerChange} />



                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="inner-content mb-2">
                                    <div className="row">
                                        <div className="accordion accordionPatientRaceSection" id="accordionExample">
                                            <div className="accordion-item position-relative">
                                                <h2 className="accordion-header otherinfo ">
                                                    <span className='collapsetxt'> {t("Patient_Choices")}</span>
                                                    <span
                                                        className="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#choicesInfo"
                                                        aria-expanded="false"
                                                        aria-controls="contactInfo"
                                                    >
                                                    </span>
                                                </h2>
                                                <div
                                                    id="choicesInfo"
                                                    className="accordion-collapse collapse show1"
                                                    data-bs-parent="#accordionExample"

                                                >
                                                    <div className="accordion-body">
                                                        <div className="dflex">

                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlProvider" className="form-label"><img src={city} className='icnn' alt='' />{t("Provider")}</label>
                                                                <select className="form-select form-select-sm" id="ddlProvider" aria-label=".form-select-sm example" onChange={getSelectedCity}>
                                                                    <option value="0">{t("Select_Provider")}</option>
                                                                    {cityList && cityList.map((list) => {

                                                                        return (
                                                                            <option value={list.id}>{list.name}</option>
                                                                        )

                                                                    })}
                                                                </select>
                                                                <small id="errProvider" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtProvideSinceDate" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("ProvideSinceDate")}</label>
                                                                <input type="date" className="form-control form-control-sm" id="txtProvideSinceDate" placeholder={t("ENTER_Provide_Since_Date")} name='provideSinceDate' value={email} onChange={handlerChange} />
                                                            </div>

                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlReferring_Provider" className="form-label"><img src={city} className='icnn' alt='' />{t("Referring_Provider")}</label>
                                                                <select className="form-select form-select-sm" id="ddlReferring_Provider" aria-label=".form-select-sm example" onChange={getSelectedCity}>
                                                                    <option value="0">{t("Select_Referring_Provider")}</option>
                                                                    {cityList && cityList.map((list) => {

                                                                        return (
                                                                            <option value={list.id}>{list.name}</option>
                                                                        )

                                                                    })}
                                                                </select>
                                                                <small id="errReferring_Provider" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>

                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlPharmacy" className="form-label"><img src={city} className='icnn' alt='' />{t("Pharmacy")}</label>
                                                                <select className="form-select form-select-sm" id="ddlPharmacy" aria-label=".form-select-sm example" onChange={getSelectedCity}>
                                                                    <option value="0">{t("Select_Pharmacy")}</option>
                                                                    {cityList && cityList.map((list) => {

                                                                        return (
                                                                            <option value={list.id}>{list.name}</option>
                                                                        )

                                                                    })}
                                                                </select>
                                                                <small id="errPharmacy" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>

                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlHIPAA_Notice_Received" className="form-label"><img src={city} className='icnn' alt='' />{t("HIPAA_Notice_Received")}</label>
                                                                <select className="form-select form-select-sm" id="ddlHIPAA_Notice_Received" aria-label=".form-select-sm example" onChange={getSelectedCity}>
                                                                    <option value="0">{t("Select_HIPAA_Notice_Received")}</option>
                                                                    {cityList && cityList.map((list) => {

                                                                        return (
                                                                            <option value={list.id}>{list.name}</option>
                                                                        )

                                                                    })}
                                                                </select>
                                                                <small id="errHIPAA_Notice_Received" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>

                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlAllow_Voice_Message" className="form-label"><img src={city} className='icnn' alt='' />{t("Allow_Voice_Message")}</label>
                                                                <select className="form-select form-select-sm" id="ddlAllow_Voice_Message" aria-label=".form-select-sm example" onChange={getSelectedCity}>
                                                                    <option value="0">{t("Select_Allow_Voice_Message")}</option>
                                                                    {cityList && cityList.map((list) => {

                                                                        return (
                                                                            <option value={list.id}>{list.name}</option>
                                                                        )

                                                                    })}
                                                                </select>
                                                                <small id="errAllow_Voice_Message" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtLeaveMessageWith" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("LeaveMessageWith")}</label>
                                                                <input type="text" className="form-control form-control-sm" id="txtLeaveMessageWith" placeholder={t("ENTER_Leave_Message_With")} name='leaveMessageWith' value={email} onChange={handlerChange} />
                                                            </div>

                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlAllow_Mail_Message" className="form-label"><img src={city} className='icnn' alt='' />{t("Allow_Mail_Message")}</label>
                                                                <select className="form-select form-select-sm" id="ddlAllow_Mail_Message" aria-label=".form-select-sm example" onChange={getSelectedCity}>
                                                                    <option value="0">{t("Select_Allow_Mail_Message")}</option>
                                                                    {cityList && cityList.map((list) => {

                                                                        return (
                                                                            <option value={list.id}>{list.name}</option>
                                                                        )

                                                                    })}
                                                                </select>
                                                                <small id="errAllow_Mail_Message" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>

                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlAllow_SMS" className="form-label"><img src={city} className='icnn' alt='' />{t("Allow_SMS")}</label>
                                                                <select className="form-select form-select-sm" id="ddlAllow_SMS" aria-label=".form-select-sm example" onChange={getSelectedCity}>
                                                                    <option value="0">{t("Select_Allow_SMS")}</option>
                                                                    {cityList && cityList.map((list) => {

                                                                        return (
                                                                            <option value={list.id}>{list.name}</option>
                                                                        )

                                                                    })}
                                                                </select>
                                                                <small id="errAllow_SMS" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlAllow_Email" className="form-label"><img src={city} className='icnn' alt='' />{t("Allow_Email")}</label>
                                                                <select className="form-select form-select-sm" id="ddlAllow_Email" aria-label=".form-select-sm example" onChange={getSelectedCity}>
                                                                    <option value="0">{t("Select_Allow_Email")}</option>
                                                                    {cityList && cityList.map((list) => {

                                                                        return (
                                                                            <option value={list.id}>{list.name}</option>
                                                                        )

                                                                    })}
                                                                </select>
                                                                <small id="errAllow_Email" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlAllow_Immunization_Registry_Use" className="form-label"><img src={city} className='icnn' alt='' />{t("Allow_Immunization_Registry_Use")}</label>
                                                                <select className="form-select form-select-sm" id="ddlAllow_Immunization_Registry_Use" aria-label=".form-select-sm example" onChange={getSelectedCity}>
                                                                    <option value="0">{t("Select_Allow_Immunization_Registry_Use")}</option>
                                                                    {cityList && cityList.map((list) => {

                                                                        return (
                                                                            <option value={list.id}>{list.name}</option>
                                                                        )

                                                                    })}
                                                                </select>
                                                                <small id="errAllow_Immunization_Registry_Use" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlAllow_Immunization_Info_Sharing" className="form-label"><img src={city} className='icnn' alt='' />{t("Allow_Immunization_Info_Sharing")}</label>
                                                                <select className="form-select form-select-sm" id="ddlAllow_Immunization_Info_Sharing" aria-label=".form-select-sm example" onChange={getSelectedCity}>
                                                                    <option value="0">{t("Select_Allow_Immunization_Info_Sharing")}</option>
                                                                    {cityList && cityList.map((list) => {

                                                                        return (
                                                                            <option value={list.id}>{list.name}</option>
                                                                        )

                                                                    })}
                                                                </select>
                                                                <small id="errAllow_Immunization_Info_Sharing" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlAllow_Health_Information_Exchange" className="form-label"><img src={city} className='icnn' alt='' />{t("Allow_Health_Information_Exchange")}</label>
                                                                <select className="form-select form-select-sm" id="ddlAllow_Health_Information_Exchange" aria-label=".form-select-sm example" onChange={getSelectedCity}>
                                                                    <option value="0">{t("Select_Allow_Health_Information_Exchange")}</option>
                                                                    {cityList && cityList.map((list) => {

                                                                        return (
                                                                            <option value={list.id}>{list.name}</option>
                                                                        )

                                                                    })}
                                                                </select>
                                                                <small id="errAllow_Health_Information_Exchange" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlAllow_Patient_Portal" className="form-label"><img src={city} className='icnn' alt='' />{t("Allow_Patient_Portal")}</label>
                                                                <select className="form-select form-select-sm" id="ddlAllow_Patient_Portal" aria-label=".form-select-sm example" onChange={getSelectedCity}>
                                                                    <option value="0">{t("Select_Allow_Patient_Portal")}</option>
                                                                    {cityList && cityList.map((list) => {

                                                                        return (
                                                                            <option value={list.id}>{list.name}</option>
                                                                        )

                                                                    })}
                                                                </select>
                                                                <small id="errAllow_Patient_Portal" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtPreventAPIAccess" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("PreventAPIAccess")}</label>
                                                                <input type="checkbox" className="form-control form-control-sm" id="chkPreventAPIAccess" name='preventAPIAccess' />
                                                            </div>

                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtCMSPortalLogin" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("CMSPortalLogin")}</label>
                                                                <input type="text" className="form-control form-control-sm" id="txtCMSPortalLogin" placeholder={t("ENTER_CMS_Portal_Login")} name='cMSPortalLogin' value={email} onChange={handlerChange} />
                                                            </div>


                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlImmunization_Registry_Status" className="form-label"><img src={city} className='icnn' alt='' />{t("Immunization_Registry_Status")}</label>
                                                                <select className="form-select form-select-sm" id="ddlImmunization_Registry_Status" aria-label=".form-select-sm example" onChange={getSelectedCity}>
                                                                    <option value="0">{t("Select_Immunization_Registry_Status")}</option>
                                                                    {cityList && cityList.map((list) => {

                                                                        return (
                                                                            <option value={list.id}>{list.name}</option>
                                                                        )

                                                                    })}
                                                                </select>
                                                                <small id="errImmunization_Registry_Status" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>

                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtImmunizationRegistryStatusEffectiveDate" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("ImmunizationRegistryStatusEffectiveDate")}</label>
                                                                <input type="date" className="form-control form-control-sm" id="txtImmunizationRegistryStatusEffectiveDate" placeholder={t("ENTER_Immunization_Registry_Status_Effective_Date")} name='immunizationRegistryStatusEffectiveDate' value={email} onChange={handlerChange} />
                                                            </div>



                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlPublicity_Code" className="form-label"><img src={city} className='icnn' alt='' />{t("Publicity_Code")}</label>
                                                                <select className="form-select form-select-sm" id="ddlPublicity_Code" aria-label=".form-select-sm example" onChange={getSelectedCity}>
                                                                    <option value="0">{t("Select_Publicity_Code")}</option>
                                                                    {cityList && cityList.map((list) => {

                                                                        return (
                                                                            <option value={list.id}>{list.name}</option>
                                                                        )

                                                                    })}
                                                                </select>
                                                                <small id="errPublicity_Code" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtPublicityCodeEffectiveDate" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("PublicityCodeEffectiveDate")}</label>
                                                                <input type="date" className="form-control form-control-sm" id="txtPublicityCodeEffectiveDate" placeholder={t("ENTER_Publicity_Code_Effective_Date")} name='publicityCodeEffectiveDate' value={email} onChange={handlerChange} />
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlProtection_Indicator" className="form-label"><img src={city} className='icnn' alt='' />{t("Protection_Indicator")}</label>
                                                                <select className="form-select form-select-sm" id="ddlProtection_Indicator" aria-label=".form-select-sm example" onChange={getSelectedCity}>
                                                                    <option value="0">{t("Select_Protection_Indicator")}</option>
                                                                    {cityList && cityList.map((list) => {

                                                                        return (
                                                                            <option value={list.id}>{list.name}</option>
                                                                        )

                                                                    })}
                                                                </select>
                                                                <small id="errProtection_Indicator" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtProtectionIndicatorEffectiveDate" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("ProtectionIndicatorEffectiveDate")}</label>
                                                                <input type="date" className="form-control form-control-sm" id="txtProtectionIndicatorEffectiveDate" placeholder={t("ENTER_Protection_Indicator_Effective_Date")} name='protectionIndicatorEffectiveDate' value={email} onChange={handlerChange} />
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtCareTeamProvider" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("CareTeamProvider")}</label>
                                                                <input type="text" className="form-control form-control-sm" id="txtCareTeamProvider" placeholder={t("ENTER_Care_Team_Provider")} name='careTeamProvider' value={email} onChange={handlerChange} />
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlCare_Team_Status" className="form-label"><img src={city} className='icnn' alt='' />{t("Care_Team_Status")}</label>
                                                                <select className="form-select form-select-sm" id="ddlCare_Team_Status" aria-label=".form-select-sm example" onChange={getSelectedCity}>
                                                                    <option value="0">{t("Select_Care_Team_Status")}</option>
                                                                    {cityList && cityList.map((list) => {

                                                                        return (
                                                                            <option value={list.id}>{list.name}</option>
                                                                        )

                                                                    })}
                                                                </select>
                                                                <small id="errCare_Team_Status" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtCareTeamFacility" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("CareTeamFacility")}</label>
                                                                <input type="text" className="form-control form-control-sm" id="txtCareTeamFacility" placeholder={t("ENTER_Care_Team_Facility")} name='careTeamFacility' value={email} onChange={handlerChange} />
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlPatientCategories" className="form-label"><img src={city} className='icnn' alt='' />{t("PatientCategories")}</label>
                                                                <select className="form-select form-select-sm" id="ddlPatientCategories" aria-label=".form-select-sm example" onChange={getSelectedCity}>
                                                                    <option value="0">{t("Select_Patient_Categories")}</option>
                                                                    {cityList && cityList.map((list) => {

                                                                        return (
                                                                            <option value={list.id}>{list.name}</option>
                                                                        )

                                                                    })}
                                                                </select>
                                                                <small id="errPatientCategories" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>







                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>



                                <div className="inner-content mb-2">
                                    <div className="row">
                                        <div className="accordion accordionPatientRaceSection" id="accordionExample">
                                            <div className="accordion-item position-relative">
                                                <h2 className="accordion-header otherinfo ">
                                                    <span className='collapsetxt'> {t("Employer")}</span>
                                                    <span
                                                        className="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#employerInfo"
                                                        aria-expanded="false"
                                                        aria-controls="employerInfo"
                                                    >
                                                    </span>
                                                </h2>
                                                <div
                                                    id="employerInfo"
                                                    className="accordion-collapse collapse show1"
                                                    data-bs-parent="#accordionExample"

                                                >
                                                    <div className="accordion-body">
                                                        <div className="dflex">

                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtOccupation" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("Occupation")}</label>
                                                                <input type="text" className="form-control form-control-sm" id="txtOccupation" placeholder={t("ENTER_Occupation")} name='occupation' value={email} onChange={handlerChange} />
                                                            </div>


                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlIndustry" className="form-label"><img src={city} className='icnn' alt='' />{t("Industry")}</label>
                                                                <select className="form-select form-select-sm" id="ddlIndustry" aria-label=".form-select-sm example" onChange={getSelectedCity}>
                                                                    <option value="0">{t("Select_Industry")}</option>
                                                                    {cityList && cityList.map((list) => {

                                                                        return (
                                                                            <option value={list.id}>{list.name}</option>
                                                                        )

                                                                    })}
                                                                </select>
                                                                <small id="errIndustry" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>

                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtEmployerName" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("Employer_Name")}</label>
                                                                <input type="text" className="form-control form-control-sm" id="txtEmployerName" placeholder={t("ENTER_Employer_Name")} name='employerName' value={email} onChange={handlerChange} />
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtEmployerStreet" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("Employer_Street")}</label>
                                                                <input type="text" className="form-control form-control-sm" id="txtEmployerStreet" placeholder={t("ENTER_Employer_Street")} name='employerStreet' value={email} onChange={handlerChange} />
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtEmployerStreetLine2" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("Employer_Street_Line2")}</label>
                                                                <input type="text" className="form-control form-control-sm" id="txtEmployerStreetLine2" placeholder={t("ENTER_Employer_Street_Line2")} name='employerStreetLine2' value={email} onChange={handlerChange} />
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtEmployerCity" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("Employer_City")}</label>
                                                                <input type="text" className="form-control form-control-sm" id="txtEmployerCity" placeholder={t("ENTER_Employer_City")} name='employerCity' value={email} onChange={handlerChange} />
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlEmployerCountry" className="form-label"><img src={city} className='icnn' alt='' />{t("Employer_Country")}</label>
                                                                <select className="form-select form-select-sm" id="ddlEmployerCountry" aria-label=".form-select-sm example" onChange={getSelectedCity}>
                                                                    <option value="0">{t("Select_Employer_Country")}</option>
                                                                    {cityList && cityList.map((list) => {

                                                                        return (
                                                                            <option value={list.id}>{list.name}</option>
                                                                        )

                                                                    })}
                                                                </select>
                                                                <small id="errEmployerCountry" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlEmployerState" className="form-label"><img src={city} className='icnn' alt='' />{t("Employer_State")}</label>
                                                                <select className="form-select form-select-sm" id="ddlEmployerState" aria-label=".form-select-sm example" onChange={getSelectedCity}>
                                                                    <option value="0">{t("Select_Employer_State")}</option>
                                                                    {cityList && cityList.map((list) => {

                                                                        return (
                                                                            <option value={list.id}>{list.name}</option>
                                                                        )

                                                                    })}
                                                                </select>
                                                                <small id="errEmployerState" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtEmployerZip" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("Employer_Zip")}</label>
                                                                <input type="text" className="form-control form-control-sm" id="txtEmployerZip" placeholder={t("ENTER_Employer_Zip")} name='employerZip' value={email} onChange={handlerChange} />
                                                            </div>






                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="inner-content mb-2">
                                    <div className="row">
                                        <div className="accordion accordionPatientRaceSection" id="accordionExample">
                                            <div className="accordion-item position-relative">
                                                <h2 className="accordion-header otherinfo ">
                                                    <span className='collapsetxt'> {t("Stats")}</span>
                                                    <span
                                                        className="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#statsInfo"
                                                        aria-expanded="false"
                                                        aria-controls="statsInfo"
                                                    >
                                                    </span>
                                                </h2>
                                                <div
                                                    id="statsInfo"
                                                    className="accordion-collapse collapse show1"
                                                    data-bs-parent="#accordionExample"

                                                >
                                                    <div className="accordion-body">
                                                        <div className="dflex">

                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlEthnicity" className="form-label">{t("Ethnicity_Name")}</label>
                                                                <select className="form-select form-select-sm" id="ddlEthnicity" aria-label=".form-select-sm example" onChange={getSelectedEthinicity}>
                                                                    <option value="0">{t("Enter_Ethnicity_Name")}</option>
                                                                    {ethinicityList && ethinicityList.map((list) => {
                                                                        return (
                                                                            <option value={list.id}>{list.ethinicityName}</option>
                                                                        )
                                                                    })}


                                                                </select>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlPreferredLanguage" className="form-label">{t("Preferred_Language")}</label>
                                                                <select className="form-select form-select-sm" id="ddlPreferredLanguage" aria-label=".form-select-sm example" onChange={getSelectedLanguage}>
                                                                    <option value="0">{t("Select_Preferred_Language")}</option>
                                                                    {languageList && languageList.map((list) => {
                                                                        return (
                                                                            <option value={list.id}>{list.languageName}</option>
                                                                        )
                                                                    })}


                                                                </select>
                                                            </div>

                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlRaceType" className="form-label">{t("Race_Type")}</label>
                                                                <select className="form-select form-select-sm selectwid" id="ddlRaceType" aria-label=".form-select-sm example" onChange={getSelectRaceType}>
                                                                    <option value="0">{t("Select_Race_Type")}</option>
                                                                    {raceTypeList && raceTypeList.map((list) => {
                                                                        return (
                                                                            <option value={list.id}>{list.raceType}</option>
                                                                        )
                                                                    })}


                                                                </select>
                                                            </div>

                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtFamilySize" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("Family_Size")}</label>
                                                                <input type="text" className="form-control form-control-sm" id="txtFamilySize" placeholder={t("ENTER_Family_Size")} name='familySize' value={email} onChange={handlerChange} />
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtFinancialReviewDate" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("FinancialReviewDate")}</label>
                                                                <input type="date" className="form-control form-control-sm" id="txtFinancialReviewDate" placeholder={t("ENTER_Financial_Review_Date")} name='financialReviewDate' value={email} onChange={handlerChange} />
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtMonthlyIncome" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("Monthly_Income")}</label>
                                                                <input type="text" className="form-control form-control-sm" id="txtMonthlyIncome" placeholder={t("ENTER_Monthly_Income")} name='monthlyIncome' value={email} onChange={handlerChange} />
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtHomeless" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("Homeless")}</label>
                                                                <input type="text" className="form-control form-control-sm" id="txtHomeless" placeholder={t("ENTER_Homeless")} name='homeless' value={email} onChange={handlerChange} />
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtInterpreter" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("Interpreter")}</label>
                                                                <input type="text" className="form-control form-control-sm" id="txtInterpreter" placeholder={t("ENTER_Interpreter")} name='interpreter' value={email} onChange={handlerChange} />
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtMigrant" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("Migrant")}</label>
                                                                <input type="text" className="form-control form-control-sm" id="txtMigrant" placeholder={t("ENTER_Migrant")} name='migrant' value={email} onChange={handlerChange} />
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlReferralSource" className="form-label">{t("Referral_Source")}</label>
                                                                <select className="form-select form-select-sm selectwid" id="ddlReferralSource" aria-label=".form-select-sm example" onChange={getSelectRaceType}>
                                                                    <option value="0">{t("Select_Referral_Source")}</option>
                                                                    {raceTypeList && raceTypeList.map((list) => {
                                                                        return (
                                                                            <option value={list.id}>{list.raceType}</option>
                                                                        )
                                                                    })}


                                                                </select>
                                                            </div>

                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlVFC" className="form-label">{t("VFC")}</label>
                                                                <select className="form-select form-select-sm selectwid" id="ddlVFC" aria-label=".form-select-sm example" onChange={getSelectRaceType}>
                                                                    <option value="0">{t("Select_VFC")}</option>
                                                                    {raceTypeList && raceTypeList.map((list) => {
                                                                        return (
                                                                            <option value={list.id}>{list.raceType}</option>
                                                                        )
                                                                    })}


                                                                </select>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlReligion" className="form-label">{t("Religion")}</label>
                                                                <select className="form-select form-select-sm selectwid" id="ddlReligion" aria-label=".form-select-sm example" onChange={getSelectRaceType}>
                                                                    <option value="0">{t("Select_Religion")}</option>
                                                                    {raceTypeList && raceTypeList.map((list) => {
                                                                        return (
                                                                            <option value={list.id}>{list.raceType}</option>
                                                                        )
                                                                    })}


                                                                </select>
                                                            </div>




                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>










                                <div className="inner-content mb-2">
                                    <div className="row">
                                        <div className="accordion accordionPatientRaceSection" id="accordionExample">
                                            <div className="accordion-item position-relative">
                                                <h2 className="accordion-header otherinfo ">
                                                    <span className='collapsetxt'> {t("Other_Information")}</span>
                                                    <span
                                                        className="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapseOne"
                                                        aria-expanded="false"
                                                        aria-controls="collapseOne"
                                                    >
                                                        {/* {t("Other_Information")} */}
                                                    </span>
                                                </h2>
                                                <div
                                                    id="collapseOne"
                                                    className="accordion-collapse collapse show1"
                                                    data-bs-parent="#accordionExample"

                                                >
                                                    <div className="accordion-body">
                                                        <div className="dflex">




                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlIdentityType" className="form-label"><img src={identityIcon} className='icnn' alt='' />{t("Identity_Type")}</label>
                                                                <select className="form-select form-select-sm" id="ddlIdentityType" aria-label=".form-select-sm example" onChange={handlerdentity}>
                                                                    <option value="0">{t("Select_Identity_Type")}</option>
                                                                    <option value="1">{t("Passport_Number")}</option>
                                                                    <option value="2">{t("Insurance_Number")}</option>
                                                                    <option value="3">{t("Residential_Id")}</option>
                                                                    {/* {languageList && languageList.map((list) => {
                                                        return (
                                                            <option value={list.id}>{list.languageName}</option>
                                                        )
                                                    })} */}


                                                                </select>
                                                                <small id="errIdentityType" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtIdentityNo" className="form-label"><img src={identityIcon} className='icnn' alt='' />{t("Identity_Number")}</label>
                                                                <input type="text" className="form-control form-control-sm" id="txtIdentityNo" placeholder={t("Identity_Number")} name='IdentityNo' value={IdentityNo} onChange={handlerChange} />
                                                                <small id="errIdentityNo" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>



                                                            <div className="col-1 mb-2">
                                                                <div className='d-flex align-items-center gap-1 orrmob'>
                                                                    <div className="form-text or1" style={{ width: '25px' }}>OR</div>
                                                                    <div style={{ width: '100%' }}>
                                                                        <label htmlFor="txtAge" className="form-label"><img src={ageIcon} className='icnn' alt='' />{t("Age")}</label><sup style={{ color: "red" }}>*</sup>
                                                                        <input type="number" className="form-control form-control-sm" id="txtAge" placeholder={t("Enter_Age")} name='age' value={patientAge} onChange={getPatientDobByAge} />
                                                                        <small id="errPatientAge" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-1 mb-2">
                                                                <label htmlFor="ddlAgeUnit" className="form-label"><img src={ageIcon} className='icnn' alt='' />{t("Age_Unit")}</label><sup style={{ color: "red" }}>*</sup>
                                                                <select className="form-select form-select-sm" id="ddlAgeUnit" aria-label=".form-select-sm example" name='ddlAgeUnit' onChange={handlerChange}>
                                                                    <option value="1" selected>{t("Year")}</option>
                                                                    <option value="2">{t("Month")}</option>
                                                                    <option value="3">{t("Day")}</option>
                                                                </select>
                                                                <small id="errAgeUnit" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>



                                                            <div className="col-1 mb-2">
                                                                <label htmlFor="txtAge" className="form-label"><img src={ageIcon} className='icnn' alt='' />{t("Height(cm)")}</label>
                                                                {/* <sup style={{ color: "red" }}>*</sup> */}
                                                                <input type="number" className="form-control form-control-sm" id="patientHeight" placeholder={t("Height(cm)")} name='patientHeight' value={patientHeight} onChange={handlerChange} />
                                                                <small id="errPatientHeight" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>
                                                            <div className="col-1 mb-2">
                                                                <label htmlFor="txtAge" className="form-label"><img src={ageIcon} className='icnn' alt='' />{t("Weight(kg)")}</label>
                                                                {/* <sup style={{ color: "red" }}>*</sup> */}
                                                                <input type="number" className="form-control form-control-sm" id="patientWeight" placeholder={t("Enter_Weight")} name='patientWeight' value={patientWeight} onChange={handlerChange} />
                                                                <small id="errPatientWeight" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlBloodGroup" className="form-label"><img src={ageIcon} className='icnn' alt='' />{t("Blood_Group")}</label>
                                                                <select className="form-select form-select-sm" id="ddlBloodGroup" aria-label=".form-select-sm example" onChange={getSelectedLanguage}>
                                                                    <option value="0">{t("Selet_Blood_Group")}</option>
                                                                    <option value="1">A+</option>
                                                                    <option value="2">A-</option>
                                                                    <option value="3">B+</option>
                                                                    <option value="4">B-</option>
                                                                    <option value="5">O+</option>
                                                                    <option value="6">O-</option>
                                                                    <option value="7">AB+</option>
                                                                    <option value="8">AB-</option>

                                                                    {/* {languageList && languageList.map((list) => {
                                                        return (
                                                            <option value={list.id}>{list.languageName}</option>
                                                        )
                                                    })} */}
                                                                    {/* <small id="errBloodGrpup" className="form-text text-danger" style={{ display: 'none' }}></small> */}
                                                                </select>
                                                            </div>
                                                            {/* <div className="row"> */}

                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtAddress" className="form-label"><img src={addressIcon} className='icnn' alt='' />{t("Address")}</label><sup style={{ color: "red" }}>*</sup>
                                                                <input type="text" className="form-control form-control-sm" id="txtAddress" placeholder={t("Enter_Address")} name='address' value={patientAddress} onChange={handlerChange} />
                                                                <small id="errPatientAddress" className="form-text text-danger" style={{ display: 'none' }}>
                                                                </small>
                                                            </div>



                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="inner-content mb-2">
                                    <div className="row">
                                        <div className="accordion accordionPatientRaceSection" id="accordionExample">
                                            <div className="accordion-item position-relative">
                                                <h2 className="accordion-header otherinfo ">
                                                    <span className='collapsetxt'> {t("Other_Information")}</span>
                                                    <span
                                                        className="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapseOne"
                                                        aria-expanded="false"
                                                        aria-controls="collapseOne"
                                                    >
                                                        {/* {t("Other_Information")} */}
                                                    </span>
                                                </h2>
                                                <div
                                                    id="collapseOne"
                                                    className="accordion-collapse collapse show1"
                                                    data-bs-parent="#accordionExample"

                                                >
                                                    <div className="accordion-body">
                                                        <div className="dflex">


                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddddlMaritalStatuslGender" className="form-label"><img src={ageIcon} className='icnn' />{t("Marital_Status")}</label>
                                                                <select className="form-select form-select-sm" id="ddlMaritalStatus" aria-label=".form-select-sm example" onChange={getSelectedMaritalSttaus}>
                                                                    <option value="0">{t("Select_Marital_Status")}</option>
                                                                    {maritalStatusList && maritalStatusList.map((list) => {
                                                                        return (
                                                                            <option value={list.id}>{list.name}</option>
                                                                        )
                                                                    })}


                                                                </select>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlsexualOrientation" className="form-label"><img src={ageIcon} className='icnn' />{t("Sexual_Orientation")}</label>
                                                                <select className="form-select form-select-sm" id="ddlsexualOrientation" aria-label=".form-select-sm example">
                                                                    <option value="0">{t("Select_Sexual_Orientation")}</option>
                                                                    <option value="Straight or Heterosexual">Straight or Heterosexual</option>
                                                                    <option value="Gay, Lesbian or Homosexual">Gay, Lesbian or Homosexual</option>
                                                                    <option value="Bisexual">Bisexual</option>
                                                                    <option value="Pansexual">Pansexual</option>
                                                                    <option value="Queer">Queer</option>
                                                                    <option value="Asexual">Asexual</option>
                                                                    <option value="Twospirit">Two-spirit</option>
                                                                    <option value="Questioning/not sure">Questioning/not sure</option>
                                                                    <option value="Choose not to disclose">Choose not to disclose</option>
                                                                    <option value="Questioning/not sure">Questioning/not sure</option>
                                                                    <option value="Transgender">Transgender </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="fieldsett-in">
                                    <div class="fieldsett">
                                        <span class="fieldse">{t("Guardian_Details")}</span>
                                        {/* <Heading text={t("Guardian_Details")} /> */}
                                        <div className="inner-content">
                                            <div className="dflex">
                                                <div className="col-2">
                                                    <label htmlFor="txtGuardianName" className="form-label"><img src={ageIcon} className='icnn' />{t("NAME")}</label>
                                                    <input type="Name" className="form-control form-control-sm" id="txtGuardianName" placeholder={t("Name")} name='guardianName' value={guardianName} onChange={handlerChange} />
                                                </div>
                                                <div className="col-2 mb-2">
                                                    <label htmlFor="txtPatientRelationship" className="form-label"><img src={IconPatientRelation} className='icnn' />{t("Select_Relation_Relationship_To_Patient")}</label>
                                                    {/* <input type="text" className="form-control form-control-sm" id="txtRelationshipToPatient" placeholder="Enter Relationship" name='guardianRelationToPatient' value={guardianRelationToPatient} onChange={handlerChange} /> */}
                                                    <select className="form-select form-select-sm" id="ddlRelationToPat" aria-label=".form-select-sm example" onChange={getRelationToPat} >
                                                        <option value="0">{t("Select_Relation")}</option>
                                                        <option value="1">Father</option>
                                                        <option value="2">Mother</option>
                                                        <option value="3">Brother</option>
                                                        <option value="4">Son</option>
                                                        <option value="5">Daughter</option>
                                                        <option value="6">Sister</option>
                                                        <option value="7">Spouse</option>
                                                        <option value="8">Other</option>
                                                    </select>


                                                </div>
                                                <div className="col-2 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><img src={addressIcon} className='icnn' />{t("Address")}</label>
                                                    <input type="text" className="form-control form-control-sm" id="txtPatientRelationAddress" placeholder={t("Enter_Address")} name='guardianAddress' value={guardianAddress} onChange={handlerChange} />
                                                </div>
                                                <div className="col-2 mb-2">
                                                    <label htmlFor="txtPatientRelationMobNo" className="form-label"><img src={smartphone} className='icnn' />{t("MOBILE_NUMBER")}</label>
                                                    <input type="number" className="form-control form-control-sm" id="txtPatientRelationMobNo" placeholder={t("Mobile_Number")} name='guardianMobileNo' value={guardianMobileNo} onChange={handlerChange} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="inner-content mb-2">
                                    <div className="row">
                                        <div class="accordion accordionPatientRaceSection" id="accordionPaymentType">
                                            <div class="accordion-item position-relative">
                                                <h2 class="accordion-header otherinfo">
                                                    <span className='collapsetxt'> {t("Payment_Type")}</span>
                                                    <span
                                                        class="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapseTwo"
                                                        aria-expanded="false"
                                                        aria-controls="collapseTwo"
                                                    >
                                                        {/* {t("Payment_Type")} */}
                                                    </span>
                                                </h2>
                                                <div
                                                    id="collapseTwo"
                                                    class="accordion-collapse collapse show1"
                                                    data-bs-parent="#accordionPaymentType"

                                                >
                                                    <div class="accordion-body">
                                                        <div className="dflex">
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlPaymentType" className="form-label"> {t("Payment_Type")}</label>
                                                                <select className="form-select form-select-sm" id="ddlPaymentType" aria-label=".form-select-sm example" onChange={handlePaymentChange}>
                                                                    <option value="0">{t("Select_Payment_Type")}</option>
                                                                    <option value="1">{t("Cash")}</option>
                                                                    <option value="2">{t("Insurance")}</option>
                                                                </select>
                                                            </div>
                                                            {paymentType === 1 ?
                                                                <>
                                                                    <div className="col-2 mb-2">
                                                                        <label htmlFor="txtCashPayment" className="form-label">&nbsp;</label>
                                                                        <input type="number" className='registrationinput ps-2' id="txtCashPayment" name='cashpayment' placeholder='Enter Payment' value={cashpayment} onChange={handlerChange} />
                                                                    </div>
                                                                </>
                                                                : ''}

                                                            {paymentType === 2 ?
                                                                <>
                                                                    <div className="col-2 mb-2">
                                                                        <label htmlFor="ddlInsuranceCompany" className="form-label">{t("Insurance_Company")}</label>
                                                                        <select value={insuranceCompany} name="insuranceCompany" className="form-select form-select-sm" id="ddlInsuranceCompany" aria-label=".form-select-sm example" onChange={handlerChange} >
                                                                            <option value="0">Select Insurance Company</option>
                                                                            {InsuranceCompanyList && InsuranceCompanyList.map((data, index) => {
                                                                                return (
                                                                                    <option key={index} value={data.id}>{data.companyname}</option>
                                                                                )
                                                                            })}
                                                                        </select>
                                                                    </div>
                                                                </>
                                                                : ''}


                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className="inner-content mb-2">
                                    <div className="row">
                                        <div className="accordion accordionPatientRaceSection" id="accordionInsurance">
                                            <div className="accordion-item position-relative">
                                                <h2 className="accordion-header otherinfo ">
                                                    <span className='collapsetxt'> {t("Insurance")}</span>
                                                    <span
                                                        className="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#InsuranceInfo"
                                                        aria-expanded="false"
                                                        aria-controls="InsuranceInfo"
                                                    >
                                                    </span>
                                                </h2>
                                                <div
                                                    id="InsuranceInfo"
                                                    className="accordion-collapse collapse show1"
                                                    data-bs-parent="#accordionInsurance"
                                                >
                                                    <div className="accordion-body">
                                                        <div className="dflex">
                                                            <InsuranceDetails  />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div class="fieldsett-in">
                                    <div class="fieldsett">
                                        <span class="fieldse">{t("Appointment_Details")}</span>
                                        {/* <Heading text={t("Appointment_Details")} /> */}
                                        <div className="inner-content">

                                            <div className="dflex row1">
                                                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-2">
                                                    <label htmlFor="ddlDepartment" className="form-label"><img src={medicalAssistance} className='icnn' />{t("Department")}</label><sup style={{ color: "red" }}>*</sup>
                                                    <select className="form-select form-select-sm selectwid_" id="ddlDepartment" onChange={() => { getDdlListByDeptID(1) }} aria-label=".form-select-sm example">
                                                        <option value="0">{t("Select_Department")}</option>
                                                        {deparetmentList && deparetmentList.map((list, ind) => {
                                                            if (list.categoryId === 1) {
                                                                return (
                                                                    <option value={list.id}>{list.departmentName}</option>
                                                                )
                                                            }

                                                        })}

                                                    </select>
                                                    <small id="errDepartment" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                {/* <div className="col-2 mb-2">
                                                        <label htmlFor="ddlWard" className="form-label">Ward</label><sup style={{ color: "red" }}>*</sup>
                                                        <select className="form-select form-select-sm" id="ddlWard" name='ward' onChange={getSelectedWard} aria-label=".form-select-sm example">
                                                            <option value="0">Select Ward</option>
                                                            {wardList && wardList.map((list) => {
                                                                return (
                                                                    <option value={list.wardId}>{list.wardName}</option>
                                                                )
                                                            })}
                                                        </select>
                                                        <small id="errWard" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                    </div> */}

                                                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-2">
                                                    <label htmlFor="ddlDoctor" className="form-label"><img src={medicalAssistance} className='icnn' />{t("Doctor/Consultant")}</label><sup style={{ color: "red" }}>*</sup>
                                                    <select className="form-select form-select-sm" id="ddlDoctor" name='doctor' onChange={getSelectedDoctor} aria-label=".form-select-sm example">
                                                        <option value="0">{t("selectDoctor")}</option>
                                                        {doctorList && doctorList.map((list) => {
                                                            return (
                                                                <option value={list.id}>{list.titleName !== null ? list.titleName + ' ' + list.name : list.name}</option>
                                                            )
                                                        })
                                                        }

                                                    </select>
                                                    <small id="errDoctor" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-2">
                                                    <label htmlFor="ddlRoomNo" className="form-label"><img src={roomIcon} className='icnn' />{t("Room_Number")}</label><sup style={{ color: "red" }}>*</sup>
                                                    <select className="form-select form-select-sm" id="ddlRoomNo" onChange={getSelectedRoom} aria-label=".form-select-sm example">
                                                        <option value="0">{t("Select_Room")}</option>
                                                        {roomList && roomList.map((list, ind) => {
                                                            return (
                                                                <option value={list.id} >{list.roomNumber}</option>
                                                            )
                                                        })}

                                                    </select>
                                                    <small id="errRoom" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-2">
                                                    <label htmlFor="txtConsultantFee" className="form-label">{t("Consultant_Fee")}</label>
                                                    <input type="text" disabled className="form-control form-control-sm" id="txtConsultantFee" placeholder={t("Consultant_Fee")} name='consultantFee' value={consultantFee} style={{ width: '100px' }} />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>


                            </div>

                            <div className='row'>
                                <div class="col-12 mt-2">
                                    <div class="med-box commong">
                                        <div className="col-xl-12 col-lg-12 col-md-12 buttonpadding">
                                            <div className='d-flex justify-content-end'>
                                                {/* {isEdit === false ?<> <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handleRedirect}>Print Health card</button>
                                                <button type="button" className="btn btn-save btn-sm mb-1 me-1" id='btnSave' onClick={save}>Save & Print</button></>:''}
                                            {isEdit === true ? <button type="button" className="btn btn-save btn-sm mb-1 me-1" id='btnUpdate' onClick={handleUpdate}>Update</button> :''}
                                            {showEdit === true ? <button type="button" className="btn btn-save btn-sm mb-1 me-1" id='btnEdit' onClick={handleEdit}>Edit</button> :''}
                                                <button type="button" className="btn btn-clear btn-sm mb-1 me-1" id='btnClear' onClick={clear}>Clear</button> */}

                                                {showUnderProcess === 1 ? <><TosterUnderProcess />  </> :
                                                    showUpdateToster === 1 ? <Toster value={tosterValue} message={tosterMessage} />
                                                        :
                                                        <div>
                                                            {isEdit === false ? <>
                                                                {/* <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={handlePrintHealthCard}><img src={printIcon} className='icnn' />Print Health Card</button> */}
                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm  me-1" id='btnSave' onClick={save}><img src={saveButtonIcon} className='icnn' />{t("Save_Print")}</button></> : ''}
                                                            {isEdit === true ? <button type="button" className="btn btn-save btn-save-fill btn-sm  me-1" id='btnUpdate' onClick={handleUpdate}><img src={saveButtonIcon} className='icnn' />{t("UPDATE")}</button> : ''}
                                                            {showEdit === true ? <button type="button" className="btn btn-save btnbluehover btn-sm  me-1" id='btnEdit' onClick={handleEdit}><img src={clearIcon} className='icnn' />{t("Edit")}</button> : ''}
                                                            <button type="button" className="btn btn-save btnbluehover btn-sm  me-1" id='btnClear' onClick={clear}><img src={clearIcon} className='icnn' />{t("Clear")}</button>

                                                        </div>
                                                }
                                                {/* <button type="button" className="btn btn-save btn-sm mb-1 me-1" onClick={prinData}>Last Print<i className="fa-solid fa-print ms-1" style={{ color: '#002F75', cursor: 'pointer' }} ></i></button>
                                                <span className=''><strong> Last UHID No. : {lastUhid != "" ? lastUhid : ""}</strong> </span> */}
                                            </div>

                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                {
                    showToster === 1 ?
                        <SuccessToster handle={setShowToster} message="Data Save SuccessFully !!" /> : ""
                }

                {
                    showAlertToster === 1 ?
                        <AlertToster handle={setShowAlertToster} message={showMessage} /> : ""
                }
            </section>


            {/* ######################## Moodal Pop Area For Add Privious Names #################### */}
            {showPreviousNamesPopUp == true ?
                <div className={`modal d-${showPreviousNamesPopUp == true ? "block" : ""}`} id="modalSetting" data-bs-backdrop="static">
                    <div className="modal-dialog" style={{ maxWidth: '60vw' }}>
                        <div className="modal-content p-0">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">Patient List On This Mobile No.</h1>
                                <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title='Close Window' onClick={() => { setShowPreviousNamesPopUp(false) }}><i className="bi bi-x-octagon"></i></button>
                            </div>
                            <div className="modal-body p-0">
                                <div className="dflex">
                                    <div className="col-2 mb-2">
                                        <label htmlFor="txtPreviousNamePrefix" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("PreviousNamePrefix")}</label>
                                        <input type="text" className="form-control form-control-sm" id="txtPreviousNamePrefix" placeholder={t("ENTER_Previous_Name_Prefix")} name='previousNamePrefix' />
                                    </div>
                                    <div className="col-2 mb-2">
                                        <label htmlFor="txtPreviousNameFirst" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("PreviousNameFirst")}</label>
                                        <input type="text" className="form-control form-control-sm" id="txtPreviousNameFirst" placeholder={t("ENTER_Previous_Name_First")} name='previousNameFirst' />
                                    </div>
                                    <div className="col-2 mb-2">
                                        <label htmlFor="txtPreviousNameMiddle" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("PreviousNameMiddle")}</label>
                                        <input type="text" className="form-control form-control-sm" id="txtPreviousNameMiddle" placeholder={t("ENTER_Previous_Name_Middle")} name='previousNameMiddle' />
                                    </div>
                                    <div className="col-2 mb-2">
                                        <label htmlFor="txtPreviousNameLast" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("PreviousNameLast")}</label>
                                        <input type="text" className="form-control form-control-sm" id="txtPreviousNameLast" placeholder={t("ENTER_Previous_Name_Last")} name='previousNameLast' />
                                    </div>
                                    <div className="col-2 mb-2">
                                        <label htmlFor="txtPreviousNameSuffix" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("PreviousNameSuffix")}</label>
                                        <input type="text" className="form-control form-control-sm" id="txtPreviousNameSuffix" placeholder={t("ENTER_Previous_Name_Suffix")} name='previousNameSuffix' />
                                    </div>
                                    <div className="col-2 mb-2">
                                        <label htmlFor="txtPreviousNameEndDate" className="form-label"><img src={emailIcon} className='icnn' alt='' />{t("PreviousNameEndDate")}</label>
                                        <input type="date" className="form-control form-control-sm" id="txtPreviousNameEndDate" placeholder={t("ENTER_Previous_Name_End_Date")} name='previousNameEndDate' />
                                    </div>
                                    <div className="col-2 mb-2">  <button type="button" className="btn btn-save btn-save-fill btn-sm  me-1" id='btnSave' onClick={savePriviousName}><img src={saveButtonIcon} className='icnn' />{t("Save")}</button></div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div> : ""}

            {/* ######################## Moodal Pop Area #################### */}
            {showPatientHistory === 1 ?
                <div className={`modal d-${showPatientHistory === 1 ? "block" : ""}`} id="modalSetting" data-bs-backdrop="static">
                    <div className="modal-dialog" style={{ maxWidth: '65vw' }}>
                        <div className="modal-content p-0">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">Patient List On This Mobile No.</h1>
                                <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title='Close Window' onClick={() => { setShowPatientHistory(0) }}><i className="bi bi-x-octagon"></i></button>
                            </div>
                            <div className="modal-body p-0">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="med-box">
                                            <div className="med-table-section" style={{ height: '30rem' }}>
                                                <table className='med-table border_ striped'>
                                                    <thead>
                                                        <tr>
                                                            <th>#</th>
                                                            <th>{t("Uhid")}</th>
                                                            <th>{t("Patient_nm")}</th>
                                                            <th className='text-center'>{t("Age/Gender")}</th>
                                                            <th>{t("MOBILE_NUMBER")}</th>
                                                            <th>{t("Guardian_Nm")}</th>
                                                            <th>{t("Department")}</th>
                                                            <th>{t("Address")}</th>
                                                            <th>{t("Visit_Date")}</th>
                                                            <th className='text-center'>{t("Select_Profile")}</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody>

                                                        {patientListByMobileNo && patientListByMobileNo.map((list, index) => {
                                                            return (
                                                                <tr>
                                                                    <td>{index + 1}</td>
                                                                    <td>{list.uhID}</td>
                                                                    <td>{list.patientName}</td>
                                                                    <td className='text-center'>{list.age}<span>{parseInt(list.ageUnitId) === 1 ? 'Y' : parseInt(list.ageUnitId) === 2 ? 'M' : parseInt(list.ageUnitId) === 3 ? 'D' : ''}</span>/{list.patientGender}</td>
                                                                    <td>{list.mobileNo}</td>
                                                                    <td>{list.guardianName}</td>
                                                                    <td>{list.departmentName}</td>
                                                                    <td>{list.address}</td>
                                                                    <td>{list.registrationDate}</td>
                                                                    <td className='text-center'><i class="fa-regular fa-circle-check" title='Select Patient Profile' onClick={() => { getPatientRegHistory(list, 0); setShowPatientHistory(0) }} style={{ fontSize: '1rem', cursor: 'pointer' }} ariaHidden="true" ></i>
                                                                        {/* <i class="fa fa-arrow-up" title='Select Patient Profile' onClick={() => { getPatientRegHistory(list) ;setShowPatientHistory(0) }} style={{ fontSize: '1.5rem', color: 'red', cursor: 'pointer' }} ariaHidden="true" data-dismiss="modal"></i> */}
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

                            </div>
                        </div>
                    </div>
                </div> : ""}
            {/* ######################## Print Admit Card Confirmation Popup#################### */}
            {showPrintHealthCardConfirmation === 1 ?
                <div className={`modal d-${showPrintHealthCardConfirmation === 1 ? "block" : ""}`} id="modalSetting" data-bs-backdrop="static">
                    <div className="modal-dialog modalDelete">
                        <div className="modal-content">
                            <div className="modal-body modelbdy text-center">
                                <div className='popDeleteIcon'><i className="fa-solid fa-print"></i></div>
                                {/* <div className='popDeleteTitle mt-3'> Admit Card?</div> */}
                                <div className='popDeleteContent'>{t("Do_you_want_to_print_health_card")}</div>
                            </div>
                            <div className="modal-footer1 text-center">
                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal" onClick={() => { setShowPrintHealthCardConfirmation(0) }}>{t("No")}</button>
                                <button type="button" className="btn-delete popBtnDelete" onClick={handlePrintHealthCard} data-bs-dismiss="modal">{t("Yes")}.</button>
                            </div>
                        </div>
                    </div>
                </div> : ""}

        </>
    )
}
