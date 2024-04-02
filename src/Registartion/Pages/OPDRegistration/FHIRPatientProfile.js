import React, { useEffect, useState } from 'react'
import ageIcon from '../../../assets/images/icons/ageIcon.svg';
import patientOPD from '../../../assets/images/icons/patientOPD.svg';
import calendar from '../../../assets/images/icons/calendar.svg';
import genderIcon from '../../../assets/images/icons/genders.svg';
import smartphone from '../../../assets/images/icons/smartphone.svg';
import IconPatientRelation from '../../../assets/images/icons/IconPatientRelation.svg';
import addressIcon from '../../../assets/images/icons/addressIcon.svg';
import emailIcon from '../../../assets/images/icons/email.svg';
import clearIcon from '../../../assets/images/icons/clear.svg';
import saveButtonIcon from '../../../assets/images/icons/saveButton.svg';
import { t } from 'i18next';
import GetGender from '../../API/GET/GetGender';
import GetAllGenderIdentities from '../../API/GET/GetAllGenderIdentities';
import GetMaritalStatusList from '../../API/GET/GetMaritalStatusList';
import GetAllTitleForPatient from '../../API/GET/GetAllTitleForPatient';
import GetCountryList from '../../API/GET/GetCountryList';
import GetAllSexualOrientation from '../../API/GET/GetAllSexualOrientation';
import GetAllGuardianRelation from '../../API/GET/GetAllGuardianRelation';
import { useNavigate } from 'react-router-dom';
import GetFHIRDemographicData from './UserProfile/API/GetFHIRDemographicData';
import GetRaceType from '../../API/GET/GetRaceType';
import GetEthinicity from '../../API/GET/GetEthinicity';
import GetLanguage from '../../API/GET/GetLanguage';
import GetAllReferralSourceData from '../../API/GET/GetAllReferralSourceData';
import GetAllReligionData from '../../API/GET/GetAllReligionData';
import UpdateDemographicData from '../../API/UPDATE/UpdateDemographicData';
import SuccessToster from '../../../Component/SuccessToster';
import AlertToster from '../../../Component/AlertToster';

