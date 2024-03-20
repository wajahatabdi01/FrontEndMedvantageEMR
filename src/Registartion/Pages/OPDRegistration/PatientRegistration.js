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
import InsuranceDetails from './Components/InsuranceDetails';
import PattientChoices from './Components/PattientChoices';

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
import GetAllSexualOrientation from '../../API/GET/GetAllSexualOrientation';
import GetAllIndustryData from '../../API/GET/GetAllIndustryData';
import GetAllReligionData from '../../API/GET/GetAllReligionData';
import InsertPatientDemographicData from '../../API/POST/InsertPatientDemographicData';
import GetAllGuardianRelation from '../../API/GET/GetAllGuardianRelation';
import GetUserListByRoleId from '../../API/GET/GetUserListByRoleId';
import GetAllReferralSourceData from '../../API/GET/GetAllReferralSourceData';
import VisitDetails from './Components/VisitDetails';


export default function PatientRegistration() {
    let [stateList, setStateList] = useState([]);
    let [cityList, setCityList] = useState([]);
    let [deparetmentList, setDepartmentList] = useState([]);
    let [providerList, setProviderList] = useState([]);
    let [roomList, setRoomList] = useState([]);
    let [doctorList, setDoctorList] = useState([]);
    let [wardList, setWardList] = useState([]);
    let [industryList, setIndustryList] = useState([]);
    let [religionList, setReligionList] = useState([]);
    let [maritalStatusList, setmMaritalStatusList] = useState([]);
    let [priviousNameList, setPriviousNameList] = useState([]);
    let [patientMobileNo, setPatientMobileNo] = useState('');
    let [patientName, setPatientName] = useState('');
    let [patientHomeMobNo, setPatientHomeMobNo] = useState('');
    let [email, setEmail] = useState('');
    let [occupation, setOccupation] = useState('');
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
    let [genderList, setGenderList] = useState([]);
    let [PatientID, setPatientID] = useState('');
    let [patientUHID, setPatientUHID] = useState('');
    let [matarialStatus, setMatarialStatus] = useState('0');
    let [employmentStatus, setEmploymentStatus] = useState('0');
    let [showToster, setShowToster] = useState(0)
    let [showAlertToster, setShowAlertToster] = useState(0)
    let [showMessage, setShowMessage] = useState(0)
    let [lastUhid, setLastUhid] = useState('');
    let [raceTypeList, setRaceTypeList] = useState([])
    let [referralList, setReferralList] = useState([])
    let [ethinicityList, setEthinicityList] = useState([])
    let [languageList, setLanguageList] = useState([])
    let [sexualOrientationlist, setSexualOrientationlist] = useState([]);
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
    let [guardianRelationList, setGuardianRelationList] = useState([]);
    // Insurance Company Lists
    let [CardNo, setCardNo] = useState('');
    let [insuranceCompany, setinsuranceCompany] = useState(0);
    let [InsuranceCompanyList, setInsuranceCompanyList] = useState([]);
    // const [registrationObj, setRegistrationObj] = useState();
    const [previousNamesJsonString, setPreviousNamesJsonString] = useState();
    const [additionalAddressJsonString, setAdditionalAddressJsonString] = useState();
    // const [employerDetailsJsonString, setEmployerDetailsJsonString] = useState();
    const [insuranceDetailsJsonString, setInsuranceDetailsJsonString] = useState();
    const [insuranceDetailsPrimary, setInsuranceDetailsPrimary] = useState();
    const [insuranceDetailsSecondry, setInsuranceDetailsSecondry] = useState();
    const [insuranceDetailsTertiary, setInsuranceDetailsTertiary] = useState();
    const [contactDetails, setContactDetails] = useState();
    const [visitDetails, setVisitDetails] = useState();
    const [issueDetails, setIssueDetails] = useState(
        {
            Problem: {
                titleId: '',
                title: '',
                coding: '',
                beginDateTime: '',
                endDateTime: '',
                classificationTypeId: '0',
                occurrenceId: '0',
                verificationStatusId: '0',
                referredby: '',
                comments: '',
                outcomeId: '0',
                destination: ''
            },

            Allergy: {
                titleId: '',
                title: '',
                coding: '',
                beginDateTime: '',
                endDateTime: '',
                classificationTypeId: '0',
                occurrenceId: '0',
                verificationStatusId: '0',
                referredby: '',
                comments: '',
                outcomeId: '0',
                destination: '',
                reactionId: '',
                severityId: '',
                allergyType: '',
                allergyTypeId: '',
            },

            Medication: {
                titleId: '',
                title: '',
                coding: '',
                beginDateTime: '',
                endDateTime: '',
                classificationTypeId: '0',
                occurrenceId: '0',
                verificationStatusId: '0',
                referredby: '',
                comments: '',
                outcomeId: '0',
                destination: ''
            },
            Device: {
                title: '',
                coding: '',
                beginDateTime: '',
                endDateTime: '',
                classificationTypeId: '0',
                occurrenceId: '0',
                verificationStatusId: '0',
                referredby: '',
                comments: '',
                outcomeId: '0',
                destination: ''
            },
            Surgery: {
                titleId: '',
                title: '',
                coding: '',
                beginDateTime: '',
                endDateTime: '',
                classificationTypeId: '0',
                occurrenceId: '0',
                verificationStatusId: '0',
                referredby: '',
                comments: '',
                outcomeId: '0',
                destination: ''
            },
            Dental: {
                title: '',
                coding: '',
                beginDateTime: '',
                endDateTime: '',
                classificationTypeId: '0',
                occurrenceId: '0',
                verificationStatusId: '0',
                referredby: '',
                comments: '',
                outcomeId: '0',
                destination: ''
            },
        }

    );
    const [patientChoiceDetails, setPatientChoiceDetails] = useState();
    const [patientDetails, setPatientDetails] = useState();
    const [statsJsonString, setStatsJsonString] = useState({
        ethinicityId: '',
        languageId: '',
        raceId: '',
        familySize: '',
        financialReviewDate: '',
        monthlyIncome: '',
        homeless: '',
        interpreter: '',
        migrant: '',
        referralSourceId: '',
        isVFCEligible: '',
        religionId: '',
    });
    let [clearStatus, setClearStatus] = useState(0)
    const [sendFormPatientDetails, setSendFormPatientDetails] = useState({
        street: '',
        streetLine2: '',
        zipCode: '',
        motherName: '',
        emergencyContact: '',
        emergencyPhone: '',
        homePhone: '',
        workPhone: '',
        mobileNumber: '',
        email: '',
        emailDirect: '',
        additionalAddressess: [],
        country: '0',
        state: '0',
        city: '',
    });
    const [employerDetailsJsonString, setEmployerDetailsJsonString] = useState({
        occupation: '',
        industryId: '',
        employerName: '',
        address: '',
        addressLine2: '',
        city: '',
        countryId: '0',
        stateId: '0',
        postalCode: '',
    });
    const [registrationObj, setRegistrationObj] = useState({
        deceasedDate: '',
        deceasedReason: '',
        guardiansName: '',
        guardianrelationship: '',
        genderId: '',
        guardianAddress: '',
        guardianMobileNo: '',
        guardianworkphone: '',
        guardianemail: ''
    });
    const handleChangePatientDetails = (e) => {
        const { name, value } = e.target;
        setSendFormPatientDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    //   

    // let Content = JSON.parse(window.sessionStorage.getItem("departmentmenu")).content;
   

    //changes done by wajahat
    // let langId = JSON.parse(window.sessionStorage.getItem("languageId")).languageId;
   

    // Insurance Company List

    const GetInsuranceList = async () => {
        let InsuranceList = await GetInsuranceCompanyList()
        if (InsuranceList.status === 1) {
            setInsuranceCompanyList(InsuranceList.responseValue)
        }
    }
    const GetGenderList = async () => {
        let response = await GetGender()
        if (response.status === 1) {
            setGenderList(response.responseValue)
        }
    }
    const getreferralList = async () => {
        let response = await GetAllReferralSourceData()
        if (response.status === 1) {
            setReferralList(response.responseValue)
        }
    }
    const getGuardianRelationList = async () => {
        const response = await GetAllGuardianRelation()
        if (response.status === 1) {
            setGuardianRelationList(response.responseValue)
        }
    }


    let getIndustryList = async () => {
        const response = await GetAllIndustryData();
        if (response.status === 1) {
            setIndustryList(response.responseValue);
        }
    }
    let getRelgionList = async () => {
        const response = await GetAllReligionData();
        if (response.status === 1) {
            setReligionList(response.responseValue);
        }
    }
    let getAllSexualOrientation = async () => {
        const response = await GetAllSexualOrientation();
        if (response.status === 1) {
            setSexualOrientationlist(response.responseValue);
        }
    }
    let handlerChange2 = (e, value) => {
        const isValidInput = (input) => {
            // Trim input to remove leading and trailing spaces
            const trimmedInput = input.trim();

            // Check if input starts with a space
            if (input !== trimmedInput && input.startsWith(' ')) {
                return false; // Input starts with a space
            }

            // Check if trimmed input contains only alphanumeric characters and spaces in between
            const isValid = /^[a-zA-Z0-9@]*$/.test(trimmedInput);

            return isValid || trimmedInput === '';
        };

        const isValidInputDate = (input) => /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(input);

        if (e === "deceasedDate") {
            if (!isValidInputDate(value)) {
                return;
            }
        } else {
            if (!isValidInput(value)) {
                return;
            }
        }

        if (e === "guardianemail") {
            // Allow any input for the email field, including "@"
            setRegistrationObj((prevPatientDetails) => ({
                ...prevPatientDetails,
                [e]: value,
            }));
        } else {
            setRegistrationObj((prevPatientDetails) => ({
                ...prevPatientDetails,
                [e]: value,
            }));
        }
    }



    let handleemployerDetails = (e, value) => {
        const isValidInput = (input) => {
            // Trim input to remove leading and trailing spaces
            const trimmedInput = input.trim();

            // Check if input starts with a space
            if (input !== trimmedInput && input.startsWith(' ')) {
                return false; // Input starts with a space
            }

            // Check if trimmed input contains only alphanumeric characters and spaces in between
            const isValid = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/.test(trimmedInput);

            return isValid || trimmedInput === '';
        };
        if (!isValidInput(value)) {
            return;
        }
        setEmployerDetailsJsonString((prevData) => ({
            ...prevData,
            [e]: value
        }))

    }

    let handleStatsDetails = (e, value) => {
        const isValidInput = (input) => {
            // Trim input to remove leading and trailing spaces
            const trimmedInput = input.trim();

            // Check if input starts with a space
            if (input !== trimmedInput && input.startsWith(' ')) {
                return false; // Input starts with a space
            }

            // Check if trimmed input contains only alphanumeric characters and spaces in between
            const isValid = /^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/.test(trimmedInput);

            return isValid || trimmedInput === '';
        };
        const isValidInputDate = (input) => /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(input);

        if (e === "financialReviewDate") {
            if (!isValidInputDate(value)) {
                return;
            }
        }
        else {
            if (!isValidInput(value)) {
                return;
            }
        } setStatsJsonString((prevPatientDetails) => ({
            ...prevPatientDetails,
            [e]: value,
        }))
    }

    let saveButtonObjCheck = () => {
        save()
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
    let getLanguageList = async () => {
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
        document.getElementById("errDepartment").style.display = "none";
        const deptID = document.getElementById('ddlDepartment').value;
        let data = await GetRoomList(deptID);
        setSelectedDept(deptID);
        getWardListByDeptID(deptID);
        setRoomList(data.responseValue);
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

    const getUserListByRoleId = async () => {
        const param = {
            roleId: 2,
            clientID: window.clientId,
        }
        const response = await GetUserListByRoleId(param)
        if (response.status === 1) {
            setProviderList(response.responseValue)
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
        document.getElementById('ddlRaceType').value = list.raceId === null ? 0 : list.raceId;
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
        const previousNamePrefix = document.getElementById('txtPreviousNamePrefix').value.trim();
        const previousNameFirst = document.getElementById('txtPreviousNameFirst').value.trim();
        const previousNameMiddle = document.getElementById('txtPreviousNameMiddle').value.trim();
        const previousNameLast = document.getElementById('txtPreviousNameLast').value.trim();
        const previousNameSuffix = document.getElementById('txtPreviousNameSuffix').value.trim();
        const previousNameEndDate = document.getElementById('txtPreviousNameEndDate').value.trim();

        // Check if any field is non-empty
        const isAnyFieldFilled = [previousNamePrefix, previousNameFirst, previousNameMiddle, previousNameLast, previousNameSuffix, previousNameEndDate].some(value => value !== '');

        if (isAnyFieldFilled) {
            // At least one field is filled, proceed with saving
            var dataObj = {
                titleId: '0',
                suffix: previousNameSuffix,
                firstName: previousNameFirst,
                middleName: previousNameMiddle,
                lastName: previousNameLast,
                suffix: previousNameSuffix, // If you want to include suffix twice, ensure it's correct
                endDate: previousNameEndDate,
                fullName: previousNamePrefix + ' ' + previousNameFirst + ' ' + previousNameMiddle + ' ' + previousNameLast + ' ' + previousNameSuffix
            };

            setPriviousNameList(prevList => [...prevList, dataObj]);
            setShowToster(2);
            setTimeout(() => {
                setShowToster(0);
            }, 2000);
        } else {
            setShowAlertToster(2)
        }

        setShowPreviousNamesPopUp(false);
    };



    let handleValidation = (data, insuranceDetailsPrimary, insuranceDetailsSecondry, insuranceDetailsTertiary, ddlDepartment, ddlDoctor, ddlRoomNo) => {
        if (data.mobileNo.trim() !== "" && data.titleId.trim() !== "" && data.patientName.trim() !== ""
            && data.lastName.trim() !== ""
            && data.dob.trim() !== "" && data.age.toString().trim() !== "" && data.ageUnitId.trim() !== "" && data.genderId.trim() !== ""
            && data.genderidentityId.trim() !== ""
            && insuranceDetailsPrimary.insuranceProviderId.trim() !== ""
            && insuranceDetailsPrimary.planName.trim() !== "" && insuranceDetailsPrimary.subscriber1.trim() !== ""
            && insuranceDetailsPrimary.subscriber2.trim() !== "" && insuranceDetailsPrimary.subscriber3.trim() !== ""
            && insuranceDetailsPrimary.effectiveDate.trim() !== "" && insuranceDetailsPrimary.relationshipId.trim() !== ""
            && insuranceDetailsPrimary.policyNumber.trim() !== "" && insuranceDetailsPrimary.subscriberEmployer.trim() !== ""
            && insuranceDetailsPrimary.seAddress.trim() !== "" && insuranceDetailsPrimary.subscriberAddressLine1.trim() !== ""
            && insuranceDetailsPrimary.subscriberAddressLine2.trim() !== "" && insuranceDetailsPrimary.seCity.trim() !== ""
            && insuranceDetailsPrimary.city.trim() !== "" && insuranceDetailsPrimary.seStateId.trim() !== ""
            && insuranceDetailsPrimary.stateId.trim() !== "" && insuranceDetailsPrimary.seZipCode.trim() !== ""
            && insuranceDetailsPrimary.zipCode.trim() !== "" && insuranceDetailsPrimary.seCountryId.trim() !== ""
            && insuranceDetailsPrimary.countryId.trim() !== "" && insuranceDetailsPrimary.groupNumber.trim() !== ""
            && insuranceDetailsPrimary.isAcceptAssignment.trim() !== ""

            && insuranceDetailsSecondry.insuranceProviderId.trim() !== ""
            && insuranceDetailsSecondry.planName.trim() !== "" && insuranceDetailsSecondry.subscriber1.trim() !== ""
            && insuranceDetailsSecondry.subscriber2.trim() !== "" && insuranceDetailsSecondry.subscriber3.trim() !== ""
            && insuranceDetailsSecondry.effectiveDate.trim() !== "" && insuranceDetailsSecondry.relationshipId.trim() !== ""
            && insuranceDetailsSecondry.policyNumber.trim() !== "" && insuranceDetailsSecondry.subscriberEmployer.trim() !== ""
            && insuranceDetailsSecondry.seAddress.trim() !== "" && insuranceDetailsSecondry.subscriberAddressLine1.trim() !== ""
            && insuranceDetailsSecondry.subscriberAddressLine2.trim() !== "" && insuranceDetailsSecondry.seCity.trim() !== ""
            && insuranceDetailsSecondry.city.trim() !== "" && insuranceDetailsSecondry.seStateId.trim() !== ""
            && insuranceDetailsSecondry.stateId.trim() !== "" && insuranceDetailsSecondry.seZipCode.trim() !== ""
            && insuranceDetailsSecondry.zipCode.trim() !== "" && insuranceDetailsSecondry.seCountryId.trim() !== ""
            && insuranceDetailsSecondry.countryId.trim() !== "" && insuranceDetailsSecondry.groupNumber.trim() !== ""
            && insuranceDetailsSecondry.isAcceptAssignment.trim() !== ""

            && insuranceDetailsTertiary.insuranceProviderId.trim() !== ""
            && insuranceDetailsTertiary.planName.trim() !== "" && insuranceDetailsTertiary.subscriber1.trim() !== ""
            && insuranceDetailsTertiary.subscriber2.trim() !== "" && insuranceDetailsTertiary.subscriber3.trim() !== ""
            && insuranceDetailsTertiary.effectiveDate.trim() !== "" && insuranceDetailsTertiary.relationshipId.trim() !== ""
            && insuranceDetailsTertiary.policyNumber.trim() !== "" && insuranceDetailsTertiary.subscriberEmployer.trim() !== ""
            && insuranceDetailsTertiary.seAddress.trim() !== "" && insuranceDetailsTertiary.subscriberAddressLine1.trim() !== ""
            && insuranceDetailsTertiary.subscriberAddressLine2.trim() !== "" && insuranceDetailsTertiary.seCity.trim() !== ""
            && insuranceDetailsTertiary.city.trim() !== "" && insuranceDetailsTertiary.seStateId.trim() !== ""
            && insuranceDetailsTertiary.stateId.trim() !== "" && insuranceDetailsTertiary.seZipCode.trim() !== ""
            && insuranceDetailsTertiary.zipCode.trim() !== "" && insuranceDetailsTertiary.seCountryId.trim() !== ""
            && insuranceDetailsTertiary.countryId.trim() !== "" && insuranceDetailsTertiary.groupNumber.trim() !== ""
            && insuranceDetailsTertiary.isAcceptAssignment.trim() !== "" && ddlDepartment !== "0" && ddlDoctor !== "0"
            && ddlRoomNo !== "0"
        ) {
            return true
        }
        else if (data.mobileNo.trim() === "") {
            document.getElementById("errMobile").style.display = "block"
            document.getElementById("errMobile").innerHTML = "Please enter mobile no"
            return false
        }
        else if (data.titleId.trim() === "") {
            document.getElementById("errTitle").style.display = "block"
            document.getElementById("errTitle").innerHTML = "Please Select Title"
            return false
        }
        else if (data.patientName.trim() === "") {
            document.getElementById("errPatientFirstName").style.display = "block"
            document.getElementById("errPatientFirstName").innerHTML = "Please enter first name"
            return false
        }
        // else if (data.middleName.trim() === "") {
        //     document.getElementById("errPatientMiddleName").style.display = "block"
        //     document.getElementById("errPatientMiddleName").innerHTML = "Please enter middle name"
        //     return false
        // }
        else if (data.lastName.trim() === "") {
            document.getElementById("errPatientLastName").style.display = "block"
            document.getElementById("errPatientLastName").innerHTML = "Please enter last name"
            return false
        }
        else if (data.dob.trim() === "") {
            document.getElementById("errPatientDob").style.display = "block"
            document.getElementById("errPatientDob").innerHTML = "Please select dob"
            return false
        }
        else if (data.age.toString().trim() === "") {
            document.getElementById("errPatientAge").style.display = "block"
            document.getElementById("errPatientAge").innerHTML = "Please enter age"
            return false
        }
        else if (data.ageUnitId === "0" || data.ageUnitId === undefined || data.ageUnitId === null || data.ageUnitId === "") {
            document.getElementById("errAgeUnitID").style.display = "block"
            document.getElementById("errAgeUnitID").innerHTML = "Please select unit"
            return false
        }
        else if (data.genderId === "0" || data.genderId === undefined || data.genderId === null || data.genderId === "") {
            document.getElementById("errPatientGender").style.display = "block";
            document.getElementById("errPatientGender").innerHTML = "Please select gender";
            return false;
        }
        else if (data.genderidentityId === "" || data.genderidentityId === null) {
            document.getElementById("errPatientGenderIdentity").style.display = "block"
            document.getElementById("errPatientGenderIdentity").innerHTML = "Please select gender identity"
            return false
        }
        else if (insuranceDetailsPrimary.insuranceProviderId === "" || insuranceDetailsPrimary.insuranceProviderId === null) {
            document.getElementById("errPrimary").style.display = "block"
            document.getElementById("errPrimary").innerHTML = "Please select insurance provider"
            return false
        }
        else if (insuranceDetailsPrimary.planName === "" || insuranceDetailsPrimary.planName === null) {
            document.getElementById("errPlanName").style.display = "block"
            document.getElementById("errPlanName").innerHTML = "Please enter plan"
            return false
        }
        else if (insuranceDetailsPrimary.subscriber1 === "" || insuranceDetailsPrimary.subscriber1 === null) {
            document.getElementById("errSubscriber").style.display = "block"
            document.getElementById("errSubscriber").innerHTML = "Please enter subscriber 1"
            return false
        }
        else if (insuranceDetailsPrimary.subscriber2 === "" || insuranceDetailsPrimary.subscriber2 === null) {
            document.getElementById("errSubscriber").style.display = "block"
            document.getElementById("errSubscriber").innerHTML = "Please enter subscriber 2"
            return false
        }
        else if (insuranceDetailsPrimary.subscriber3 === "" || insuranceDetailsPrimary.subscriber3 === null) {
            document.getElementById("errSubscriber").style.display = "block"
            document.getElementById("errSubscriber").innerHTML = "Please enter subscriber 3"
            return false
        }
        else if (insuranceDetailsPrimary.effectiveDate === "" || insuranceDetailsPrimary.effectiveDate === null) {
            document.getElementById("errEffectiveDate").style.display = "block"
            document.getElementById("errEffectiveDate").innerHTML = "Please select effective date"
            return false
        }
        else if (insuranceDetailsPrimary.relationshipId === "" || insuranceDetailsPrimary.relationshipId === null) {
            document.getElementById("errRelationship").style.display = "block"
            document.getElementById("errRelationship").innerHTML = "Please select relationship"
            return false
        }
        else if (insuranceDetailsPrimary.policyNumber === "" || insuranceDetailsPrimary.policyNumber === null) {
            document.getElementById("errPolicyNumber").style.display = "block"
            document.getElementById("errPolicyNumber").innerHTML = "Please enter policy number"
            return false
        }
        else if (insuranceDetailsPrimary.subscriberEmployer === "" || insuranceDetailsPrimary.subscriberEmployer === null) {
            document.getElementById("errSubscriberEmployer").style.display = "block"
            document.getElementById("errSubscriberEmployer").innerHTML = "Please enter subscriber employer"
            return false
        }
        else if (insuranceDetailsPrimary.seAddress === "" || insuranceDetailsPrimary.seAddress === null) {
            document.getElementById("errSEAddress").style.display = "block"
            document.getElementById("errSEAddress").innerHTML = "Please enter se address"
            return false
        }
        else if (insuranceDetailsPrimary.subscriberAddressLine1 === "" || insuranceDetailsPrimary.subscriberAddressLine1 === null) {
            document.getElementById("errSubsciberAddressLine1").style.display = "block"
            document.getElementById("errSubsciberAddressLine1").innerHTML = "Please enter subscriber address line1"
            return false
        }
        else if (insuranceDetailsPrimary.subscriberAddressLine2 === "" || insuranceDetailsPrimary.subscriberAddressLine2 === null) {
            document.getElementById("errSubsciberAddressLine2").style.display = "block"
            document.getElementById("errSubsciberAddressLine2").innerHTML = "Please enter subscriber address line2"
            return false
        }
        else if (insuranceDetailsPrimary.seCity === "" || insuranceDetailsPrimary.seCity === null) {
            document.getElementById("errSECity").style.display = "block"
            document.getElementById("errSECity").innerHTML = "Please enter se city"
            return false
        }
        else if (insuranceDetailsPrimary.city === "" || insuranceDetailsPrimary.city === null) {
            document.getElementById("errCityprimary").style.display = "block"
            document.getElementById("errCityprimary").innerHTML = "Please enter city"
            return false
        }
        else if (insuranceDetailsPrimary.seStateId === "" || insuranceDetailsPrimary.seStateId === null) {
            document.getElementById("errSEStateprimary").style.display = "block"
            document.getElementById("errSEStateprimary").innerHTML = "Please select se state"
            return false
        }
        else if (insuranceDetailsPrimary.stateId === "" || insuranceDetailsPrimary.stateId === null) {
            document.getElementById("errStatePrimary").style.display = "block"
            document.getElementById("errStatePrimary").innerHTML = "Please select state"
            return false
        }
        else if (insuranceDetailsPrimary.seZipCode === "" || insuranceDetailsPrimary.seZipCode === null) {
            document.getElementById("errSEZipCode").style.display = "block"
            document.getElementById("errSEZipCode").innerHTML = "Please enter se zip code"
            return false
        }
        else if (insuranceDetailsPrimary.zipCode === "" || insuranceDetailsPrimary.zipCode === null) {
            document.getElementById("errZipCode").style.display = "block"
            document.getElementById("errZipCode").innerHTML = "Please enter zip code"
            return false
        }
        else if (insuranceDetailsPrimary.seCountryId === "" || insuranceDetailsPrimary.seCountryId === null) {
            document.getElementById("errSECountry").style.display = "block"
            document.getElementById("errSECountry").innerHTML = "Please select se country"
            return false
        }
        else if (insuranceDetailsPrimary.countryId === "" || insuranceDetailsPrimary.countryId === null) {
            document.getElementById("errCountry").style.display = "block"
            document.getElementById("errCountry").innerHTML = "Please select country"
            return false
        }
        else if (insuranceDetailsPrimary.groupNumber === "" || insuranceDetailsPrimary.groupNumber === null) {
            document.getElementById("errGroupNumber").style.display = "block"
            document.getElementById("errGroupNumber").innerHTML = "Please enter group number"
            return false
        }
        else if (insuranceDetailsPrimary.isAcceptAssignment === "" || insuranceDetailsPrimary.isAcceptAssignment === null) {
            document.getElementById("errAcceptAssignment").style.display = "block"
            document.getElementById("errAcceptAssignment").innerHTML = "Please select accept assignment"
            return false
        }

        // '''''''

        else if (insuranceDetailsSecondry.insuranceProviderId === "" || insuranceDetailsSecondry.insuranceProviderId === null) {
            document.getElementById("errSecondary").style.display = "block"
            document.getElementById("errSecondary").innerHTML = "Please select insurance provider"
            return false
        }
        else if (insuranceDetailsSecondry.planName === "" || insuranceDetailsSecondry.planName === null) {
            document.getElementById("errPlanNameSecondary").style.display = "block"
            document.getElementById("errPlanNameSecondary").innerHTML = "Please enter plan"
            return false
        }
        else if (insuranceDetailsSecondry.subscriber1 === "" || insuranceDetailsSecondry.subscriber1 === null) {
            document.getElementById("errSubscriberSecondary").style.display = "block"
            document.getElementById("errSubscriberSecondary").innerHTML = "Please enter subscriber 1"
            return false
        }
        else if (insuranceDetailsSecondry.subscriber2 === "" || insuranceDetailsSecondry.subscriber2 === null) {
            document.getElementById("errSubscriberSecondary").style.display = "block"
            document.getElementById("errSubscriberSecondary").innerHTML = "Please enter subscriber 2"
            return false
        }
        else if (insuranceDetailsSecondry.subscriber3 === "" || insuranceDetailsSecondry.subscriber3 === null) {
            document.getElementById("errSubscriberSecondary").style.display = "block"
            document.getElementById("errSubscriberSecondary").innerHTML = "Please enter subscriber 3"
            return false
        }
        else if (insuranceDetailsSecondry.effectiveDate === "" || insuranceDetailsSecondry.effectiveDate === null) {
            document.getElementById("errEffectiveDateSecondary").style.display = "block"
            document.getElementById("errEffectiveDateSecondary").innerHTML = "Please select effective date"
            return false
        }
        else if (insuranceDetailsSecondry.relationshipId === "" || insuranceDetailsSecondry.relationshipId === null) {
            document.getElementById("errRelationshipSecondary").style.display = "block"
            document.getElementById("errRelationshipSecondary").innerHTML = "Please select relationship"
            return false
        }
        else if (insuranceDetailsSecondry.policyNumber === "" || insuranceDetailsSecondry.policyNumber === null) {
            document.getElementById("errPolicyNumberSecondary").style.display = "block"
            document.getElementById("errPolicyNumberSecondary").innerHTML = "Please enter policy number"
            return false
        }
        else if (insuranceDetailsSecondry.subscriberEmployer === "" || insuranceDetailsSecondry.subscriberEmployer === null) {
            document.getElementById("errSubscriberEmployerSecondary").style.display = "block"
            document.getElementById("errSubscriberEmployerSecondary").innerHTML = "Please enter subscriber employer"
            return false
        }
        else if (insuranceDetailsSecondry.seAddress === "" || insuranceDetailsSecondry.seAddress === null) {
            document.getElementById("errSEAddressSecondary").style.display = "block"
            document.getElementById("errSEAddressSecondary").innerHTML = "Please enter se address"
            return false
        }
        else if (insuranceDetailsSecondry.subscriberAddressLine1 === "" || insuranceDetailsSecondry.subscriberAddressLine1 === null) {
            document.getElementById("errSubsciberAddressLine1Secondary").style.display = "block"
            document.getElementById("errSubsciberAddressLine1Secondary").innerHTML = "Please enter subscriber address line1"
            return false
        }
        else if (insuranceDetailsSecondry.subscriberAddressLine2 === "" || insuranceDetailsSecondry.subscriberAddressLine2 === null) {
            document.getElementById("errSubsciberAddressLine2Secondary").style.display = "block"
            document.getElementById("errSubsciberAddressLine2Secondary").innerHTML = "Please enter subscriber address line2"
            return false
        }
        else if (insuranceDetailsSecondry.seCity === "" || insuranceDetailsSecondry.seCity === null) {
            document.getElementById("errSECitySecondary").style.display = "block"
            document.getElementById("errSECitySecondary").innerHTML = "Please enter se city"
            return false
        }
        else if (insuranceDetailsSecondry.city === "" || insuranceDetailsSecondry.city === null) {
            document.getElementById("errCitySecondary").style.display = "block"
            document.getElementById("errCitySecondary").innerHTML = "Please enter city"
            return false
        }
        else if (insuranceDetailsSecondry.seStateId === "" || insuranceDetailsSecondry.seStateId === null) {
            document.getElementById("errSEStateSecondary").style.display = "block"
            document.getElementById("errSEStateSecondary").innerHTML = "Please select se state"
            return false
        }
        else if (insuranceDetailsSecondry.stateId === "" || insuranceDetailsSecondry.stateId === null) {
            document.getElementById("errStateSecondary").style.display = "block"
            document.getElementById("errStateSecondary").innerHTML = "Please select state"
            return false
        }
        else if (insuranceDetailsSecondry.seZipCode === "" || insuranceDetailsSecondry.seZipCode === null) {
            document.getElementById("errSEZipCodeSecondary").style.display = "block"
            document.getElementById("errSEZipCodeSecondary").innerHTML = "Please enter se zip code"
            return false
        }
        else if (insuranceDetailsSecondry.zipCode === "" || insuranceDetailsSecondry.zipCode === null) {
            document.getElementById("errZipCodeSecondary").style.display = "block"
            document.getElementById("errZipCodeSecondary").innerHTML = "Please enter zip code"
            return false
        }
        else if (insuranceDetailsSecondry.seCountryId === "" || insuranceDetailsSecondry.seCountryId === null) {
            document.getElementById("errSECountrySecondary").style.display = "block"
            document.getElementById("errSECountrySecondary").innerHTML = "Please select se country"
            return false
        }
        else if (insuranceDetailsSecondry.countryId === "" || insuranceDetailsSecondry.countryId === null) {
            document.getElementById("errCountrySecondary").style.display = "block"
            document.getElementById("errCountrySecondary").innerHTML = "Please select country"
            return false
        }
        else if (insuranceDetailsSecondry.groupNumber === "" || insuranceDetailsSecondry.groupNumber === null) {
            document.getElementById("errGroupNumberSecondary").style.display = "block"
            document.getElementById("errGroupNumberSecondary").innerHTML = "Please enter group number"
            return false
        }
        else if (insuranceDetailsSecondry.isAcceptAssignment === "" || insuranceDetailsSecondry.isAcceptAssignment === null) {
            document.getElementById("errAcceptAssignmentSecondary").style.display = "block"
            document.getElementById("errAcceptAssignmentSecondary").innerHTML = "Please select accept assignment"
            return false
        }

        // '''''''

        else if (insuranceDetailsTertiary.insuranceProviderId === "" || insuranceDetailsTertiary.insuranceProviderId === null) {
            document.getElementById("errTertiary").style.display = "block"
            document.getElementById("errTertiary").innerHTML = "Please select insurance provider"
            return false
        }
        else if (insuranceDetailsTertiary.planName === "" || insuranceDetailsTertiary.planName === null) {
            document.getElementById("errPlanNameTertiary").style.display = "block"
            document.getElementById("errPlanNameTertiary").innerHTML = "Please enter plan"
            return false
        }
        else if (insuranceDetailsTertiary.subscriber1 === "" || insuranceDetailsTertiary.subscriber1 === null) {
            document.getElementById("errSubscriberTertiary").style.display = "block"
            document.getElementById("errSubscriberTertiary").innerHTML = "Please enter subscriber 1"
            return false
        }
        else if (insuranceDetailsTertiary.subscriber2 === "" || insuranceDetailsTertiary.subscriber2 === null) {
            document.getElementById("errSubscriberTertiary").style.display = "block"
            document.getElementById("errSubscriberTertiary").innerHTML = "Please enter subscriber 2"
            return false
        }
        else if (insuranceDetailsTertiary.subscriber3 === "" || insuranceDetailsTertiary.subscriber3 === null) {
            document.getElementById("errSubscriberTertiary").style.display = "block"
            document.getElementById("errSubscriberTertiary").innerHTML = "Please enter subscriber 3"
            return false
        }
        else if (insuranceDetailsTertiary.effectiveDate === "" || insuranceDetailsTertiary.effectiveDate === null) {
            document.getElementById("errEffectiveDateTertiary").style.display = "block"
            document.getElementById("errEffectiveDateTertiary").innerHTML = "Please select effective date"
            return false
        }
        else if (insuranceDetailsTertiary.relationshipId === "" || insuranceDetailsTertiary.relationshipId === null) {
            document.getElementById("errRelationshipTertiary").style.display = "block"
            document.getElementById("errRelationshipTertiary").innerHTML = "Please select relationship"
            return false
        }
        else if (insuranceDetailsTertiary.policyNumber === "" || insuranceDetailsTertiary.policyNumber === null) {
            document.getElementById("errPolicyNumberTertiary").style.display = "block"
            document.getElementById("errPolicyNumberTertiary").innerHTML = "Please enter policy number"
            return false
        }
        else if (insuranceDetailsTertiary.subscriberEmployer === "" || insuranceDetailsTertiary.subscriberEmployer === null) {
            document.getElementById("errSubscriberEmployerTertiary").style.display = "block"
            document.getElementById("errSubscriberEmployerTertiary").innerHTML = "Please enter subscriber employer"
            return false
        }
        else if (insuranceDetailsTertiary.seAddress === "" || insuranceDetailsTertiary.seAddress === null) {
            document.getElementById("errSEAddressTertiary").style.display = "block"
            document.getElementById("errSEAddressTertiary").innerHTML = "Please enter se address"
            return false
        }
        else if (insuranceDetailsTertiary.subscriberAddressLine1 === "" || insuranceDetailsTertiary.subscriberAddressLine1 === null) {
            document.getElementById("errSubsciberAddressLine1Tertiary").style.display = "block"
            document.getElementById("errSubsciberAddressLine1Tertiary").innerHTML = "Please enter subscriber address line1"
            return false
        }
        else if (insuranceDetailsTertiary.subscriberAddressLine2 === "" || insuranceDetailsTertiary.subscriberAddressLine2 === null) {
            document.getElementById("errSubsciberAddressLine2Tertiary").style.display = "block"
            document.getElementById("errSubsciberAddressLine2Tertiary").innerHTML = "Please enter subscriber address line2"
            return false
        }
        else if (insuranceDetailsTertiary.seCity === "" || insuranceDetailsTertiary.seCity === null) {
            document.getElementById("errSECityTertiary").style.display = "block"
            document.getElementById("errSECityTertiary").innerHTML = "Please enter se city"
            return false
        }
        else if (insuranceDetailsTertiary.city === "" || insuranceDetailsTertiary.city === null) {
            document.getElementById("errCityTertiary").style.display = "block"
            document.getElementById("errCityTertiary").innerHTML = "Please enter city"
            return false
        }
        else if (insuranceDetailsTertiary.seStateId === "" || insuranceDetailsTertiary.seStateId === null) {
            document.getElementById("errSEStateTertiary").style.display = "block"
            document.getElementById("errSEStateTertiary").innerHTML = "Please select se state"
            return false
        }
        else if (insuranceDetailsTertiary.stateId === "" || insuranceDetailsTertiary.stateId === null) {
            document.getElementById("errStateTertiary").style.display = "block"
            document.getElementById("errStateTertiary").innerHTML = "Please select state"
            return false
        }
        else if (insuranceDetailsTertiary.seZipCode === "" || insuranceDetailsTertiary.seZipCode === null) {
            document.getElementById("errSEZipCodeTertiary").style.display = "block"
            document.getElementById("errSEZipCodeTertiary").innerHTML = "Please enter se zip code"
            return false
        }
        else if (insuranceDetailsTertiary.zipCode === "" || insuranceDetailsTertiary.zipCode === null) {
            document.getElementById("errZipCodeTertiary").style.display = "block"
            document.getElementById("errZipCodeTertiary").innerHTML = "Please enter zip code"
            return false
        }
        else if (insuranceDetailsTertiary.seCountryId === "" || insuranceDetailsTertiary.seCountryId === null) {
            document.getElementById("errSECountryTertiary").style.display = "block"
            document.getElementById("errSECountryTertiary").innerHTML = "Please select se country"
            return false
        }
        else if (insuranceDetailsTertiary.countryId === "" || insuranceDetailsTertiary.countryId === null) {
            document.getElementById("errCountryTertiary").style.display = "block"
            document.getElementById("errCountryTertiary").innerHTML = "Please select country"
            return false
        }
        else if (insuranceDetailsTertiary.groupNumber === "" || insuranceDetailsTertiary.groupNumber === null) {
            document.getElementById("errGroupNumberTertiary").style.display = "block"
            document.getElementById("errGroupNumberTertiary").innerHTML = "Please enter group number"
            return false
        }
        else if (insuranceDetailsTertiary.isAcceptAssignment === "" || insuranceDetailsTertiary.isAcceptAssignment === null) {
            document.getElementById("errAcceptAssignmentTertiary").style.display = "block"
            document.getElementById("errAcceptAssignmentTertiary").innerHTML = "Please select accept assignment"
            return false
        }
        else if (ddlDepartment === "0") {
            document.getElementById("errDepartment").style.display = "block"
            document.getElementById("errDepartment").innerHTML = "Please select department"
            return false
        }
        else if (ddlDoctor === "0") {
            document.getElementById("errDoctor").style.display = "block"
            document.getElementById("errDoctor").innerHTML = "Please select doctor"
            return false
        }
        else if (ddlRoomNo === "0") {
            document.getElementById("errRoom").style.display = "block"
            document.getElementById("errRoom").innerHTML = "Please select room no"
            return false
        }

    }
    let handleClear = () => {
        setClearStatus(1)
        setEmployerDetailsJsonString({
            occupation: '',
            industryId: '',
            employerName: '',
            address: '',
            addressLine2: '',
            city: '0',
            countryId: '0',
            stateId: '0',
            postalCode: '',
        })
        setStatsJsonString({
            ethinicityId: '',
            languageId: '',
            raceId: '',
            familySize: '',
            financialReviewDate: '',
            monthlyIncome: '',
            homeless: '',
            interpreter: '',
            migrant: '',
            referralSourceId: '',
            isvfceligible: '',
            religion: '',
        })

        setRegistrationObj({
            deceasedDate: '',
            deceasedReason: '',
            guardiansName: '',
            guardianrelationship: '',
            genderId: '',
            guardianAddress: '',
            guardianMobileNo: '',
            guardianworkphone: '',
            guardianemail: ''
        })

        document.getElementById('ddlDepartment').value = '';
        document.getElementById('ddlDoctor').value = '';
        document.getElementById('ddlRoomNo').value = '';
    }


    let save = async () => {
        const pp = issueDetails.Problem
        const clientID = JSON.parse(sessionStorage.getItem("LoginData")).clientId;
        const ddlDepartment = document.getElementById('ddlDepartment').value;
        const ddlDoctor = document.getElementById('ddlDoctor').value;
        const ddlRoomNo = document.getElementById('ddlRoomNo').value;
        var tempArr = [];
        tempArr.push(insuranceDetailsPrimary);
        tempArr.push(insuranceDetailsSecondry);
        tempArr.push(insuranceDetailsTertiary);
        let respValidation = handleValidation(patientDetails, insuranceDetailsPrimary, insuranceDetailsSecondry, insuranceDetailsTertiary, ddlDepartment, ddlDoctor, ddlRoomNo)

        var makeDataObj = {

            ...contactDetails,
            ...patientChoiceDetails,
            ...registrationObj,
            ...visitDetails,
            employerDetailsJsonString: JSON.stringify([employerDetailsJsonString]),
            insuranceDetailsJsonString: JSON.stringify(tempArr),
            statsJsonString: JSON.stringify([statsJsonString]),
            encounterDetailsJsonString: JSON.stringify([issueDetails.Problem, issueDetails.Allergy, issueDetails.Medication, issueDetails.Device, issueDetails.Surgery, issueDetails.Dental]),
            clientID: clientID,
            userId: window.userId,
            "departmentId": ddlDepartment,
            "doctorId": ddlDoctor,
            "roomId": ddlRoomNo,
            ...patientDetails,

        }
        var sendDataObj = { ...makeDataObj, previousNamesJsonString: JSON.stringify(makeDataObj.previousNamesJsonString) }

        // return;
        if (respValidation) {
            const response = await InsertPatientDemographicData(sendDataObj);
            if (response.status === 1) {
                setShowUnderProcess(0);
                setShowToster(1)
                setTimeout(() => {
                    setShowToster(0);
                }, 2000)
                handleClear();
            }
            else {
                setShowUnderProcess(0)
                setShowAlertToster(1)
                setShowMessage(response.responseValue)
                setTimeout(() => {
                    setShowToster(0)
                }, 2000)
            }

        }
    }
    let clear = (e, value) => {
        // setPatientMobileNo('');
        // setPatientName('');
        // setPatientHomeMobNo('');
        // setEmail('');
        // setPatientAddress('');
        // setApt('');
        // setDob('');
        // setZipCode('');
        // setGuardianName('');
        // setGuardianRelationToPatient('');
        // setGuardianAddress('');
        // setGuardianMobileNo('');
        // setPatientAge('');
        // setPatientUHID('');
        // setPatientID('');
        // setPatientHeight('');
        // setPatientWeight('');
        // setWardList([]);
        // setRoomList([]);
        // setIdentityNo('');
        // setCityList([]);
        // setisRevisitPatient(0);
        // setUhid('');
        // clearDisabledFields();
        // clearErrorMessages();
        // setShowEdit(false);
        // setIsEdit(false);
        // setPaymentType(0);
        // setCashpayment('');
        // document.getElementById('ddlState').value = 0;
        // document.getElementById('ddlCity').value = 0;
        // document.getElementById('ddlRoomNo').value = 0;
        // document.getElementById('ddlDoctor').value = 0;
        // document.getElementById('ddlBloodGroup').value = 0;
        // document.getElementById('ddlIdentityType').value = '0';
        // document.getElementById('ddlGender').value = '0';
        // document.getElementById('ddlDepartment').value = '0';
        // document.getElementById('ddlBloodGroup').value = '0';
        // document.getElementById('ddlRaceType').value = '0';
        // document.getElementById('ddlEthnicity').value = '0';
        // document.getElementById('ddlPreferredLanguage').value = '0';
        // document.getElementById('ddlMaritalStatus').value = '0';
        // document.getElementById('ddlRelationToPat').value = '0';
        // document.getElementById("ddlAgeUnit").value = "1";
        // document.getElementById("ddlsexualOrientation").value = "0";
        // document.getElementById("ddlPaymentType").value = "0";
        // document.getElementById("ddlInsuranceCompany").value = "0";
        // const getClientCountryID = JSON.parse(window.sessionStorage.getItem("LoginData")).countryId;
        // document.getElementById('ddlCountryCode').value = getClientCountryID;
        // setCountryID(getClientCountryID);
        // getStateList(getClientCountryID);
        // getConsultantFee(getClientCountryID);
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
                raceId: raceType == "" ? null : raceType,
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
        getUserListByRoleId();
        getreferralList();
        GetGenderList();
        getCountryList();
        getGuardianRelationList();
        getRelgionList();
        getIndustryList();
        getAllSexualOrientation();
        getDepartmentList();
        getLanguageList();
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

    const [formData, setFormData] = useState({
        occupation: '',
        industryId: '0',
        employerName: '',
        address: '',
        addressLine2: '',
        city: '',
        countryId: '0',
        stateId: '0',
        postalCode: '',
    });

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
                                                <PatientDetails setClearStatus={setClearStatus} clearStatus={clearStatus} patientDetailsData={setPatientDetails} onPriviousNamesAddButtonClick={showPreviousNamesPopUpHandle} isShowPriviousModal={showPreviousNamesPopUp} priviousNames={priviousNameList} />
                                                {/* <PatientDetails patientDetailsData={setPatientDetails} onPatientDetailsChange={handlerChange2} onPriviousNamesAddButtonClick={showPreviousNamesPopUpHandle} isShowPriviousModal={showPreviousNamesPopUp} priviousNames={priviousNameList} /> */}
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
                                                    <div className="accordion-body" style={{ maxHeight: '35vh', overflow: 'auto' }}>
                                                        <div className="dflex">
                                                            <ContactDetails contactDetailsData={setContactDetails} setClearStatus={setClearStatus} clearStatus={clearStatus} />
                                                            {/* <ContactDetails onContactDetailsChange={handlerChange2} setAdditionalAddressJsonString={setAdditionalAddressJsonString} /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* ....................................................................Patient_Choices..................................................................... */}

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
                                                        <PattientChoices patientchoicesData={setPatientChoiceDetails} setClearStatus={setClearStatus} clearStatus={clearStatus} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ....................................................................Employer..................................................................... */}


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
                                                                <label htmlFor="txtOccupation" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Occupation")}</label>
                                                                <input type="text" value={employerDetailsJsonString.occupation} className="form-control form-control-sm" id="txtOccupation" placeholder={t("Enter_Occupation")} name='occupation' onChange={(e) => { handleemployerDetails("occupation", e.target.value) }} />
                                                                {/* <input type="text" className="form-control form-control-sm" id="txtOccupation" placeholder={t("Enter_Occupation")} name='occupation' onChange={(e) => { handleemployerDetails("occupation", e.target.value) }} /> */}
                                                            </div>

                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlIndustry" className="form-label"><img src={city} className='icnn' alt='' />{t("Industry")}</label>
                                                                <select className="form-select form-select-sm" value={employerDetailsJsonString.industryId} id="ddlIndustry" aria-label=".form-select-sm example" name='industryId' onChange={(e) => { handleemployerDetails("industryId", e.target.value) }}>
                                                                    <option value="0" selected>Select Industry</option>
                                                                    {industryList && industryList.map((list) => {
                                                                        return (
                                                                            <option value={list.id}>{list.name}</option>
                                                                        )
                                                                    })}
                                                                </select>
                                                                <small id="errIndustry" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>

                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtEmployerName" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Employer_Name")}</label>
                                                                <input type="text" value={employerDetailsJsonString.employerName} className="form-control form-control-sm" id="txtEmployerName" placeholder={t("Enter_Employer_Name")} name='employerName' onChange={(e) => { handleemployerDetails("employerName", e.target.value) }} />
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtEmployerStreet" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Employer_Street")}</label>
                                                                <input type="text" value={employerDetailsJsonString.address} className="form-control form-control-sm" id="txtEmployerStreet" placeholder={t("Enter_Employer_Street")} name='address' onChange={(e) => { handleemployerDetails("address", e.target.value) }} />
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtEmployerStreetLine2" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Employer_Street_Line2")}</label>
                                                                <input type="text" value={employerDetailsJsonString.addressLine2} className="form-control form-control-sm" id="txtEmployerStreetLine2" placeholder={t("Enter_Employer_Street_Line2")} name='addressLine2' onChange={(e) => { handleemployerDetails("addressLine2", e.target.value) }} />
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtEmployerCity" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Employer_City")}</label>
                                                                <input type="text" value={employerDetailsJsonString.city} className="form-control form-control-sm" id="txtEmployerCity" placeholder={t("Enter_Employer_City")} name='city' onChange={(e) => { handleemployerDetails("city", e.target.value) }} />
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlEmployerCountry" className="form-label"><img src={city} className='icnn' alt='' />{t("Employer_Country")}</label>
                                                                <select value={employerDetailsJsonString.countryId} className="form-select form-select-sm" id="ddlEmployerCountry" aria-label=".form-select-sm example" name='countryId' onChange={(e) => { handleemployerDetails("countryId", e.target.value) }}>
                                                                    <option value="0">{t("Select_Employer_Country")}</option>
                                                                    {countryList && countryList.map((list) => {

                                                                        return (
                                                                            <option value={list.id}>{list.countryName}</option>
                                                                        )

                                                                    })}
                                                                </select>
                                                                <small id="errEmployerCountry" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlEmployerState" className="form-label"><img src={city} className='icnn' alt='' />{t("Employer_State")}</label>
                                                                <select value={employerDetailsJsonString.stateId} className="form-select form-select-sm" id="ddlEmployerState" aria-label=".form-select-sm example" name='stateId' onChange={(e) => { handleemployerDetails("stateId", e.target.value) }}>
                                                                    <option value="0">{t("Select_Employer_State")}</option>
                                                                    {stateList && stateList.map((list, index) => {

                                                                        return (
                                                                            <option value={list.id}>{list.stateName}</option>
                                                                        );

                                                                    })}
                                                                </select>
                                                                <small id="errEmployerState" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtEmployerZip" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Employer_Zip")}</label>
                                                                <input type="text" value={employerDetailsJsonString.postalCode} className="form-control form-control-sm" id="txtEmployerZip" placeholder={t("Enter_Employer_Zip")} name='postalCode' onChange={(e) => { handleemployerDetails("postalCode", e.target.value) }} />
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ....................................................................Stats..................................................................... */}


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
                                                                <label htmlFor="ddlEthnicity" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Ethnicity_Name")}</label>
                                                                <select value={statsJsonString.ethinicityId} className="form-select form-select-sm" id="ddlEthnicity" aria-label=".form-select-sm example" name='ethinicityId' onChange={(e) => { handleStatsDetails("ethinicityId", e.target.value) }}>
                                                                    <option value="0">{t("Enter_Ethnicity_Name")}</option>
                                                                    {ethinicityList && ethinicityList.map((list) => {
                                                                        return (
                                                                            <option value={list.id}>{list.ethinicityName}</option>
                                                                        )
                                                                    })}
                                                                </select>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlPreferredLanguage" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Preferred_Language")}</label>
                                                                <select value={statsJsonString.languageId} className="form-select form-select-sm" id="ddlPreferredLanguage" aria-label=".form-select-sm example" name='languageId' onChange={(e) => { handleStatsDetails("languageId", e.target.value) }}>
                                                                    <option value="0">{t("Select_Preferred_Language")}</option>
                                                                    {languageList && languageList.map((list) => {
                                                                        return (
                                                                            <option value={list.id}>{list.languageName}</option>
                                                                        )
                                                                    })}
                                                                </select>
                                                            </div>

                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlRaceType" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Race_Type")}</label>
                                                                <select value={statsJsonString.raceId} className="form-select form-select-sm selectwid" id="ddlRaceType" aria-label=".form-select-sm example" name='raceId' onChange={(e) => { handleStatsDetails("raceId", e.target.value) }}>
                                                                    <option value="0">{t("Select_Race_Type")}</option>
                                                                    {raceTypeList && raceTypeList.map((list) => {
                                                                        return (
                                                                            <option value={list.id}>{list.raceType}</option>
                                                                        )
                                                                    })}
                                                                </select>
                                                            </div>

                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtFamilySize" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Family_Size")}</label>
                                                                <input type="text" value={statsJsonString.familySize} className="form-control form-control-sm" id="txtFamilySize" placeholder={t("ENTER_Family_Size")} name='familySize' onChange={(e) => { handleStatsDetails("familySize", e.target.value) }} />
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtFinancialReviewDate" className="form-label"><img src={calendar} className='icnn' alt='' />{t("Financial Review Date")}</label>
                                                                <input type="date" value={statsJsonString.financialReviewDate} className="form-control form-control-sm" id="txtFinancialReviewDate" placeholder={t("ENTER_Financial_Review_Date")} name='financialReviewDate' onChange={(e) => { handleStatsDetails("financialReviewDate", e.target.value) }} />
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtMonthlyIncome" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Monthly_Income")}</label>
                                                                <input type="number" value={statsJsonString.monthlyIncome} className="form-control form-control-sm" id="txtMonthlyIncome" placeholder={t("Enter_Monthly_Income")} name='monthlyIncome' onChange={(e) => { handleStatsDetails("monthlyIncome", e.target.value) }} />
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtHomeless" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Homeless")}</label>
                                                                <input type="text" value={statsJsonString.homeless} className="form-control form-control-sm" id="txtHomeless" placeholder={t("Enter_Homeless")} name='homeless' onChange={(e) => { handleStatsDetails("homeless", e.target.value) }} />
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtInterpreter" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Interpreter")}</label>
                                                                <input type="text" value={statsJsonString.interpreter} className="form-control form-control-sm" id="txtInterpreter" placeholder={t("Enter_Interpreter")} name='interpreter' onChange={(e) => { handleStatsDetails("interpreter", e.target.value) }} />
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtMigrant" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Migrant")}</label>
                                                                <input type="text" value={statsJsonString.migrant} className="form-control form-control-sm" id="txtMigrant" placeholder={t("Enter_Migrant")} name='migrant' onChange={(e) => { handleStatsDetails("migrant", e.target.value) }} />
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlReferralSource" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Referral_Source")}</label>
                                                                <select value={statsJsonString.referralSourceId} className="form-select form-select-sm selectwid" id="ddlReferralSource" aria-label=".form-select-sm example" name='referralSourceId' onChange={(e) => { handleStatsDetails("referralSourceId", e.target.value) }}>
                                                                    <option value="0">{t("Select Referral Source")}</option>
                                                                    {referralList && referralList.map((list) => {
                                                                        return (
                                                                            <option value={list.id}>{list.name}</option>
                                                                        )
                                                                    })}
                                                                </select>
                                                            </div>

                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlVFC" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("VFC")}</label>
                                                                <select value={statsJsonString.isVFCEligible} className="form-select form-select-sm selectwid" id="ddlVFC" aria-label=".form-select-sm example" name='isVFCEligible' onChange={(e) => { handleStatsDetails("isVFCEligible", e.target.value) }}>
                                                                    <option value="0">{t("Select_VFC")}</option>
                                                                    <option value="1">Unassigned</option>
                                                                    <option value="2">Eligible</option>
                                                                    <option value="3">Ineligible</option>

                                                                </select>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="ddlReligion" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Religion")}</label>
                                                                <select value={statsJsonString.religionId} className="form-select form-select-sm selectwid" id="ddlReligion" aria-label=".form-select-sm example" name='religionId' onChange={(e) => { handleStatsDetails("religionId", e.target.value) }}>
                                                                    <option value="0">{t("Select_Religion")}</option>
                                                                    {religionList && religionList.map((list) => {
                                                                        return (
                                                                            <option value={list.id}>{list.name}</option>
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

                                {/* ....................................................................Insurance..................................................................... */}


                                <div className="inner-content mb-2">
                                    <div className="row">
                                        <div className="accordion accordionPatientRaceSection" id="accordionExample">
                                            <div className="accordion-item position-relative">
                                                <h2 className="accordion-header otherinfo ">
                                                    <span className='collapsetxt'> {t("Insurance")}</span>
                                                    <span
                                                        className="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#insurance"
                                                        aria-expanded="false"
                                                        aria-controls="insurance"
                                                    >
                                                    </span>
                                                </h2>
                                                <div
                                                    id="insurance"
                                                    className="accordion-collapse collapse show1"
                                                    data-bs-parent="#accordionExample"

                                                >
                                                    <div className="accordion-body">
                                                        <div className="dflex">
                                                            <InsuranceDetails setClearStatus={setClearStatus} clearStatus={clearStatus} onInsuranceDetailsChange={setInsuranceDetailsJsonString} getInsuranceDetailsPrimary={setInsuranceDetailsPrimary} getInsuranceDetailsSecondry={setInsuranceDetailsSecondry} getInsuranceDetailsTertiary={setInsuranceDetailsTertiary} />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ....................................................................Misc_Information..................................................................... */}


                                <div className="inner-content mb-2">
                                    <div className="row">
                                        <div className="accordion accordionPatientRaceSection" id="accordionExample">
                                            <div className="accordion-item position-relative">
                                                <h2 className="accordion-header otherinfo ">
                                                    <span className='collapsetxt'> {t("Misc Information")}</span>
                                                    <span
                                                        className="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#miscInfo"
                                                        aria-expanded="false"
                                                        aria-controls="miscInfo"
                                                    >

                                                    </span>
                                                </h2>
                                                <div
                                                    id="miscInfo"
                                                    className="accordion-collapse collapse show1"
                                                    data-bs-parent="#accordionExample"

                                                >
                                                    <div className="accordion-body">
                                                        <div className="dflex">
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtDateDeceased" className="form-label"><img src={calendar} className='icnn' alt='' />{t("Date Deceased")}</label>
                                                                <input type="date" value={registrationObj.deceasedDate} className="form-control form-control-sm" id="txtDateDeceased" placeholder={t("Date Deceased")} name='deceasedDate' onChange={(e) => { handlerChange2("deceasedDate", e.target.value) }} />
                                                                <small id="errDateDeceased" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>
                                                            <div className="col-2 mb-2">
                                                                <label htmlFor="txtReasonDeceased" className="form-label"><img src={identityIcon} className='icnn' alt='' />{t("Reason Deceased")}</label>
                                                                <input type="text" value={registrationObj.deceasedReason} className="form-control form-control-sm" id="txtReasonDeceased" placeholder={t("Reason Deceased")} name='deceasedReason' onChange={(e) => { handlerChange2("deceasedReason", e.target.value) }} />
                                                                <small id="errReasonDeceased" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ....................................................................Visit Details..................................................................... */}

                                <div className="inner-content mb-2">
                                    <div className="row">
                                        <div className="accordion accordionPatientRaceSection" id="accordionExample">
                                            <div className="accordion-item position-relative">
                                                <h2 className="accordion-header otherinfo ">
                                                    <span className='collapsetxt'> {t("Visit Details")}</span>
                                                    <span
                                                        className="accordion-button collapsed"
                                                        type="button"
                                                        data-bs-toggle="collapse"
                                                        data-bs-target="#visitDetails"
                                                        aria-expanded="false"
                                                        aria-controls="miscInfo"
                                                    >

                                                    </span>
                                                </h2>
                                                <div
                                                    id="visitDetails"
                                                    className="accordion-collapse collapse show1"
                                                    data-bs-parent="#accordionExample"

                                                >
                                                    <div className="accordion-body">
                                                        <VisitDetails visitDetailsData={setVisitDetails} issueDetailData={setIssueDetails} issueDetails={issueDetails} />

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                {/* ....................................................................Guardian_Details..................................................................... */}


                                <div class="fieldsett-in">
                                    <div class="fieldsett">
                                        <span class="fieldse">{t("Guardian_Details")}</span>
                                        {/* <Heading text={t("Guardian_Details")} /> */}
                                        <div className="inner-content">
                                            <div className="dflex">
                                                <div className="col-2">
                                                    <label htmlFor="txtGuardianName" className="form-label"><img src={ageIcon} className='icnn' />{t("NAME")}</label>
                                                    <input type="Name" value={registrationObj.guardiansName} className="form-control form-control-sm" id="txtGuardianName" placeholder={t("Name")} name='guardiansName' onChange={(e) => { handlerChange2("guardiansName", e.target.value) }} />
                                                </div>
                                                <div className="col-2 mb-2">
                                                    <label htmlFor="txtPatientRelationship" className="form-label"><img src={IconPatientRelation} className='icnn' />{t("Select_Relation_Relationship_To_Patient")}</label>
                                                    {/* <input type="text" className="form-control form-control-sm" id="txtRelationshipToPatient" placeholder="Enter Relationship" name='guardianRelationToPatient' value={guardianRelationToPatient} onChange={handlerChange} /> */}
                                                    <select value={registrationObj.guardianrelationship} className="form-select form-select-sm" id="ddlRelationToPat" aria-label=".form-select-sm example" name='guardianrelationship' onChange={(e) => { handlerChange2("guardianrelationship", e.target.value) }} >
                                                        <option value="0">{t("Select_Relation")}</option>
                                                        {guardianRelationList && guardianRelationList.map((list) => {
                                                            return (
                                                                <option value={list.id}>{list.guardianRelationName}</option>
                                                            )
                                                        })}
                                                    </select>


                                                </div>
                                                <div className="col-2 mb-2">
                                                    <label htmlFor="txtGaurdianGender" className="form-label"><img src={IconPatientRelation} className='icnn' />{t("Select Gaurdian Gender")}</label>
                                                    {/* <input type="text" className="form-control form-control-sm" id="txtRelationshipToPatient" placeholder="Enter Relationship" name='guardianRelationToPatient' value={guardianRelationToPatient} onChange={handlerChange} /> */}
                                                    <select value={registrationObj.genderId} className="form-select form-select-sm" id="ddlGaurdian_Gender" aria-label=".form-select-sm example" name='genderId' onChange={(e) => { handlerChange2("genderId", e.target.value) }} >
                                                        <option value="0">{t("Select Gaurdian Gender")}</option>
                                                        {genderList && genderList.map((list) => {
                                                            return (
                                                                <option value={list.id}>{list.name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>

                                                <div className="col-2 mb-2">
                                                    <label htmlFor="txtPatientRelationAddress" className="form-label"><img src={addressIcon} className='icnn' />{t("Address")}</label>
                                                    <input type="text" value={registrationObj.guardianAddress} className="form-control form-control-sm" id="txtPatientRelationAddress" placeholder={t("Enter_Address")} name='guardianAddress' onChange={(e) => { handlerChange2("guardianAddress", e.target.value) }} />
                                                </div>
                                                <div className="col-2 mb-2">
                                                    <label htmlFor="txtPatientRelationMobNo" className="form-label"><img src={smartphone} className='icnn' />{t("MOBILE_NUMBER")}</label>
                                                    <input type="number" value={registrationObj.guardianMobileNo} className="form-control form-control-sm" id="txtPatientRelationMobNo" placeholder={t("Mobile_Number")} name='guardianMobileNo' onChange={(e) => { handlerChange2("guardianMobileNo", e.target.value) }} />
                                                </div>

                                                <div className="col-2 mb-2">
                                                    <label htmlFor="txtPatientRelationWorkPhone" className="form-label"><img src={smartphone} className='icnn' />{t("Work_Phone")}</label>
                                                    <input type="number" value={registrationObj.guardianworkphone} className="form-control form-control-sm" id="txtPatientRelationMobNo" placeholder={t("Work_Phone")} name='guardianworkphone' onChange={(e) => { handlerChange2("guardianworkphone", e.target.value) }} />
                                                </div>

                                                <div className="col-2 mb-2">
                                                    <label htmlFor="txtPatientRelationEmail" className="form-label"><img src={emailIcon} className='icnn' />{t("Email")}</label>
                                                    <input type="email" value={registrationObj.guardianemail} className="form-control form-control-sm" id="txtPatientRelationEmail" placeholder={t("ENTER_EMAIL_ID")} name='guardianemail' onKeyPress={(e) => {
                                                        if (e.key === ' ') {
                                                            e.preventDefault();
                                                        }
                                                    }} onChange={(e) => { handlerChange2("guardianemail", e.target.value) }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ....................................................................Payment_Type..................................................................... */}


                                {/* <div className="inner-content mb-2">
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
                                                        {t("Payment_Type")}
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
                                                                        <input type="number" className='registrationinput ps-2' id="txtCashPayment" name='cashpayment' placeholder='Enter Payment' value={cashpayment} onChange={(e) => { handlerChange2("occupation", e.target.value) }} />
                                                                    </div>
                                                                </>
                                                                : ''}

                                                            {paymentType === 2 ?
                                                                <>
                                                                    <div className="col-2 mb-2">
                                                                        <label htmlFor="ddlInsuranceCompany" className="form-label">{t("Insurance_Company")}</label>
                                                                        <select value={insuranceCompany} name="insuranceCompany" className="form-select form-select-sm" id="ddlInsuranceCompany" aria-label=".form-select-sm example" onChange={(e) => { handlerChange2("occupation", e.target.value) }} >
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
                                </div> */}


                                <div class="fieldsett-in">
                                    <div class="fieldsett">
                                        <span class="fieldse">{t("Appointment_Details")}</span>
                                        {/* <Heading text={t("Appointment_Details")} /> */}
                                        <div className="inner-content">
                                            <div className="dflex row1">
                                                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-2">
                                                    <label htmlFor="ddlDepartment" className="form-label"><img src={medicalAssistance} className='icnn' />{t("Department")}<span class="starMandatory">*</span></label>
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
                                                    <label htmlFor="ddlDoctor" className="form-label"><img src={medicalAssistance} className='icnn' />{t("Doctor/Consultant")}<span class="starMandatory">*</span></label>
                                                    <select className="form-select form-select-sm" id="ddlDoctor" name='doctor' onChange={getSelectedDoctor} aria-label=".form-select-sm example">
                                                        <option value="0">{t("selectDoctor")}</option>
                                                        {/* {doctorList && doctorList.map((list) => {
                                                            return (
                                                                <option value={list.id}>{list.titleName !== null ? list.titleName + ' ' + list.name : list.name}</option>
                                                            )
                                                        })
                                                        } */}
                                                        {providerList && providerList.map((list) => {
                                                            return (
                                                                <option value={list.id}>{list.name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    <small id="errDoctor" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-2">
                                                    <label htmlFor="ddlRoomNo" className="form-label"><img src={roomIcon} className='icnn' />{t("Room_Number")}<span class="starMandatory">*</span></label>
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
                                                                <button type="button" className="btn btn-save btn-save-fill btn-sm  me-1" id='btnSave' onClick={saveButtonObjCheck}><img src={saveButtonIcon} className='icnn' />{t("Save")}</button></> : ''}
                                                            {isEdit === true ? <button type="button" className="btn btn-save btn-save-fill btn-sm  me-1" id='btnUpdate' onClick={handleUpdate}><img src={saveButtonIcon} className='icnn' />{t("UPDATE")}</button> : ''}
                                                            {showEdit === true ? <button type="button" className="btn btn-save btnbluehover btn-sm  me-1" id='btnEdit' onClick={handleEdit}><img src={clearIcon} className='icnn' />{t("Edit")}</button> : ''}
                                                            <button type="button" className="btn btn-save btnbluehover btn-sm  me-1" id='btnClear' onClick={handleClear}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
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
                        <SuccessToster handle={setShowToster} message="Data save successfully !!" /> : ""
                }
                {
                    showToster === 2 ?
                        <SuccessToster handle={setShowToster} message="Saved successfully !!" /> : ""
                }

                {
                    showAlertToster === 1 ?
                        <AlertToster handle={setShowAlertToster} message={showMessage} /> : ""
                }
                {
                    showAlertToster === 2 ?
                        <AlertToster handle={setShowAlertToster} message="Atleast one field is required" /> : ""
                }
            </section>


            {/* ######################## Moodal Pop Area For Add Privious Names #################### */}
            {showPreviousNamesPopUp == true ?
                <div className={`modal d-${showPreviousNamesPopUp == true ? "block" : ""}`} id="modalSetting" data-bs-backdrop="static">
                    <div className="modal-dialog" style={{ maxWidth: '60vw' }}>
                        <div className="modal-content p-0">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">Add Previous Name</h1>
                                <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title='Close Window' onClick={() => { setShowPreviousNamesPopUp(false) }}><i className="fa fa-times"></i></button>
                            </div>
                            <div className="modal-body p-0_">
                                <div className="dflex">
                                    <div className="col-2 mb-2">
                                        <label htmlFor="txtPreviousNamePrefix" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("PreviousNamePrefix")}</label>
                                        <input type="text" className="form-control form-control-sm" id="txtPreviousNamePrefix" placeholder={t("ENTER_Previous_Name_Prefix")} name='previousNamePrefix' />
                                    </div>
                                    <div className="col-2 mb-2">
                                        <label htmlFor="txtPreviousNameFirst" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("PreviousNameFirst")}</label>
                                        <input type="text" className="form-control form-control-sm" id="txtPreviousNameFirst" placeholder={t("ENTER_Previous_Name_First")} name='previousNameFirst' />
                                    </div>
                                    <div className="col-2 mb-2">
                                        <label htmlFor="txtPreviousNameMiddle" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("PreviousNameMiddle")}</label>
                                        <input type="text" className="form-control form-control-sm" id="txtPreviousNameMiddle" placeholder={t("ENTER_Previous_Name_Middle")} name='previousNameMiddle' />
                                    </div>
                                    <div className="col-2 mb-2">
                                        <label htmlFor="txtPreviousNameLast" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("PreviousNameLast")}</label>
                                        <input type="text" className="form-control form-control-sm" id="txtPreviousNameLast" placeholder={t("ENTER_Previous_Name_Last")} name='previousNameLast' />
                                    </div>
                                    <div className="col-2 mb-2">
                                        <label htmlFor="txtPreviousNameSuffix" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("PreviousNameSuffix")}</label>
                                        <input type="text" className="form-control form-control-sm" id="txtPreviousNameSuffix" placeholder={t("ENTER_Previous_Name_Suffix")} name='previousNameSuffix' />
                                    </div>
                                    <div className="col-2 mb-2">
                                        <label htmlFor="txtPreviousNameEndDate" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("PreviousNameEndDate")}</label>
                                        <input type="date" className="form-control form-control-sm" id="txtPreviousNameEndDate" placeholder={t("ENTER_Previous_Name_End_Date")} name='previousNameEndDate' />
                                    </div>
                                    <div className="col-2 mb-2">
                                        <label className="form-label d-block">&nbsp;</label>
                                        <button type="button" className="btn btn-save btn-save-fill btn-sm  me-1" id='btnSave' onClick={savePriviousName}><img src={saveButtonIcon} className='icnn' />{t("Save")}</button></div>
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
