import React, { useEffect, useState } from 'react'
import Heading from '../../../Component/Heading'
import GetStateList from '../../API/GET/GetStateList'
import GetCityList from '../../API/GET/GetCityList';
import GetDepartmentList from '../../API/GET/GetDepartmentList';
import GetRoomList from '../../API/GET/GetRoomList';
import ValidationOPDRegistration from '../../../Validation/OPD/OpdRegistration'
import GetMaritalStatusList from '../../API/GET/GetMaritalStatusList';
import GetDoctorList from '../../API/GET/GetDoctorList';
import OPDPatientRegistration from '../../API/POST/OPDPatientRegistration';
import GetWardList from '../../API/GET/GetWardList';
import SuccessToster from '../../../Component/SuccessToster';
import AlertToster from '../../../Component/AlertToster';
import GetRaceType from '../../API/GET/GetRaceType';
import GetEthinicity from '../../API/GET/GetEthinicity';
import GetLanguage from '../../API/GET/GetLanguage';
import GetGender from '../../API/GET/GetGender';
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
import RegisAdmit from '../../API/POST/RegisAdmit';
import GetAllBedAssignByWardId from '../../../Admin/Api/Master/WardMasterAPI/GetAllBedAssignByWardId';
import ValidationRegistrationandadmit from '../../../Validation/OPD/ValidationRegistrationandadmit';