function FHIRPatientProfile() {
    let [countryList, setCountryList] = useState([]);
    let [titleList, setTitleList] = useState([]);
    let [sexualOrientationlist, setSexualOrientationlist] = useState([]);
    let [maritalStatusList, setMaritalStatusList] = useState([]);
    let [getPatientGender, setGetPatientGender] = useState([]);
    let [getPatientGenderIdentities, setGetPatientGenderIdentities] = useState([]);
    let [ethinicityList, setEthinicityList] = useState([])
    let [languageList, setLanguageList] = useState([])
    let [raceTypeList, setRaceTypeList] = useState([])
    let [referralList, setReferralList] = useState([])
    let [religionList, setReligionList] = useState([]);
    let [guardianRelationList, setGuardianRelationList] = useState([]);
    let [genderList, setGenderList] = useState([]);
    let [updateBool, setUpdateBool] = useState(0)
    let [statsId, setStatsId] = useState(1)
    let [showdisabled, setShowDisabled] = useState(1)
    let [patientData, setPatientData] = useState([]);
    let [patientStatsData, setPatientStatsData] = useState([]);
    let [showToster, setShowToster] = useState(0);
    let [isShowToaster, setisShowToaster] = useState(0);
    let [showAlertToster, setShowAlertToster] = useState(0);
    let [showErrMessage, setShowErrMessage] = useState('');
    let [showSuccessMsg, setShowSuccessMsg] = useState('');
    let navigate = useNavigate()
    const activePatient = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
    const today = new Date().toISOString().split('T')[0];
    const [patientDetails, setPatientDetails] = useState({
        mobileNo: '',
        titleId: 0,
        patientName: '',
        middleName: '',
        lastName: '',
        nameSuffix: '',
        birthFirstName: '',
        birthMiddleName: '',
        birthLastName: '',
        dob: '',
        age: '',
        ageUnitId: 0,
        sexualOrientationId: 0,
        externalId: '',
        socialSecurityNo: '',
        driversLicense: '',
        maritalStatusId: 0,
        billingNote: '',
        previousNamesJsonString: '[]',
        genderId: 0,
        genderidentityId: 0
    });
    const [characterValidation, setCharacterValidation] = useState({
        patientName: '',
        middleName: '',
        lastName: '',
        nameSuffix: '',
        birthFirstName: '',
        birthMiddleName: '',
        birthLastName: '',
        externalId: '',
        socialSecurityNo: '',
        driversLicense: '',
        billingNote: '',
    });
    const [statsJsonString, setStatsJsonString] = useState({
        id: 0,
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
    const [registrationObj, setRegistrationObj] = useState({
        guardiansName: '',
        guardianrelationship: '',
        genderId: '',
        guardianAddress: '',
        guardianMobileNo: '',
        guardianworkphone: '',
        guardianemail: ''
    });

    let getCountryList = async () => {

        let response = await GetCountryList();

        if (response.status === 1) {
            setCountryList(response.responseValue);
        }
    }
    let getAllSexualOrientation = async () => {
        const response = await GetAllSexualOrientation();
        if (response.status === 1) {
            setSexualOrientationlist(response.responseValue);
        }
    }
    let getTitle = async () => {
        const response = await GetAllTitleForPatient();
        if (response.status === 1) {
            setTitleList(response.responseValue);
        }
    }
    let getMaritalStatusList = async () => {
        const response = await GetMaritalStatusList();
        if (response.status === 1) {
            setMaritalStatusList(response.responseValue);
        }
    }
    let getAllGender = async () => {
        const response = await GetGender();
        if (response.status === 1) {
            setGetPatientGender(response.responseValue)
        }

    }
    let getAllGenderIdentities = async () => {
        const response = await GetAllGenderIdentities();
        if (response.status === 1) {
            setGetPatientGenderIdentities(response.responseValue)
        }
    }
    const getGuardianRelationList = async () => {
        const response = await GetAllGuardianRelation()
        if (response.status === 1) {
            setGuardianRelationList(response.responseValue)

        }
    }
    const GetGenderList = async () => {
        let response = await GetGender()
        if (response.status === 1) {
            setGenderList(response.responseValue)

        }
    }
    let getFHIRDemographicList = async () => {
        const param = {
            Uhid: activePatient
        }
        const response = await GetFHIRDemographicData(param);
        if (response.status === 1) {
            setPatientData(response.responseValue.patientregistration[0])
            if (response.responseValue.patientstats.length > 0) {
                setPatientStatsData(response.responseValue.patientstats[0])
            }
        }

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
    const getreferralList = async () => {
        let response = await GetAllReferralSourceData()
        if (response.status === 1) {
            setReferralList(response.responseValue)
        }
    }
    let getRelgionList = async () => {
        const response = await GetAllReligionData();
        if (response.status === 1) {
            setReligionList(response.responseValue);
        }
    }
    let handleEdit = () => {
        setUpdateBool(1)
        setShowDisabled(0)
    }
    let handleUpdate = async () => {

        setUpdateBool(0)
        setShowDisabled(1)
        const updateDataObj = {
            ...patientDetails,
            ...registrationObj,
            statsJsonString: JSON.stringify([statsJsonString])
        }

        // return
        const response = await UpdateDemographicData(updateDataObj);
        if (response.status === 1) {
            setisShowToaster(1);
            setShowSuccessMsg('Updated successfully..!!');
            getFHIRDemographicList();
            setTimeout(() => {
                setisShowToaster(0);
            }, 2000)
        }
        else {
            setShowAlertToster(1);
            setShowErrMessage(response.responseValue);
        }
    }

    let handleBack = () => {

        navigate("/opdpatientlist/")
    }

    let handlePatientDetailsChange = (e) => {
        const ageUnit = document.getElementById('ddlAgeUnit').value;
        const { name, value } = e.target
        handleAgeUnit(ageUnit)
        setPatientDetails((prev) => ({
            ...prev,
            [name]: value,
            ageUnitId: ageUnit
        }))
    }
    let handleStatsDetails = (e, value) => {
        setStatsJsonString((prev) => ({
            ...prev,
            [e]: value,
        }))
    }
    let handleGuardianDetails = (e, value) => {
        setRegistrationObj((prev) => ({
            ...prev,
            [e]: value,
        }))
    }

    let handleClear = () => {
        setPatientDetails({
            mobileNo: '',
            titleId: '',
            patientName: '',
            middleName: '',
            lastName: '',
            nameSuffix: '',
            birthFirstName: '',
            birthMiddleName: '',
            birthLastName: '',
            dob: '',
            age: '',
            ageUnitId: '',
            sexualOrientationId: '',
            externalId: '',
            socialSecurityNo: '',
            driversLicense: '',
            maritalStatusId: '',
            billingNote: '',
            genderId: '',
            genderidentityId: ''
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
            isVFCEligible: '',
            religionId: '',
        })
        setRegistrationObj({
            guardiansName: '',
            guardianrelationship: '',
            genderId: '',
            guardianAddress: '',
            guardianMobileNo: '',
            guardianworkphone: '',
            guardianemail: ''
        })
    }
    let getPatientAge = (e) => {
        const { name, value } = e.target;
        document.getElementById("errPatientDob").style.display = "none";
        document.getElementById("ddlAgeUnit").value = "1";
        const val = document.getElementById('txtDob').value;
        setPatientDetails((prevPatientDetails) => ({
            ...prevPatientDetails,
            ["dob"]: val,

        }));
        // setDob(val);            
        let today = new Date();
        let birthDate = new Date(val);
        let getAge = today.getFullYear() - birthDate.getFullYear();
        let getMonth = today.getMonth() - birthDate.getMonth();
        if (getMonth < 0 || (getMonth === 0 && today.getDate() - birthDate.getDate())) {
            getAge--;
        }
        // setPatientAge(getAge);
        setPatientDetails((prevPatientDetails) => ({
            ...prevPatientDetails,
            age: getAge,
        }));
    }

    let getPatientDobByAge = (e) => {
        document.getElementById("errPatientDob").style.display = "none"
        if (e.target.value > 0) {
            // setPatientAge(e.target.value);
            setPatientDetails((prevPatientDetails) => ({
                ...prevPatientDetails,
                age: e.target.value,
            }));
            const value = document.getElementById("ddlAgeUnit").value;
            handleAgeUnit(value)
        }
        else {
            // setPatientAge("");
            setPatientDetails((prevPatientDetails) => ({
                ...prevPatientDetails,
                dob: '',
                age: ''
            }));
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
            // setDob(DOB)
            setPatientDetails((prevPatientDetails) => ({
                ...prevPatientDetails,
                ["dob"]: DOB,
            }));
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
                        // setDob(DOB)
                        setPatientDetails((prevPatientDetails) => ({
                            ...prevPatientDetails,
                            ["dob"]: DOB,
                        }));
                    }
                    else {
                        month = (nowMonth + 12) - (age % 12);
                        // DOB =  parseInt(year - 1)+ "-" + month + "-" +nowDay ;
                        var yyyy = parseInt(year - 1);
                        var mm = month.toString().length === 2 ? month : '0' + month;
                        var dd = nowDay.toString().length === 2 ? nowDay : '0' + nowDay;
                        var getDob = yyyy + '-' + mm + '-' + dd;
                        DOB = getDob;
                        // setDob(DOB)
                        setPatientDetails((prevPatientDetails) => ({
                            ...prevPatientDetails,
                            ["dob"]: DOB,
                        }));
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
                    // setDob(DOB)
                    setPatientDetails((prevPatientDetails) => ({
                        ...prevPatientDetails,
                        ["dob"]: DOB,
                    }));
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
                // setDob(DOB)
                setPatientDetails((prevPatientDetails) => ({
                    ...prevPatientDetails,
                    ["dob"]: DOB,
                }));
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
            // setDob(DOB)
            setPatientDetails((prevPatientDetails) => ({
                ...prevPatientDetails,
                ["dob"]: DOB,
            }));
        }
    }
    useEffect(() => {
        setPatientDetails({
            id: patientData.id && patientData.id !== '' ? patientData.id : '',
            mobileNo: patientData.mobileNo && patientData.mobileNo !== '' ? patientData.mobileNo : '',
            titleId: patientData.titleId && patientData.titleId !== '' ? patientData.titleId : '',
            patientName: patientData.patientName && patientData.patientName !== '' ? patientData.patientName : '',
            middleName: patientData.middleName && patientData.middleName !== '' ? patientData.middleName : '',
            lastName: patientData.lastName && patientData.lastName !== '' ? patientData.lastName : '',
            nameSuffix: patientData.nameSuffix && patientData.nameSuffix !== '' ? patientData.nameSuffix : '',
            birthFirstName: patientData.birthFirstName && patientData.birthFirstName !== '' ? patientData.birthFirstName : '',
            birthMiddleName: patientData.birthMiddleName && patientData.birthMiddleName !== '' ? patientData.birthMiddleName : '',
            birthLastName: patientData.birthLastName && patientData.birthLastName !== '' ? patientData.birthLastName : '',
            dob: patientData.dob && patientData.dob !== '' ? patientData.dob : '',
            age: patientData.age && patientData.age !== '' ? patientData.age : '',
            ageUnitId: patientData.ageUnitId && patientData.ageUnitId !== '' ? patientData.ageUnitId : '',
            sexualOrientationId: patientData.sexualOrientationId && patientData.sexualOrientationId !== '' ? patientData.sexualOrientationId : 0,
            externalId: patientData.externalId && patientData.externalId !== '' ? patientData.externalId : '',
            driversLicense: patientData.drivers_license && patientData.drivers_license !== '' ? patientData.drivers_license : '',
            socialSecurityNo: patientData.socialSecurityNo && patientData.socialSecurityNo !== '' ? patientData.socialSecurityNo : '',
            maritalStatusId: patientData.maritalStatusId && patientData.maritalStatusId !== '' ? patientData.maritalStatusId : 0,
            billingNote: patientData.billing_note && patientData.billing_note !== '' ? patientData.billing_note : '',
            genderId: patientData.genderId && patientData.genderId !== '' ? patientData.genderId : '',
            genderidentityId: patientData.genderidentityId && patientData.genderidentityId !== '' ? patientData.genderidentityId : ''
        })
        setStatsJsonString({
            id: patientStatsData.id && patientStatsData.id !== 0 ? patientStatsData.id : '',
            ethinicityId: patientStatsData.ethinicityId && patientStatsData.ethinicityId !== 0 ? patientStatsData.ethinicityId : '',
            languageId: patientStatsData.languageId && patientStatsData.languageId !== 0 ? patientStatsData.languageId : '',
            raceId: patientStatsData.raceId && patientStatsData.raceId !== 0 ? patientStatsData.raceId : '',
            familySize: patientStatsData.familySize && patientStatsData.familySize !== '' ? patientStatsData.familySize : '',
            financialReviewDate: patientStatsData.financialReviewDate1 && patientStatsData.financialReviewDate1 !== '' ? patientStatsData.financialReviewDate1 : '',
            monthlyIncome: patientStatsData.monthlyIncome && patientStatsData.monthlyIncome !== '' ? patientStatsData.monthlyIncome : '',
            homeless: patientStatsData.homeless && patientStatsData.homeless !== '' ? patientStatsData.homeless : '',
            interpreter: patientStatsData.interpreter && patientStatsData.interpreter !== '' ? patientStatsData.interpreter : '',
            migrant: patientStatsData.migrant && patientStatsData.migrant !== '' ? patientStatsData.migrant : '',
            referralSourceId: patientStatsData.referralSourceId && patientStatsData.referralSourceId !== 0 ? patientStatsData.referralSourceId : '',
            isVFCEligible: patientStatsData.isVFCEligible && patientStatsData.isVFCEligible !== '' ? patientStatsData.isVFCEligible : '',
            religionId: patientStatsData.religionId && patientStatsData.religionId !== 0 ? patientStatsData.religionId : '',
        })
        setRegistrationObj({
            guardiansName: patientData.guardiansname && patientData.guardiansname !== '' ? patientData.guardiansname : '',
            guardianrelationship: patientData.guardianrelationship && patientData.guardianrelationship !== '' ? patientData.guardianrelationship : '',
            genderId: patientData.genderId && patientData.genderId !== '' ? patientData.genderId : '',
            guardianAddress: patientData.guardianAddress && patientData.guardianAddress !== '' ? patientData.guardianAddress : '',
            guardianMobileNo: patientData.guardianMobileNo && patientData.guardianMobileNo !== '' ? patientData.guardianMobileNo : '',
            guardianworkphone: patientData.guardianworkphone && patientData.guardianworkphone !== '' ? patientData.guardianworkphone : '',
            guardianemail: patientData.guardianemail && patientData.guardianemail !== '' ? patientData.guardianemail : '',
        })
    }, [patientData, patientStatsData])

    useEffect(() => {
        getFHIRDemographicList();
        getCountryList();
        getAllSexualOrientation();
        getTitle();
        getMaritalStatusList();
        getAllGender();
        getAllGenderIdentities();
        getGuardianRelationList();
        GetGenderList();
        getRaceTypeList();
        getEthinicityIdList();
        getLanguageList();
        getreferralList();
        getRelgionList();
    }, [])

    return (
        <>
            <section className="main-content mt-5 pt-3">
                <div className="container-fluid">
                    <div className="row ">
                        <div class="col-12">
                            <div class="med-box commong">
                                <div className="title">Patient Profile</div>
                            </div>
                        </div>
                        <div className="col-12">
                            <div className="med-box" style={{ border: 'transparent' }}>
                                <div class="fieldsett-in">
                                    <div class="fieldsett">
                                        <span class="fieldse">{t("Patient_Details")}</span>
                                        <div className="inner-content">
                                            <div className="dflex regEqualColums1">
                                                <div className="col-1 mb-2">
                                                    <label htmlFor="txtMobileNo" className="form-label relative">
                                                        <img src={smartphone} className='icnn' alt='' />
                                                        {t("MOBILE_NUMBER")}<span class="starMandatory">*</span></label>

                                                    <div className='lft'>
                                                        <select disabled className="form-select form-select-sm" id='ddlCountryCode' aria-label=".form-select-sm example" style={{ borderRight: 'transparent', borderTopRightRadius: '0px', borderBottomRightRadius: '0px', width: '80px', padding: '0 5px 0 5px' }}>
                                                            {countryList && countryList.map((list, index) => {
                                                                if (list.id === 101) {
                                                                    return (<option value={list.id} selected>{list.countryCode}</option>);
                                                                }
                                                                else {
                                                                    return (
                                                                        <option value={list.id}>{list.countryCode}</option>
                                                                    );
                                                                }
                                                            })}
                                                        </select>
                                                        <input type="number" disabled={showdisabled === 1} className="form-control form-control-sm" id="txtMobileNo" placeholder={t("Mobile_Number")} name='mobileNo' value={patientDetails.mobileNo} onChange={handlePatientDetailsChange} style={{ borderLeft: 'transparent', borderTopLeftRadius: '0px', borderBottomLeftRadius: '0px' }} />


                                                    </div>
                                                    <small id="errMobile" className="form-text text-danger" style={{ display: 'none' }}>
                                                    </small>
                                                </div>
                                                <div className="col-1 mb-2">
                                                    <label htmlFor="ddlTitle" className="form-label relative"><img src={ageIcon} className='icnn' alt='' />{t("PatientTitle")}                <span class="starMandatory">*</span>
                                                    </label>
                                                    <select disabled={showdisabled === 1} className="form-select form-select-sm" id="ddlTitle" aria-label=".form-select-sm example" name='titleId' value={patientDetails.titleId} onChange={handlePatientDetailsChange}>
                                                        <option value="0" selected>Select Title</option>
                                                        {titleList && titleList.map((list) => {
                                                            return (
                                                                <option value={list.id}>{list.name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    <small id="errTitle" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-2 mb-2">
                                                    <label htmlFor="txtPatientFirstName" className="form-label relative"><img src={patientOPD} className='icnn' alt='' />{t("PatientFirstName")}<span class="starMandatory">*</span></label>
                                                    <input type="text" disabled={showdisabled === 1} className={`form-control form-control-sm ${characterValidation.patientName ? 'is-invalid' : ''}`} id="txtPatientFirstName" placeholder={t("Enter_Patient_First_Name")} name='patientName' value={patientDetails.patientName} onChange={handlePatientDetailsChange} />
                                                    {characterValidation.patientName && <div className="invalid-feedback">{characterValidation.patientName}</div>}
                                                    <small id="errPatientFirstName" className="form-text text-danger" style={{ display: 'none' }}>
                                                    </small>
                                                </div><div className="col-2 mb-2">
                                                    <label htmlFor="txtPatientMiddleName" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("PatientMiddleName")}</label>
                                                    <input type="text" disabled={showdisabled === 1} className={`form-control form-control-sm ${characterValidation.middleName ? 'is-invalid' : ''}`} id="txtPatientMiddleName" placeholder={t("Enter_Patient_Middle_Name")} name='middleName' value={patientDetails.middleName} onChange={handlePatientDetailsChange} />
                                                    {characterValidation.middleName && <div className="invalid-feedback">{characterValidation.middleName}</div>}
                                                    <small id="errPatientMiddleName" className="form-text text-danger" style={{ display: 'none' }}>
                                                    </small>
                                                </div><div className="col-2 mb-2">
                                                    <label htmlFor="txtPatientLastName" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("PatientLastName")}<span class="starMandatory">*</span></label>
                                                    <input type="text" disabled={showdisabled === 1} className={`form-control form-control-sm ${characterValidation.lastName ? 'is-invalid' : ''}`} id="txtPatientLastName" placeholder={t("Enter_Patient_Last_Name")} name='lastName' value={patientDetails.lastName} onChange={handlePatientDetailsChange} />
                                                    {characterValidation.lastName && <div className="invalid-feedback">{characterValidation.lastName}</div>}
                                                    <small id="errPatientLastName" className="form-text text-danger" style={{ display: 'none' }}>
                                                    </small>
                                                </div>

                                                <div className="col-2 mb-2">
                                                    <label htmlFor="txtBirthFirstName" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("BirthFirstName")}</label>
                                                    <input type="text" disabled={showdisabled === 1} className={`form-control form-control-sm ${characterValidation.birthFirstName ? 'is-invalid' : ''}`} id="txtBirthFirstName" placeholder={t("Enter_Birth_First_Name")} name='birthFirstName' value={patientDetails.birthFirstName} onChange={handlePatientDetailsChange} />
                                                    {characterValidation.birthFirstName && <div className="invalid-feedback">{characterValidation.birthFirstName}</div>}
                                                    <small id="errBirthFirstName" className="form-text text-danger" style={{ display: 'none' }}>
                                                    </small>
                                                </div><div className="col-2 mb-2">
                                                    <label htmlFor="txtBirthMiddleName" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("BirthMiddleName")}</label>
                                                    <input type="text" disabled={showdisabled === 1} className={`form-control form-control-sm ${characterValidation.birthMiddleName ? 'is-invalid' : ''}`} id="txtBirthMiddleName" placeholder={t("Enter_Birth_Middle_Name")} name='birthMiddleName' value={patientDetails.birthMiddleName} onChange={handlePatientDetailsChange} />
                                                    {characterValidation.birthMiddleName && <div className="invalid-feedback">{characterValidation.birthMiddleName}</div>}
                                                    <small id="errBirthMiddleName" className="form-text text-danger" style={{ display: 'none' }}>
                                                    </small>
                                                </div><div className="col-2 mb-2">
                                                    <label htmlFor="txtBirthLastName" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("BirthLastName")}</label>
                                                    <input type="text" disabled={showdisabled === 1} className={`form-control form-control-sm ${characterValidation.birthLastName ? 'is-invalid' : ''}`} id="txtBirthLastName" placeholder={t("Enter_Birth_Last_Name")} name='birthLastName' value={patientDetails.birthLastName} onChange={handlePatientDetailsChange} />
                                                    {characterValidation.birthLastName && <div className="invalid-feedback">{characterValidation.birthLastName}</div>}
                                                    <small id="errBirthLastName" className="form-text text-danger" style={{ display: 'none' }}>
                                                    </small>
                                                </div>

                                                <div className="col-2 mb-2 relative">
                                                    <label htmlFor="txtDob" className="form-label "><img src={calendar} className='icnn' alt='' />{t("Date_of_Birth")}<span class="starMandatory">*</span></label>
                                                    <input type="date" disabled={showdisabled === 1} className="form-control form-control-sm" max={today} id="txtDob" name='dob' value={patientDetails.dob} onChange={getPatientAge} />
                                                    <small id="errPatientDob" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>

                                                <div className="col-1 mb-2">
                                                    <div className='d-flex align-items-center gap-1 orrmob'>
                                                        <div className="form-text or1" style={{ width: '25px' }}>OR</div>
                                                        <div style={{ width: '100%' }}>
                                                            <label htmlFor="txtAge" className="form-label"><img src={ageIcon} className='icnn' alt='' />{t("Age")}<span class="starMandatory">*</span></label>
                                                            <input type="number" disabled={showdisabled === 1} className="form-control form-control-sm" id="txtAge" placeholder={t("Enter_Age")} name='age' value={patientDetails.age} onChange={getPatientDobByAge} />
                                                            <small id="errPatientAge" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="col-1 mb-2">
                                                    <label htmlFor="ddlAgeUnit" className="form-label"><img src={ageIcon} className='icnn' alt='' />{t("Age_Unit")}<span class="starMandatory">*</span></label>
                                                    <select disabled={showdisabled === 1} className="form-select form-select-sm" id="ddlAgeUnit" aria-label=".form-select-sm example" name='ddlAgeUnit' value={patientDetails.ageUnitId} onChange={handlePatientDetailsChange}>
                                                        <option value="0" selected>Select Unit</option>
                                                        <option value="1">{t("Year")}</option>
                                                        <option value="2">{t("Month")}</option>
                                                        <option value="3">{t("Day")}</option>
                                                    </select>
                                                    <small id="errAgeUnitID" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>

                                                <div className="col-2 mb-2">
                                                    <label htmlFor="ddlsexualOrientation" className="form-label"><img src={ageIcon} className='icnn' />{t("Sexual_Orientation")}</label>
                                                    <select disabled={showdisabled === 1} className="form-select form-select-sm" id="ddlsexualOrientation" aria-label=".form-select-sm example" name='sexualOrientationId' value={patientDetails.sexualOrientationId} onChange={handlePatientDetailsChange}>
                                                        <option value="0">{t("Select_Sexual_Orientation")}</option>
                                                        {sexualOrientationlist && sexualOrientationlist.map((list) => {
                                                            return (
                                                                <option value={list.id}>{list.name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>

                                                <div className="col-2 mb-2">
                                                    <label htmlFor="txtExternalID" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Patient_ExternalID")}</label>
                                                    <input type="text" disabled={showdisabled === 1} className={`form-control form-control-sm ${characterValidation.externalId ? 'is-invalid' : ''}`} id="txtExternalID" placeholder={t("Enter_Patient_ExternalID")} name='externalId' value={patientDetails.externalId} onChange={handlePatientDetailsChange} />
                                                    {characterValidation.externalId && <div className="invalid-feedback">{characterValidation.externalId}</div>}
                                                    <small id="errExternalID" className="form-text text-danger" style={{ display: 'none' }}>
                                                    </small>
                                                </div>
                                                <div className="col-2 mb-2">
                                                    <label htmlFor="txtSS" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Patient_Social_Security_Number")}</label>
                                                    <input type="text" disabled={showdisabled === 1} className={`form-control form-control-sm ${characterValidation.socialSecurityNo ? 'is-invalid' : ''}`} id="txtSS" placeholder={t("Enter_Social_Security_Number")} name='socialSecurityNo' value={patientDetails.socialSecurityNo} onChange={handlePatientDetailsChange} />
                                                    {characterValidation.socialSecurityNo && <div className="invalid-feedback">{characterValidation.socialSecurityNo}</div>}
                                                    <small id="errSS" className="form-text text-danger" style={{ display: 'none' }}>
                                                    </small>
                                                </div>
                                                <div className="col-2 mb-2">
                                                    <label htmlFor="txtLicense" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Patient_License")}</label>
                                                    <input type="text" disabled={showdisabled === 1} className={`form-control form-control-sm ${characterValidation.driversLicense ? 'is-invalid' : ''}`} id="txtLicense" placeholder={t("Enter_License")} name='driversLicense' value={patientDetails.driversLicense} onChange={handlePatientDetailsChange} />
                                                    {characterValidation.driversLicense && <div className="invalid-feedback">{characterValidation.driversLicense}</div>}
                                                    <small id="errLicense" className="form-text text-danger" style={{ display: 'none' }}>
                                                    </small>
                                                </div>
                                                <div className="col-1 mb-2">
                                                    <label htmlFor="ddlMaritalStatus" className="form-label"><img src={ageIcon} className='icnn' alt='' />{t("MaritalStatus")}</label>
                                                    <select className="form-select form-select-sm" disabled={showdisabled === 1} id="ddlMaritalStatus" aria-label=".form-select-sm example" name='maritalStatusId' value={patientDetails.maritalStatusId} onChange={handlePatientDetailsChange}>
                                                        <option value="0" >Select Marital Status</option>
                                                        {maritalStatusList && maritalStatusList.map((list) => {
                                                            return (
                                                                <option value={list.id}>{list.name}</option>
                                                            )
                                                        })}
                                                    </select>
                                                    <small id="errMaritalStatus" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                                <div className="col-2 mb-2">
                                                    <label htmlFor="txtBillingNote" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("BillingNote")}</label>
                                                    <input type="text" disabled={showdisabled === 1} className={`form-control form-control-sm ${characterValidation.billingNote ? 'is-invalid' : ''}`} id="txtBillingNote" placeholder={t("Enter_BillingNote")} name='billingNote' value={patientDetails.billingNote} onChange={handlePatientDetailsChange} />
                                                    {characterValidation.billingNote && <div className="invalid-feedback">{characterValidation.billingNote}</div>}
                                                    <small id="errBillingNote" className="form-text text-danger" style={{ display: 'none' }}>
                                                    </small>
                                                </div>

                                                <div className="col-2 mb-2">
                                                    <label htmlFor="ddlGender" className="form-label"><img src={genderIcon} className='icnn' alt='' />{t("Gender")}<span class="starMandatory">*</span></label>
                                                    <select className="form-select form-select-sm" disabled={showdisabled === 1} id="ddlGender" aria-label=".form-select-sm example" name='genderId' value={patientDetails.genderId} onChange={handlePatientDetailsChange}>
                                                        <option value="0">{t("Select_Gender")}</option>

                                                        {getPatientGender && getPatientGender.map((val, ind) => {
                                                            return (
                                                                <option value={val.id}>{val.name}</option>
                                                            );
                                                        })}

                                                    </select>
                                                    <small id="errPatientGender" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>


                                                <div className="col-2 mb-2">
                                                    <label htmlFor="ddlGenderIdentity" className="form-label"><img src={genderIcon} className='icnn' alt='' />{t("Gender Identity")}<span class="starMandatory">*</span></label>
                                                    <select className="form-select form-select-sm" disabled={showdisabled === 1} id="ddlGenderIdentity" aria-label=".form-select-sm example" name='genderidentityId' value={patientDetails.genderidentityId} onChange={handlePatientDetailsChange}>
                                                        <option value="0">{t("Select Gender Identity")}</option>
                                                        {getPatientGenderIdentities && getPatientGenderIdentities.map((val, ind) => {
                                                            return (
                                                                <option value={val.id}>{val.name}</option>
                                                            );
                                                        })}
                                                    </select>
                                                    <small id="errPatientGenderIdentity" className="form-text text-danger" style={{ display: 'none' }}></small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* ....................................................................Stats..................................................................... */}
                                <div class="fieldsett-in">
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
                                                            <select disabled={showdisabled === 1} value={statsJsonString.ethinicityId} className="form-select form-select-sm" id="ddlEthnicity" aria-label=".form-select-sm example" name='ethinicityId' onChange={(e) => { handleStatsDetails("ethinicityId", e.target.value) }}>
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
                                                            <select disabled={showdisabled === 1} value={statsJsonString.languageId} className="form-select form-select-sm" id="ddlPreferredLanguage" aria-label=".form-select-sm example" name='languageId' onChange={(e) => { handleStatsDetails("languageId", e.target.value) }}>
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
                                                            <select disabled={showdisabled === 1} value={statsJsonString.raceId} className="form-select form-select-sm selectwid" id="ddlRaceType" aria-label=".form-select-sm example" name='raceId' onChange={(e) => { handleStatsDetails("raceId", e.target.value) }}>
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
                                                            <input disabled={showdisabled === 1} type="number" value={statsJsonString.familySize} className="form-control form-control-sm" id="txtFamilySize" placeholder={t("ENTER_Family_Size")} name='familySize' onChange={(e) => { handleStatsDetails("familySize", e.target.value) }} />
                                                        </div>
                                                        <div className="col-2 mb-2">
                                                            <label htmlFor="txtFinancialReviewDate" className="form-label"><img src={calendar} className='icnn' alt='' />{t("Financial Review Date")}</label>
                                                            <input disabled={showdisabled === 1} type="date" value={statsJsonString.financialReviewDate} className="form-control form-control-sm" id="txtFinancialReviewDate" placeholder={t("ENTER_Financial_Review_Date")} name='financialReviewDate' onChange={(e) => { handleStatsDetails("financialReviewDate", e.target.value) }} />
                                                        </div>
                                                        <div className="col-2 mb-2">
                                                            <label htmlFor="txtMonthlyIncome" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Monthly_Income")}</label>
                                                            <input disabled={showdisabled === 1} type="number" value={statsJsonString.monthlyIncome} className="form-control form-control-sm" id="txtMonthlyIncome" placeholder={t("Enter_Monthly_Income")} name='monthlyIncome' onChange={(e) => { handleStatsDetails("monthlyIncome", e.target.value) }} />
                                                        </div>
                                                        <div className="col-2 mb-2">
                                                            <label htmlFor="txtHomeless" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Homeless")}</label>
                                                            <input disabled={showdisabled === 1} type="text" value={statsJsonString.homeless} className="form-control form-control-sm" id="txtHomeless" placeholder={t("Enter_Homeless")} name='homeless' onChange={(e) => { handleStatsDetails("homeless", e.target.value) }} />
                                                        </div>
                                                        <div className="col-2 mb-2">
                                                            <label htmlFor="txtInterpreter" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Interpreter")}</label>
                                                            <input disabled={showdisabled === 1} type="text" value={statsJsonString.interpreter} className="form-control form-control-sm" id="txtInterpreter" placeholder={t("Enter_Interpreter")} name='interpreter' onChange={(e) => { handleStatsDetails("interpreter", e.target.value) }} />
                                                        </div>
                                                        <div className="col-2 mb-2">
                                                            <label htmlFor="txtMigrant" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Migrant")}</label>
                                                            <input disabled={showdisabled === 1} type="text" value={statsJsonString.migrant} className="form-control form-control-sm" id="txtMigrant" placeholder={t("Enter_Migrant")} name='migrant' onChange={(e) => { handleStatsDetails("migrant", e.target.value) }} />
                                                        </div>
                                                        <div className="col-2 mb-2">
                                                            <label htmlFor="ddlReferralSource" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Referral_Source")}</label>
                                                            <select disabled={showdisabled === 1} value={statsJsonString.referralSourceId} className="form-select form-select-sm selectwid" id="ddlReferralSource" aria-label=".form-select-sm example" name='referralSourceId' onChange={(e) => { handleStatsDetails("referralSourceId", e.target.value) }}>
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
                                                            <select disabled={showdisabled === 1} value={statsJsonString.isVFCEligible} className="form-select form-select-sm selectwid" id="ddlVFC" aria-label=".form-select-sm example" name='isVFCEligible' onChange={(e) => { handleStatsDetails("isVFCEligible", e.target.value) }}>
                                                                <option value="0">{t("Select_VFC")}</option>
                                                                <option value="1">Unassigned</option>
                                                                <option value="2">Eligible</option>
                                                                <option value="3">Ineligible</option>

                                                            </select>
                                                        </div>
                                                        <div className="col-2 mb-2">
                                                            <label htmlFor="ddlReligion" className="form-label"><img src={patientOPD} className='icnn' alt='' />{t("Religion")}</label>
                                                            <select disabled={showdisabled === 1} value={statsJsonString.religionId} className="form-select form-select-sm selectwid" id="ddlReligion" aria-label=".form-select-sm example" name='religionId' onChange={(e) => { handleStatsDetails("religionId", e.target.value) }}>
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
                                {/* ....................................................................Stats..................................................................... */}

                                {/* ....................................................................Guardian_Details..................................................................... */}
                                <div class="fieldsett-in">
                                    <div class="fieldsett">
                                        <span class="fieldse">{t("Guardian_Details")}</span>
                                        {/* <Heading text={t("Guardian_Details")} /> */}
                                        <div className="inner-content">
                                            <div className="dflex">
                                                <div className="col-2">
                                                    <label htmlFor="txtGuardianName" className="form-label"><img src={ageIcon} className='icnn' />{t("NAME")}</label>
                                                    <input disabled={showdisabled === 1} type="Name" value={registrationObj.guardiansName} className="form-control form-control-sm" id="txtGuardianName" placeholder={t("Name")} name='guardiansName' onChange={(e) => { handleGuardianDetails("guardiansName", e.target.value) }} />
                                                </div>
                                                <div className="col-2 mb-2">
                                                    <label htmlFor="txtPatientRelationship" className="form-label"><img src={IconPatientRelation} className='icnn' />{t("Select_Relation_Relationship_To_Patient")}</label>
                                                    {/* <input type="text" className="form-control form-control-sm" id="txtRelationshipToPatient" placeholder="Enter Relationship" name='guardianRelationToPatient' value={guardianRelationToPatient} onChange={handlerChange} /> */}
                                                    <select disabled={showdisabled === 1} value={registrationObj.guardianrelationship} className="form-select form-select-sm" id="ddlRelationToPat" aria-label=".form-select-sm example" name='guardianrelationship' onChange={(e) => { handleGuardianDetails("guardianrelationship", e.target.value) }} >
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
                                                    <select disabled={showdisabled === 1} value={registrationObj.genderId} className="form-select form-select-sm" id="ddlGaurdian_Gender" aria-label=".form-select-sm example" name='genderId' onChange={(e) => { handleGuardianDetails("genderId", e.target.value) }} >
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
                                                    <input disabled={showdisabled === 1} type="text" value={registrationObj.guardianAddress} className="form-control form-control-sm" id="txtPatientRelationAddress" placeholder={t("Enter_Address")} name='guardianAddress' onChange={(e) => { handleGuardianDetails("guardianAddress", e.target.value) }} />
                                                </div>
                                                <div className="col-2 mb-2">
                                                    <label htmlFor="txtPatientRelationMobNo" className="form-label"><img src={smartphone} className='icnn' />{t("MOBILE_NUMBER")}</label>
                                                    <input disabled={showdisabled === 1} type="number" value={registrationObj.guardianMobileNo} className="form-control form-control-sm" id="txtPatientRelationMobNo" placeholder={t("Mobile_Number")} name='guardianMobileNo' onChange={(e) => { handleGuardianDetails("guardianMobileNo", e.target.value) }} />
                                                </div>

                                                <div className="col-2 mb-2">
                                                    <label htmlFor="txtPatientRelationWorkPhone" className="form-label"><img src={smartphone} className='icnn' />{t("Work_Phone")}</label>
                                                    <input disabled={showdisabled === 1} type="number" value={registrationObj.guardianworkphone} className="form-control form-control-sm" id="txtPatientRelationMobNo" placeholder={t("Work_Phone")} name='guardianworkphone' onChange={(e) => { handleGuardianDetails("guardianworkphone", e.target.value) }} />
                                                </div>

                                                <div className="col-2 mb-2">
                                                    <label htmlFor="txtPatientRelationEmail" className="form-label"><img src={emailIcon} className='icnn' />{t("Email")}</label>
                                                    <input disabled={showdisabled === 1} type="email" value={registrationObj.guardianemail} className="form-control form-control-sm" id="txtPatientRelationEmail" placeholder={t("ENTER_EMAIL_ID")} name='guardianemail' onKeyPress={(e) => {
                                                        if (e.key === ' ') {
                                                            e.preventDefault();
                                                        }
                                                    }} onChange={(e) => { handleGuardianDetails("guardianemail", e.target.value) }} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* ....................................................................Guardian_Details..................................................................... */}
                            </div>
                        </div>
                        <div class="col-12 mt-2">
                            <div class="med-box commong">
                                <div className="col-xl-12 col-lg-12 col-md-12 buttonpadding">
                                    <div className='d-flex justify-content-end'>
                                        {updateBool === 0 ?
                                            <>
                                                <button type="button" className="btn btn-save btnbluehover btn-sm  me-1" id='btnEdit' onClick={handleEdit}><i class="fa-solid fa-user-pen"></i> {t("Edit")}</button>
                                                <button type="button" className="btn btn-save btn-save-fill btn-sm  me-1" id='btnEdit' onClick={handleBack}><i class="fa-regular fa-circle-left"></i> Back</button>
                                            </>
                                            :
                                            <>
                                                <button type="button" className="btn btn-save btn-save-fill btn-sm  me-1" id='btnUpdate' onClick={handleUpdate}><img src={saveButtonIcon} className='icnn' />{t("UPDATE")}</button>
                                                <button type="button" className="btn btn-save btnbluehover btn-sm  me-1" id='btnClear' onClick={handleClear}><img src={clearIcon} className='icnn' />{t("Clear")}</button>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Toaster */}
            {
                isShowToaster === 1 ?
                    <SuccessToster handle={setShowToster} message={showSuccessMsg} /> : ""
            }

            {
                showAlertToster === 1 ?
                    <AlertToster handle={setShowAlertToster} message={showErrMessage} /> : ""
            }
        </>
    )
}

export default FHIRPatientProfile