export default function PatientRegistrationAndAdmit() {
    let [stateList, setStateList] = useState([]);
    let [cityList, setCityList] = useState([]);
    let [deparetmentList, setDepartmentList] = useState([]);
    let [roomList, setRoomList] = useState([]);
    let [doctorList, setDoctorList] = useState([]);
    let [wardList, setWardList] = useState([]);
    let [maritalStatusList, setmMaritalStatusList] = useState([]);
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
    let [selectedBed, setSelectedBed] = useState('0');
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
    let [bloodGroup, setBloodGroup] = useState("0")
    let [IdentityNo, setIdentityNo] = useState("")
    let [consultantFee, setConsultantFee] = useState("")
    let [patientHeight, setPatientHeight] = useState('')
    let [patientWeight, setPatientWeight] = useState('');
    let [patientListByMobileNo, setPatientListByMobileNo] = useState([]);
    let [isRevisitPatient, setisRevisitPatient] = useState(0);
    let [uhid, setUhid] = useState('');
    let [showPatientHistory, setShowPatientHistory] = useState(0);
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
    let [bedList, setBedList] = useState([])

    let [userID, setUserID] = useState(JSON.parse(sessionStorage.getItem("LoginData")).userId);


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

    let getbedListByWard = async (id) => {
        let resp = await GetAllBedAssignByWardId(id)
        setBedList(resp.responseValue)

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
    let getSelectedBloodGroup = () => {
        const bloodGroup = document.getElementById('ddlBloodGroup').value;
        setBloodGroup(bloodGroup);
    }
    let getRelationToPat = () => {
        const relationToPat = document.getElementById('ddlRelationToPat').value;
        setGuardianRelationToPatient(relationToPat);
    }
    let getSelectedWard = () => {
        document.getElementById("errWard").style.display = "none";
        const ward = document.getElementById('ddlWard').value;
        getbedListByWard(ward)
        setSelectedWard(ward);

    }

    let getSelectedBed =()=>{
        document.getElementById("errBed").style.display = "none";
        const ward = document.getElementById('ddlBed').value;
        // getbedListByWard(ward)
        setSelectedBed(ward);
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
        if (e.target.value > 0) {
            document.getElementById("errPatientDob").style.display = "none"
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
        // document.getElementById('ddlIdentityType').value = list.idTypeId;
        document.getElementById('ddlBloodGroup').value = list.bloodGroupId;
        document.getElementById('ddlAgeUnit').value = list.ageUnitId;
        // document.getElementById('ddlRelationToPat').value = list.guardianRelationId === null ? 0 :list.guardianRelationId ;
        document.getElementById('ddlGender').value = list.genderId;
        // document.getElementById('ddlMaritalStatus').value = list.maritalStatusId=== null ?0:list.maritalStatusId;
        // document.getElementById('ddlPreferredLanguage').value = list.languageId=== null ?0:list.languageId;
        // document.getElementById('ddlEthnicity').value = list.ethinicityId === null ? 0 : list.ethinicityId;
        // document.getElementById('ddlRaceType').value = list.raceTypeId === null ? 0 : list.raceTypeId;
        // document.getElementById('ddlsexualOrientation').value = list.sexualOrientation == null ? 0:list.sexualOrientation;
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
            document.getElementById("ddlDepartment").disabled = false;
            document.getElementById("ddlDoctor").disabled = false;
        }
    }
    let disabledFields = () => {
        //Used To Disabled Filed
        document.getElementById("txtMobileNo").disabled = true;
        // document.getElementById("ddlIdentityType").disabled = true;
        // document.getElementById("txtIdentityNo").disabled = true;
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
        // document.getElementById("ddlRaceType").disabled = true;
        // document.getElementById("ddlEthnicity").disabled = true;
        // document.getElementById("ddlPreferredLanguage").disabled = true;
        // document.getElementById("ddlMaritalStatus").disabled = true;
        // document.getElementById("txtGuardianName").disabled = true;
        // document.getElementById("txtPatientRelationAddress").disabled = true;
        // document.getElementById("txtPatientRelationMobNo").disabled = true;
        // document.getElementById("ddlRelationToPat").disabled = true;
        // document.getElementById("ddlsexualOrientation").disabled = true;
        document.getElementById("ddlCountryCode").disabled = true;
    }
    let clearDisabledFields = () => {
        //Used To Disabled Filed
        document.getElementById("txtMobileNo").disabled = false;
        // document.getElementById("ddlIdentityType").disabled = false;
        // document.getElementById("txtIdentityNo").disabled = false;
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
        // document.getElementById("ddlRaceType").disabled = false;
        // document.getElementById("ddlEthnicity").disabled = false;
        // document.getElementById("ddlPreferredLanguage").disabled = false;
        // document.getElementById("ddlMaritalStatus").disabled = false;
        // document.getElementById("txtGuardianName").disabled = false;
        // document.getElementById("txtPatientRelationAddress").disabled = false;
        // document.getElementById("txtPatientRelationMobNo").disabled = false;
        // document.getElementById("ddlRelationToPat").disabled = false;
        // document.getElementById("ddlsexualOrientation").disabled = false;
        document.getElementById("ddlCountryCode").disabled = false;
        // document.getElementById("ddlRoomNo").disabled = false;
        document.getElementById("ddlDepartment").disabled = false;
        document.getElementById("ddlDoctor").disabled = false;
    }
    let save = async () => {
        //Patient Visit
        if (uhid === "" || uhid === null) {
            //Used To Get Country Code
            var getDdlList = document.getElementById('ddlCountryCode');
            var getSelectedIndex = getDdlList.selectedIndex
            const getCountryCode = getDdlList.options[getSelectedIndex].text;
            // const identityType = document.getElementById('ddlIdentityType').value;
            // const bloodGroup = document.getElementById('ddlBloodGroup').value;
            const ageUnit = document.getElementById('ddlAgeUnit').value;
            // const roomNo = document.getElementById('ddlRoomNo').value;
            const state = document.getElementById('ddlState').value;
            const city = document.getElementById('ddlCity').value;
            // const sexualOrientation = document.getElementById('ddlsexualOrientation').value;
            const res = ValidationRegistrationandadmit(patientMobileNo, patientName, patientAddress, state, city, dob, patientAge, patientGender, patientHeight, patientWeight, selectedDept, selectedDoctor, selectedWard, selectedBed);
            var id = res[1];
            console.log('id', id)
            // const clientID = JSON.parse(sessionStorage.getItem("LoginData")).clientId;
            if (res === true) {
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
                    wardID: selectedWard,
                    bedId: selectedBed,
                    raceTypeId: raceType,
                    ethinicityId: ethinicity,
                    // languageId: language,
                    // idTypeId: parseInt(identityType),
                    // idNumber: IdentityNo,
                    ageUnitId: ageUnit,
                    height: patientHeight,
                    weight: patientWeight,
                    bloodGroupId: bloodGroup,
                    zip: zipCode,
                    guardianAddress: guardianAddress,
                    guardianMobileNo: guardianMobileNo,
                    // roomId: roomNo,
                    guardianRelationId: guardianRelationToPatient,
                    clientId: window.clientId
                    // sexualOrientation:sexualOrientation
                }
                // console.log("csdcs", dataObj)
                // window.open("/opdPrint/", 'noopener,noreferrer');
                // return
                let data = await RegisAdmit(dataObj);
                if (data.status === 1) {
                    setShowToster(1)
                    window.sessionStorage.setItem("PrintOpdData", JSON.stringify(data.responseValue[0]));
                    window.sessionStorage.setItem("PrintOpdDataConsultantFee", consultantFee);
                    window.open("/opdPrint/", 'noopener,noreferrer');
                    setLastUhid(data.responseValue[0].uhID);
                    setShowPrintHealthCardConfirmation(1);
                    clear();

                }
                else {
                    setShowAlertToster(1)
                    setShowMessage(data.responseValue)
                }
            }
            else {
                document.getElementById(id).style.display = "block";
                document.getElementById(id).innerHTML = res[0];

            }
        }
        else {
            // const roomID= document.getElementById('ddlRoomNo').value;
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
            // else if (roomID === "0" || roomID == undefined) {
            //     document.getElementById('errRoom').style.display = "block";
            //     document.getElementById('errRoom').innerHTML = "Select Room";
            // }
            else if (selectedWard === "0" || selectedWard == undefined) {
                document.getElementById('errWard').style.display = "block";
                document.getElementById('errWard').innerHTML = "Select Ward";
            }
            else {
                let response = await PatientRevisit(selectedDept, selectedDoctor, userID, uhid, 0);
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
        setBedList([]);
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
        // document.getElementById('ddlRoomNo').value = 0;
        document.getElementById('ddlDoctor').value = 0;
        document.getElementById('ddlBloodGroup').value = 0;
        // document.getElementById('ddlIdentityType').value = '0';
        document.getElementById('ddlGender').value = '0';
        document.getElementById('ddlDepartment').value = '0';
        document.getElementById('ddlBloodGroup').value = '0';
        document.getElementById('txtEmailAddress').value = '0';
        // document.getElementById('ddlRaceType').value = '0';
        // document.getElementById('ddlEthnicity').value = '0';
        // document.getElementById('ddlPreferredLanguage').value = '0';
        // document.getElementById('ddlMaritalStatus').value = '0';
        // document.getElementById('ddlRelationToPat').value = '0';
        document.getElementById("ddlAgeUnit").value = "1";
        // document.getElementById("ddlsexualOrientation").value = "0";
        //  document.getElementById("ddlPaymentType").value = "0";
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
        // document.getElementById("errRoom").style.display = "none";
        document.getElementById("errPatientHeight").style.display = "none";
        document.getElementById("errPatientWeight").style.display = "none";
        document.getElementById("errPatientGender").style.display = "none";
        // document.getElementById("errIdentityNo").style.display = "none";
        // document.getElementById("errIdentityType").style.display = "none";
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
        // document.getElementById("ddlIdentityType").disabled = false;
        // document.getElementById("txtIdentityNo").disabled = false;
        document.getElementById("patientHeight").disabled = false;
        document.getElementById("patientWeight").disabled = false;
        document.getElementById("ddlBloodGroup").disabled = false;
        document.getElementById("txtEmailAddress").disabled = false;
        document.getElementById("txtAddress").disabled = false;
        document.getElementById("ddlState").disabled = false;
        document.getElementById("ddlCity").disabled = false;
        document.getElementById("txtZip").disabled = false;
        // document.getElementById("ddlRaceType").disabled = false;
        // document.getElementById("ddlEthnicity").disabled = false;
        // document.getElementById("ddlPreferredLanguage").disabled = false;
        // document.getElementById("ddlMaritalStatus").disabled = false;
        // document.getElementById("txtGuardianName").disabled = false;
        // document.getElementById("txtPatientRelationAddress").disabled = false;
        // document.getElementById("txtPatientRelationMobNo").disabled = false;
        // document.getElementById("ddlRelationToPat").disabled = false;
        // document.getElementById("ddlsexualOrientation").disabled = false;
        document.getElementById("ddlAgeUnit").disabled = false;
        document.getElementById("txtAge").disabled = false;
        document.getElementById("txtDob").disabled = false;
        document.getElementById("txtPatientName").disabled = false;
        document.getElementById("ddlGender").disabled = false;
        // document.getElementById("ddlRoomNo").disabled = true;
        document.getElementById("ddlDepartment").disabled = true;
        document.getElementById("ddlDoctor").disabled = true;

    }
    let handleUpdate = async () => {

        // const identityType = document.getElementById('ddlIdentityType').value;
        // const bloodGroup = document.getElementById('ddlBloodGroup').value;
        const state = document.getElementById('ddlState').value;
        const city = document.getElementById('ddlCity').value;
        //' const sexualOrientation = document.getElementById('ddlsexualOrientation').value;
        const ageUnit = document.getElementById('ddlAgeUnit').value;
        const gender = document.getElementById('ddlGender').value;
        const res = ValidationOPDRegistration('1234567899', patientName, patientAddress, state, city, dob, patientAge, gender, patientHeight, patientWeight, '1', '1', '1');
        var id = res[1];
        if (res === true) {
            setShowUnderProcess(1);
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
                // languageId: language == "" ? null :language,
                // idTypeId: identityType == "" ? null : parseInt(identityType),
                // idNumber: IdentityNo,
                height: patientHeight,
                weight: patientWeight,
                bloodGroupId: bloodGroup,
                zip: zipCode,
                guardianAddress: guardianAddress,
                guardianMobileNo: guardianMobileNo,
                guardianRelationId: guardianRelationToPatient == "" ? null : guardianRelationToPatient,
                // sexualOrientation:sexualOrientation,
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
            setPaymentType(1)
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
        getLanguageIdList();
        getEthinicityIdList();
        getGenderData();
        let UHID = window.sessionStorage.getItem("PrintOpdData") ? JSON.parse(window.sessionStorage.getItem("PrintOpdData")).uhID : ""
        setLastUhid(UHID);
        getConsultantFee(countryID)



    }, []);
    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row ">
                        <div className="col-12">
                            <div className="med-box" style={{ border: 'transparent' }}>
                                <Heading text="Patient Details" />
                                <div className="inner-content">
                                    <div className="dflex_ regEqualColums">
                                        <div className="col-2_ mb-2">
                                            <label htmlFor="txtMobileNo" className="form-label">
                                                <img src={smartphone} className='icnn' />
                                                Mobile Number</label><sup style={{ color: "red" }}>*</sup>
                                            <div className='lft'>
                                                <select className="form-select form-select-sm" id='ddlCountryCode' aria-label=".form-select-sm example" onChange={handleGetStateByCountry} style={{ borderRight: 'transparent', borderTopRightRadius: '0px', borderBottomRightRadius: '0px', width: '80px' }}>
                                                    {/* <option value='0'>+91</option> */}
                                                    {countryList && countryList.map((list, index) => {
                                                        if (list.id === countryID) {
                                                            return (<option value={list.id} selected>{list.countryCode}</option>)
                                                        }
                                                        else {
                                                            return (
                                                                <option value={list.id}>{list.countryCode}</option>
                                                            )

                                                        }

                                                    })}
                                                </select>
                                                <input type="number" className="form-control form-control-sm" id="txtMobileNo" placeholder="Enter Mobile Number" name='mobileNumber' value={patientMobileNo} onChange={handlerChange} style={{ borderLeft: 'transparent', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }} />
                                            </div>
                                            {/* <button type="button" className="btn btn-outline-danger btn-sm" data-bs-toggle="modal" data-bs-target="#modalSetting"><i className="bi bi-gear-fill"></i></button> */}

                                            <small id="errMobile" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        {/* <div className="col-2_ mb-2">
                                            <label htmlFor="ddlIdentityType" className="form-label"><img src={identityIcon} className='icnn' />Identity Type</label>
                                            <select className="form-select form-select-sm" id="ddlIdentityType" aria-label=".form-select-sm example" onChange={handlerdentity}>
                                                <option value="0">Select Identity Type</option>
                                                <option value="1">Passport Number</option>
                                                <option value="2">Insurance Number</option>
                                                <option value="3">Residential Id</option>
                                                

                                            </select>  
                                            <small id="errIdentityType" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                        <div className="col-2_ mb-2">
                                            <label htmlFor="txtIdentityNo" className="form-label"><img src={identityIcon} className='icnn' />Identity No</label>
                                            <input type="text" className="form-control form-control-sm" id="txtIdentityNo" placeholder="Enter Identity Number" name='IdentityNo' value={IdentityNo} onChange={handlerChange} />
                                            <small id="errIdentityNo" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div> */}
                                        <div className="col-2_ mb-2">
                                            <label htmlFor="txtPatientName" className="form-label"><img src={patientOPD} className='icnn' />Patient Full Name</label><sup style={{ color: "red" }}>*</sup>
                                            <input type="text" className="form-control form-control-sm" id="txtPatientName" placeholder="Enter User Name" name='patientName' value={patientName} onChange={handlerChange} />
                                            <small id="errPatientName" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="col-2_ mb-2 relative">
                                            <label htmlFor="txtDob" className="form-label"><img src={calendar} className='icnn' />Date of Birth</label><sup style={{ color: "red" }}>*</sup>
                                            <input type="date" className="form-control form-control-sm" id="txtDob" name='dob' value={dob} onChange={getPatientAge} />
                                            <small id="errPatientDob" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                        {/* <div className="col-2_ mb-2 relative">
                                          <div className="form-text or1">OR</div>
                                        </div> */}
                                        <div className="col-1_ mb-2">
                                            <div className='d-flex align-items-center gap-1'>
                                                <div className="form-text or1" style={{ width: '25px' }}>OR</div>
                                                <div style={{ width: '100%' }}>
                                                    <label htmlFor="txtAge" className="form-label"><img src={ageIcon} className='icnn' />Age</label><sup style={{ color: "red" }}>*</sup>
                                                    <input type="number" className="form-control form-control-sm" id="txtAge" placeholder="Enter Age" name='age' value={patientAge} onChange={getPatientDobByAge} />
                                                    <small id="errPatientAge" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-1_ mb-2">
                                            <label htmlFor="ddlAgeUnit" className="form-label"><img src={ageIcon} className='icnn' />Age Unit</label><sup style={{ color: "red" }}>*</sup>
                                            <select className="form-select form-select-sm" id="ddlAgeUnit" aria-label=".form-select-sm example" name='ddlAgeUnit' onChange={handlerChange}>
                                                <option value="1" selected>Year</option>
                                                <option value="2">Month</option>
                                                <option value="3">Day</option>
                                            </select>
                                            <small id="errAgeUnit" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                        <div className="col-2_ mb-2">
                                            <label htmlFor="ddlGender" className="form-label"><img src={genderIcon} className='icnn' />Gender</label><sup style={{ color: "red" }}>*</sup>
                                            <select className="form-select form-select-sm" id="ddlGender" aria-label=".form-select-sm example" onChange={getSelectedGender}>
                                                <option value="0">Select Gender</option>

                                                {getPatientGender && getPatientGender.map((val, ind) => {
                                                    return (

                                                        <option value={val.id}>{val.name}</option>
                                                    )
                                                })}

                                            </select>
                                            <small id="errPatientGender" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                        <div className="col-1_ mb-2">
                                            <label htmlFor="txtAge" className="form-label"><img src={ageIcon} className='icnn' />Height(cm)</label>
                                            {/* <sup style={{ color: "red" }}>*</sup> */}
                                            <input type="number" className="form-control form-control-sm" id="patientHeight" placeholder="Height" name='patientHeight' value={patientHeight} onChange={handlerChange} />
                                            <small id="errPatientHeight" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                        <div className="col-1_ mb-2">
                                            <label htmlFor="txtAge" className="form-label"><img src={ageIcon} className='icnn' />Weight(kg)</label>
                                            {/* <sup style={{ color: "red" }}>*</sup> */}
                                            <input type="number" className="form-control form-control-sm" id="patientWeight" placeholder="Weight" name='patientWeight' value={patientWeight} onChange={handlerChange} />
                                            <small id="errPatientWeight" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                        <div className="col-2_ mb-2">
                                            <label htmlFor="ddlBloodGroup" className="form-label"><img src={ageIcon} className='icnn' />Blood Group</label>
                                            <select className="form-select form-select-sm" id="ddlBloodGroup" aria-label=".form-select-sm example" onChange={getSelectedBloodGroup}>
                                                <option value="0">Select Blood Group</option>
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
                                        <div className="col-2_ mb-2">
                                            <label htmlFor="txtEmailAddress" className="form-label"><img src={emailIcon} className='icnn' />Email Address</label>
                                            <input type="email" className="form-control form-control-sm" id="txtEmailAddress" placeholder="Enter Email Address" name='email' value={email} onChange={handlerChange} />
                                        </div>
                                        <div className="col-2_ mb-2">
                                            <label htmlFor="txtAddress" className="form-label"><img src={addressIcon} className='icnn' />Address</label><sup style={{ color: "red" }}>*</sup>
                                            <input type="text" className="form-control form-control-sm" id="txtAddress" placeholder="Enter Address" name='address' value={patientAddress} onChange={handlerChange} />
                                            <small id="errPatientAddress" className="form-text text-danger" style={{ display: 'none' }}>
                                            </small>
                                        </div>
                                        <div className="col-2_ mb-2">
                                            <label htmlFor="ddlState" className="form-label"><img src={stateIcon} className='icnn' />State</label><sup style={{ color: "red" }}>*</sup>
                                            <select className="form-select form-select-sm" id="ddlState" aria-label=".form-select-sm example" name='state' onChange={() => { getCityListByState(1) }}>
                                                <option value="0">Select State</option>
                                                {stateList && stateList.map((list, index) => {
                                                    {/* if (list.id === 38) {
                                                            return (
                                                                <option value={list.id} selected>{list.stateName}</option>

                                                            )

                                                        }
                                                        else { */}
                                                    return (
                                                        <option value={list.id}>{list.stateName}</option>
                                                    )
                                                    {/* } */ }
                                                })}

                                            </select>
                                            <small id="errState" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                        <div className="col-2_ mb-2">
                                            <label htmlFor="ddlCity" className="form-label"><img src={city} className='icnn' />City</label><sup style={{ color: "red" }}>*</sup>
                                            <select className="form-select form-select-sm" id="ddlCity" aria-label=".form-select-sm example" onChange={getSelectedCity}>
                                                <option value="0">Select City</option>
                                                {cityList && cityList.map((list) => {
                                                    {/* if (list.id === 4933) {
                                                            return (
                                                                <option value={list.id} selected>{list.name}</option>
                                                            )
                                                        }
                                                        else { */}
                                                    return (
                                                        <option value={list.id}>{list.name}</option>
                                                    )
                                                    {/* } */ }

                                                })}
                                            </select>
                                            <small id="errCity" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                        <div className="col-2_ mb-2">
                                            <label htmlFor="txtZip" className="form-label"><img src={zipCodeIcon} className='icnn' />Zipcode</label>
                                            <input type="number" className="form-control form-control-sm" id="txtZip" placeholder="Enter Zip" name='zip' value={zipCode} onChange={handlerChange} />
                                            <small id="errZip" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                        {/* </div> */}



                                        {/* <div className="col-2 mb-2">
                                            <label htmlFor="txtUHID" className="form-label">UHID</label>
                                            <input type="number" className="form-control form-control-sm" id="txtUHID" placeholder="Enter UHID If Exists" name='UHID' value={patientUHID} onChange={handlerChange} />
                                        </div>
                                        <div className="col-2 mb-2">
                                            <label htmlFor="txtDob" className="form-label">PatientID</label>
                                            <input type="number" className="form-control form-control-sm" id="txtPatientID" placeholder="Enter Patient ID" name='PatientID' value={PatientID} onChange={handlerChange} />
                                        </div> */}

                                        {/* <div className="col-2 mb-2">
                                            <label htmlFor="ddddlMaritalStatuslGender" className="form-label"><img src={userOPD} className='icnn'/>Patient Type</label>
                                            <select className="form-select form-select-sm" id="ddlMaritalStatus" aria-label=".form-select-sm example" onChange={getSelectedLanguage}>
                                                <option value="0">Select Patient Type</option>
                                                {languageList && languageList.map((list) => {
                                                    return (
                                                        <option value={list.id}>{list.languageName}</option>
                                                    )
                                                })}


                                            </select>
                                        </div> */}



                                    </div>
                                </div>

                                {/* <div className="inner-content mb-2">
                                    <div className="row">
                                        <div className="accordion accordionPatientRaceSection" id="accordionExample">
                                            <div className="accordion-item">
                                                <h2 className="accordion-header otherinfo ">
                                                    <button
                                                        className="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#collapseOne"
                                                        aria-expanded="false"
                                                        aria-controls="collapseOne"
                                                    >
                                                        Other Information
                                                    </button>
                                                </h2>
                                                <div
                                                    id="collapseOne"
                                                    className="accordion-collapse collapse show"
                                                    data-bs-parent="#accordionExample"

                                                >
                                                    <div className="accordion-body">
                                                        <div className="dflex">
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddddlMaritalStatuslGender" className="form-label">Race Type </label>
                                                                <select className="form-select form-select-sm selectwid" id="ddlRaceType" aria-label=".form-select-sm example" onChange={getSelectRaceType}>
                                                                    <option value="0">Select Race Type</option>
                                                                    {raceTypeList && raceTypeList.map((list) => {
                                                                        return (
                                                                            <option value={list.id}>{list.raceType}</option>
                                                                        )
                                                                    })}


                                                                </select>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddddlMaritalStatuslGender" className="form-label">Ethnicity</label>
                                                                <select className="form-select form-select-sm" id="ddlEthnicity" aria-label=".form-select-sm example" onChange={getSelectedEthinicity}>
                                                                    <option value="0">Select Ethnicity</option>
                                                                    {ethinicityList && ethinicityList.map((list) => {
                                                                        return (
                                                                            <option value={list.id}>{list.ethinicityName}</option>
                                                                        )
                                                                    })}


                                                                </select>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddddlMaritalStatuslGender" className="form-label">Preferred Language</label>
                                                                <select className="form-select form-select-sm" id="ddlPreferredLanguage" aria-label=".form-select-sm example" onChange={getSelectedLanguage}>
                                                                    <option value="0">Select Preferred Language</option>
                                                                    {languageList && languageList.map((list) => {
                                                                        return (
                                                                            <option value={list.id}>{list.languageName}</option>
                                                                        )
                                                                    })}


                                                                </select>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddddlMaritalStatuslGender" className="form-label"><img src={ageIcon} className='icnn' />Marital Status</label>
                                                                <select className="form-select form-select-sm" id="ddlMaritalStatus" aria-label=".form-select-sm example" onChange={getSelectedMaritalSttaus}>
                                                                    <option value="0">Select Marital Status</option>
                                                                    {maritalStatusList && maritalStatusList.map((list) => {
                                                                        return (
                                                                            <option value={list.id}>{list.name}</option>
                                                                        )
                                                                    })}


                                                                </select>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlsexualOrientation" className="form-label"><img src={ageIcon} className='icnn' />Sexual Orientation</label>
                                                                <select className="form-select form-select-sm" id="ddlsexualOrientation" aria-label=".form-select-sm example">
                                                                    <option value="0">Select Sexual Orientation</option>
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
                                </div> */}


                                {/* <Heading text="Guardian Details" />
                                <div className="inner-content">
                                    <div className="dflex">
                                        <div className="col-2">
                                            <label htmlFor="txtGuardianName" className="form-label"><img src={ageIcon} className='icnn' />Name</label>
                                            <input type="Name" className="form-control form-control-sm" id="txtGuardianName" placeholder="Enter Name" name='guardianName' value={guardianName} onChange={handlerChange} />
                                        </div>
                                        <div className="col-2 mb-2">
                                            <label htmlFor="txtPatientRelationship" className="form-label"><img src={IconPatientRelation} className='icnn' />Relationship To Patient</label>
                                            <select className="form-select form-select-sm" id="ddlRelationToPat" aria-label=".form-select-sm example" onChange={getRelationToPat} >
                                                <option value="0">Select Relation</option>
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
                                            <label htmlFor="txtPatientRelationAddress" className="form-label"><img src={addressIcon} className='icnn' />Address</label>
                                            <input type="text" className="form-control form-control-sm" id="txtPatientRelationAddress" placeholder="Enter Address" name='guardianAddress' value={guardianAddress} onChange={handlerChange} />
                                        </div>
                                        <div className="col-2 mb-2">
                                            <label htmlFor="txtPatientRelationMobNo" className="form-label"><img src={smartphone} className='icnn' />Mobile Number</label>
                                            <input type="number" className="form-control form-control-sm" id="txtPatientRelationMobNo" placeholder="Enter Mobile Number" name='guardianMobileNo' value={guardianMobileNo} onChange={handlerChange} />
                                        </div>
                                    </div>
                                </div> */}



                                <Heading text="Appointment Details" />
                                <div className="inner-content">
                                    {/* <div className="d-flex flex-wrap align-content-end">
                                        <div className="mb-2 me-2">

                                        </div>
                                        <div className="mb-2 me-2">

                                        </div>
                                        <div className="mb-2 me-2">

                                        </div>
                                        <div className="mb-2 me-2">

                                        </div>
                                        <div className="mb-2">

                                        </div>
                                    </div> */}
                                    <div className="dflex_ row">
                                        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-2">
                                            <label htmlFor="ddlDepartment" className="form-label"><img src={medicalAssistance} className='icnn' />Department</label><sup style={{ color: "red" }}>*</sup>
                                            <select className="form-select form-select-sm selectwid_" id="ddlDepartment" onChange={() => { getDdlListByDeptID(1) }} aria-label=".form-select-sm example">
                                                <option value="0">Select Department</option>
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
                                        <div className="col-2 mb-2">
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
                                        </div>

                                        <div className="col-2 mb-2">
                                            <label htmlFor="ddlBed" className="form-label">Bed</label><sup style={{ color: "red" }}>*</sup>
                                            <select className="form-select form-select-sm" id="ddlBed" name='bed' onChange={getSelectedBed} aria-label=".form-select-sm example">
                                                <option value="0">Select Bed</option>
                                                {bedList && bedList.map((list) => {
                                                    return (
                                                        <option value={list.bedId}>{list.bedName}</option>
                                                    )
                                                })}
                                            </select>
                                            <small id="errBed" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>


                                        <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-2">
                                            <label htmlFor="ddlDoctor" className="form-label"><img src={medicalAssistance} className='icnn' />Doctor/Consultant</label><sup style={{ color: "red" }}>*</sup>
                                            <select className="form-select form-select-sm" id="ddlDoctor" name='doctor' onChange={getSelectedDoctor} aria-label=".form-select-sm example">
                                                <option value="0">Select Doctor</option>
                                                {doctorList && doctorList.map((list) => {
                                                    return (
                                                        <option value={list.id}>{list.titleName !== null ? list.titleName + ' ' + list.name : list.name}</option>
                                                    )
                                                })
                                                }

                                            </select>
                                            <small id="errDoctor" className="form-text text-danger" style={{ display: 'none' }}></small>
                                        </div>
                                        {/* <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-2">
                                                <label htmlFor="ddlRoomNo" className="form-label"><img src={roomIcon} className='icnn' />Room No</label><sup style={{ color: "red" }}>*</sup>
                                                <select className="form-select form-select-sm" id="ddlRoomNo" onChange={getSelectedRoom} aria-label=".form-select-sm example">
                                                    <option value="0">Select Room</option>
                                                    {roomList && roomList.map((list, ind) => {
                                                        return (
                                                            <option value={list.id} >{list.roomNumber}</option>
                                                        )
                                                    })}

                                                </select>
                                                <small id="errRoom" className="form-text text-danger" style={{ display: 'none' }}></small>
                                            </div> */}
                                        {/* <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-2">
                                                <label htmlFor="txtConsultantFee" className="form-label">Consultant Fee</label>
                                                <input type="text" disabled className="form-control form-control-sm" id="txtConsultantFee" placeholder="Consultant Fee" name='consultantFee' value={consultantFee}/>
                                            </div> */}
                                        <div className="col-xl-4 col-lg-12 col-md-8 mb-2">
                                            <label htmlFor="exampleFormControlInput1" className="form-label">&nbsp;</label>
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
                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" id='btnSave' onClick={save}><img src={saveButtonIcon} className='icnn' />Save & Print</button></> : ''}
                                                            {isEdit === true ? <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" id='btnUpdate' onClick={handleUpdate}><img src={saveButtonIcon} className='icnn' />Update</button> : ''}
                                                            {showEdit === true ? <button type="button" className="btn btn-save btnbluehover btn-sm mb-1 me-1" id='btnEdit' onClick={handleEdit}><img src={clearIcon} className='icnn' /> Edit</button> : ''}
                                                            <button type="button" className="btn btn-save btnbluehover btn-sm mb-1 me-1" id='btnClear' onClick={clear}><img src={clearIcon} className='icnn' />Clear</button>

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
                                                            <th>UHID</th>
                                                            <th>Patient Name</th>
                                                            <th className='text-center'>Age/Gender</th>
                                                            <th>Mobile Number</th>
                                                            <th>Department</th>
                                                            <th>Address</th>
                                                            <th>Visit Date</th>
                                                            <th className='text-center'>Select Profile</th>
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
                                <div className='popDeleteContent'> Do you want to print health card..?</div>
                            </div>
                            <div className="modal-footer1 text-center">
                                <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal" onClick={() => { setShowPrintHealthCardConfirmation(0) }}>No</button>
                                <button type="button" className="btn-delete popBtnDelete" onClick={handlePrintHealthCard} data-bs-dismiss="modal">Yes.</button>
                            </div>
                        </div>
                    </div>
                </div> : ""}

        </>
    )
}
