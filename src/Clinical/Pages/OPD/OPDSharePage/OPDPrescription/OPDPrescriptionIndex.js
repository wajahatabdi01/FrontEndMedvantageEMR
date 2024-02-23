import React, { useEffect, useImperativeHandle, useState } from 'react'
// import BoxContainer from '../../../../../Components/BoxContainer'
// import TableContainer from '../../../../../Components/TableContainer'
// import Heading from '../../../../../Components/Heading'
// import OPDTopVitals from './OPDTopVitals'
import OPDInvestigationProcedure from './OPDInvestigationProcedure'
import OPDPatientInputData from './OPDPatientInputData'
import OPDPatientMedicationAssign from './OPDPatientMedicationAssign'
import OPDPatientLabDetails from './OPDPatientLabDetails'
import OPDBottomSection from './OPDBottomSection'
// import OPDPatientTabs from './OPDPatientTabs'
import GetPatientHistory from '../../../../API/OPD/Prescription/GetPatientHistory'
import SaveOPDData from '../../../../../Code/SaveOPDData'
import SuccessToster from '../../../../../Component/SuccessToster'
import AlertToster from '../../../../../Component/AlertToster'
import Loader from '../../../../../Component/Loader'
import GetCheckCrNo from '../../../../API/OPD/Prescription/GetCheckCrNo'
import POSTVisitRevisit from '../../../../API/OPD/Prescription/POSTVisitRevisit'
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import OPDTOPBottom from './OPDTOPBottom'
import IconEdit from '../../../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../../../assets/images/icons/IconDelete.svg'
import OPDProblemPopUp from './FHIROPDPopUp/OPDProblemPopUp';
import addIcon from '../../../../../assets/images/icons/icons8-plus-30.png'
import OPDAllergyPopUp from './FHIROPDPopUp/OPDAllergyPopUp'
import OPDMedicationPopUp from './FHIROPDPopUp/OPDMedicationPopUp'
import OPDDevicePopUp from './FHIROPDPopUp/OPDDevicePopUp'
import FHIRGetEncounterByUHIDandIssueID from '../../../../API/FHIRApi/GET/FHIRGetEncounterByUHIDandIssueID'
import Heading from '../../../../../Component/Heading'
import OPDSurgeryPopUp from './FHIROPDPopUp/OPDSurgeryPopUp';

import NoDataFound from '../../../../../assets/images/icons/No data-rafiki.svg'
import { t } from 'i18next'
import DeleteEncounter from '../../../../API/FHIREncounter/DeleteEncounter'
export default function OPDPrescriptionIndex(props) {





    let [showPopUp, setShowPopUp] = useState(1)
    let [patientHistory, setPatientHistory] = useState([])
    let [getD, setGetD] = useState(0)
    let [showToster, setShowToster] = useState(0)
    let [message, setMessage] = useState(0)
    let [disable, setDisable] = useState(0)
    let [showLoader, setShowLoader] = useState(1)
    let [foodData, setFoodData] = useState([])
    let [activeComponent, setActiveComponent] = useState('');
    let [showTheButton, setShowTheButton] = useState(false);
    let [getIssueID, setIssueID] = useState('');
    let [rowId, setRowId] = useState('')
    const [updatebool, setUpdateBool] = useState(0);
    const [getEncounterList, setEncounterList] = useState([]);
    const [getHeadingName, setHeadingName] = useState('');
    let [showImage, setShowImage] = useState(0);
    let [problemData, setProblemData] = useState()
    const [encounterTitle, setEncounterTitle] = useState('');
    const [encounterBeginDate, setEncounterBeginDate] = useState('');
    const [encounterEndDate, setEncounterEndDate] = useState('');
    const [referredby, setReferredby] = useState('');
    const [encounterCoding, setEncounterCoding] = useState('');
    const [classificationName, setClassificationName] = useState('');
    const [occurrenceId, setOccurrenceId] = useState('');
    const [verificationStatusId, setVerificationStatusId] = useState('');
    const [outcomeId, setOutcomeId] = useState('');
    const [titleId, setTitleId] = useState('');
    const [encounterComments, setEncounterComments] = useState('');
    const [encounterDestination, setEncounterDestination] = useState('');

    const [activeTab, setActiveTab] = useState('problem');
    let activeUHID = window.sessionStorage.getItem("activePatient")
        ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
        : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []
    let handlePopUp = (val) => {
        setShowPopUp(val)
    }

    //Handle Delete
    let handleDeleteRow = async () => {
        let obj = {
            Id: rowId
        }
        console.log("object Delete", obj)
        // return;
        let response = await DeleteEncounter(obj)
        if (response.status === 1) {
            setShowToster(5)
            getAllEncoutersAsPerIssueID();
            setTimeout(() => {
                setShowToster(0);
            }, 2000)
        }
        else {
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
        }
    }
    let getdata = async (val, NoYes) => {
        try {

            if (val === 0) {
                let response = await GetPatientHistory()
                let data = response.responseValue;
                if (response.status === 1) {
                    setPatientHistory(response.responsevalue)
                    let temp = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []
                    let activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : []
                    let Vitalsdata = [
                        {
                            "vmId": 56,
                            "vmValue": ""
                        },
                        {
                            "vmId": 4,
                            "vmValue": ""
                        },
                        {
                            "vmId": 6,
                            "vmValue": ""
                        },
                        {
                            "vmId": 3,
                            "vmValue": ""
                        },
                        {
                            "vmId": 7,
                            "vmValue": ""
                        },
                        {
                            "vmId": 5,
                            "vmValue": ""
                        },
                        {
                            "vmId": 2,
                            "vmValue": ""
                        },
                        {
                            "vmId": 1,
                            "vmValue": ""
                        }]
                    let symptomsDatas = []
                    let consultantDatas = []
                    let physicalexamination = []
                    let prescriptiondata = []
                    let foodData = []
                    let allergiesData = []
                    let nextVisitDate = []
                    let investigationData = []
                    let patientCategoryResult = []
                    let patientExaminationResult = []
                    let patientHistoryCategoryResult = []
                    let patientHistoryCategoryResultExistance = []

                    temp.map((values, index) => {
                        values.map((val, ind) => {
                            if (values[0] === activeUHID) {
                                let key = Object.keys(val)
                                if (key[0] === "jsonDiagnosis") {
                                    if (data.patientComplainHistory.length != 0) {

                                        data.patientComplainHistory.map((value, ind) => {
                                            if (value.pdmId === 2) {
                                                symptomsDatas.push(value)
                                            }
                                            if (value.pdmId === 4) {
                                                consultantDatas.push(value)
                                            }
                                            if (value.pdmId === 6) {
                                                physicalexamination.push(value)
                                            }
                                            if (value.pdmId === 11) {
                                                foodData.push(value)
                                            }
                                            if (value.pdmId === 10) {
                                                foodData.push(value)
                                            }
                                            if (value.pdmId === 9) {
                                                foodData.push(value)
                                            }
                                            if (value.pdmId === 7) {
                                                allergiesData.push(value)
                                            }
                                            if (value.pdmId === 8) {
                                                allergiesData.push(value)
                                            }
                                        })
                                    }
                                    else {
                                        data.patientHeightWeight.map((val, ind) => {

                                            Vitalsdata.map((v, ii) => {
                                                if (v.vmId === 1) {
                                                    Vitalsdata[ii].vmValue = val.height
                                                }
                                                else if (v.vmId === 2) {
                                                    Vitalsdata[ii].vmValue = val.weight
                                                }
                                            })

                                        })
                                        // data.patientHeightWeight
                                    }
                                }
                                else if (key[0] === "jsonVital") {
                                    if (data.patientVitals.length != 0) {

                                        Vitalsdata = [...data.patientVitals]

                                    }
                                }
                                else if (key[0] === "jsonArray") {
                                    if (data.allPrescription.length != 0) {
                                        prescriptiondata = [...data.allPrescription]

                                        // SaveOPDData(data.allPrescription, "jsonArray")
                                    }
                                    else {
                                        prescriptiondata = []


                                    }
                                }
                                else if (key[0] === "jsonInvestigation") {
                                    if (data.patientInvestigation.length != 0) {
                                        investigationData = [...data.patientInvestigation]
                                        // SaveOPDData(data.patientInvestigation, "jsonInvestigation")
                                    }
                                    else {
                                        investigationData = []


                                    }
                                }
                                else if (key[0] === "patientCategoryResult") {

                                    if (data.patientCategoryResult.length != 0) {

                                        patientCategoryResult = data.patientCategoryResult
                                    }
                                }
                                else if (key[0] === "patientExaminationResult") {
                                    if (data.patientExaminationResult.length != 0) {
                                        patientExaminationResult = data.patientExaminationResult
                                    }

                                }
                                else if (key[0] === "patientHistoryCategoryResult") {
                                    if (data.patientHistoryCategoryResult.length != 0) {
                                        patientHistoryCategoryResult = data.patientHistoryCategoryResult
                                    }

                                }
                                else if (key[0] === "patientHistoryCategoryResultExistance") {
                                    if (data.patientHistoryCategoryResultExistance.length != 0) {
                                        patientHistoryCategoryResultExistance = data.patientHistoryCategoryResultExistance
                                    }

                                }

                            }
                        })
                    })

                    let t = [...consultantDatas, ...symptomsDatas, ...physicalexamination]
                    SaveOPDData(t, "jsonDiagnosis")
                    SaveOPDData(foodData, "jsonFood")
                    SaveOPDData(Vitalsdata, "jsonVital")
                    SaveOPDData(patientCategoryResult, "patientCategoryResult")
                    SaveOPDData(patientExaminationResult, "patientExaminationResult")
                    SaveOPDData(patientHistoryCategoryResult, "patientHistoryCategoryResult")
                    SaveOPDData(patientHistoryCategoryResultExistance, "patientHistoryCategoryResultExistance")
                    SaveOPDData(prescriptiondata, "jsonArray")
                    SaveOPDData(investigationData, "jsonInvestigation")
                    SaveOPDData(nextVisitDate, "nextVisitDate")
                    SaveOPDData(allergiesData, "jsonallergies")

                    SaveOPDData(0, "disable")
                    setGetD(1)
                    setTimeout(() => {
                        setShowLoader(0)
                    }, 1500)
                    return
                }
                else {
                    setShowLoader(0)
                }
            }

            else if (val === 2) {
                if (NoYes === 1) {
                    let Vitalsdata = [
                        {
                            "vmId": 56,
                            "vmValue": ""
                        },
                        {
                            "vmId": 4,
                            "vmValue": ""
                        },
                        {
                            "vmId": 6,
                            "vmValue": ""
                        },
                        {
                            "vmId": 3,
                            "vmValue": ""
                        },
                        {
                            "vmId": 7,
                            "vmValue": ""
                        },
                        {
                            "vmId": 5,
                            "vmValue": ""
                        },
                        {
                            "vmId": 2,
                            "vmValue": ""
                        },
                        {
                            "vmId": 1,
                            "vmValue": ""
                        }]

                    let sendData = {
                        "uhId": JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid,
                        "deptId": JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId,
                        "userId": window.userId,
                    }

                    let responsedd = await POSTVisitRevisit(sendData)

                    if (responsedd.status === 0) {
                        setShowToster(1)
                        setMessage(responsedd.responseValue)
                    }

                    setDisable(0)
                    setGetD(1)

                    let allPopdata = JSON.parse(window.sessionStorage.getItem("PopUpData")) ? JSON.parse(window.sessionStorage.getItem("PopUpData")) : []
                    let temppopup = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid

                    let response = await GetPatientHistory()
                    let data = response.responseValue;
                    if (response.status === 1) {
                        let temp = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []
                        let activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : temppopup
                        temp.map((values, index) => {
                            values.map((val, ind) => {
                                if (values[0] === activeUHID) {
                                    let key = Object.keys(val)

                                    if (key[0] === "jsonVital") {
                                        if (data.patientVitals.length != 0) {
                                            Vitalsdata = data.patientVitals
                                        }
                                        else {
                                            data.patientHeightWeight.map((val, ind) => {

                                                Vitalsdata.map((v, ii) => {
                                                    if (v.vmId === 1) {
                                                        Vitalsdata[ii].vmValue = val.height
                                                    }
                                                    else if (v.vmId === 2) {
                                                        Vitalsdata[ii].vmValue = val.weight
                                                    }
                                                })

                                            })
                                            // data.patientHeightWeight
                                        }
                                    }
                                    SaveOPDData(data.patientCategoryResult, "patientCategoryResult")
                                    SaveOPDData(data.patientExaminationResult, "patientExaminationResult")
                                    SaveOPDData(data.patientHistoryCategoryResult, "patientHistoryCategoryResult")
                                    SaveOPDData(data.patientHistoryCategoryResultExistance, "patientHistoryCategoryResultExistance")

                                }
                            })
                        })
                    }



                    let jsons = { "UHID": temppopup, "show": 1 }
                    let setPopup = [...allPopdata, jsons]


                    window.sessionStorage.setItem("PopUpData", JSON.stringify(setPopup))
                    setTimeout(() => {
                        setShowLoader(0)
                    }, 1500)

                    return

                }
                else if (NoYes != 1) {
                    let response = await GetPatientHistory()
                    let data = response.responseValue;
                    if (response.status === 1) {
                        // setShowLoader(0)
                        setPatientHistory(response.responsevalue)
                        let temp = window.sessionStorage.getItem("patientsendData") ? JSON.parse(window.sessionStorage.getItem("patientsendData")) : []
                        let activeUHID = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : []
                        let symptomsDatas = []
                        let consultantDatas = []
                        let physicalexamination = []
                        let Vitalsdata = [
                            {
                                "vmId": 56,
                                "vmValue": ""
                            },
                            {
                                "vmId": 4,
                                "vmValue": ""
                            },
                            {
                                "vmId": 6,
                                "vmValue": ""
                            },
                            {
                                "vmId": 3,
                                "vmValue": ""
                            },
                            {
                                "vmId": 7,
                                "vmValue": ""
                            },
                            {
                                "vmId": 5,
                                "vmValue": ""
                            },
                            {
                                "vmId": 2,
                                "vmValue": ""
                            },
                            {
                                "vmId": 1,
                                "vmValue": ""
                            }]
                        let prescriptiondata = []
                        let investigationData = []
                        let foodData = []
                        let patientCategoryResult = []
                        let patientExaminationResult = []
                        let patientHistoryCategoryResult = []
                        let patientHistoryCategoryResultExistance = []
                        temp.map((values, index) => {
                            values.map((val, ind) => {
                                if (values[0] === activeUHID) {
                                    let key = Object.keys(val)

                                    if (key[0] === "jsonDiagnosis") {
                                        if (data.patientComplainHistory.length != 0) {

                                            data.patientComplainHistory.map((value, ind) => {
                                                if (value.pdmId === 2) {
                                                    symptomsDatas.push(value)
                                                }
                                                if (value.pdmId === 4) {
                                                    consultantDatas.push(value)
                                                }
                                                if (value.pdmId === 6) {
                                                    physicalexamination.push(value)
                                                }
                                                if (value.pdmId === 11) {
                                                    foodData.push(value)
                                                }
                                                if (value.pdmId === 10) {
                                                    foodData.push(value)
                                                }
                                                if (value.pdmId === 9) {
                                                    foodData.push(value)
                                                }
                                            })
                                        }
                                    }
                                    else if (key[0] === "jsonVital") {
                                        if (data.patientVitals.length != 0) {
                                            Vitalsdata = data.patientVitals

                                        }
                                        else {
                                            data.patientHeightWeight.map((val, ind) => {

                                                Vitalsdata.map((v, ii) => {
                                                    if (v.vmId === 1) {
                                                        Vitalsdata[ii].vmValue = val.height
                                                    }
                                                    else if (v.vmId === 2) {
                                                        Vitalsdata[ii].vmValue = val.weight
                                                    }
                                                })

                                            })
                                            // data.patientHeightWeight
                                        }
                                    }
                                    else if (key[0] === "jsonArray") {
                                        if (data.allPrescription.length != 0) {
                                            prescriptiondata = data.allPrescription
                                        }
                                    }
                                    else if (key[0] === "jsonInvestigation") {
                                        if (data.patientInvestigation.length != 0) {
                                            investigationData = [...data.patientInvestigation]
                                        }
                                    }
                                    else if (key[0] === "patientCategoryResult") {
                                        if (data.patientCategoryResult.length != 0) {
                                            patientCategoryResult = data.patientCategoryResult
                                        }
                                    }
                                    else if (key[0] === "patientExaminationResult") {
                                        if (data.patientExaminationResult.length != 0) {
                                            patientExaminationResult = data.patientExaminationResult
                                        }

                                    }
                                    else if (key[0] === "patientHistoryCategoryResult") {
                                        if (data.patientHistoryCategoryResult.length != 0) {
                                            patientHistoryCategoryResult = data.patientHistoryCategoryResult
                                        }

                                    }
                                    else if (key[0] === "patientHistoryCategoryResultExistance") {
                                        if (data.patientHistoryCategoryResultExistance.length != 0) {
                                            patientHistoryCategoryResultExistance = data.patientHistoryCategoryResultExistance
                                        }

                                    }
                                }
                            })
                        })

                        let t = [...consultantDatas, ...symptomsDatas, ...physicalexamination]
                        SaveOPDData(t, "jsonDiagnosis")
                        SaveOPDData(foodData, "jsonFood")
                        SaveOPDData(1, "disable")
                        SaveOPDData(investigationData, "jsonInvestigation")
                        SaveOPDData(data.patientCategoryResult, "patientCategoryResult")
                        SaveOPDData(data.patientExaminationResult, "patientExaminationResult")
                        SaveOPDData(data.patientHistoryCategoryResult, "patientHistoryCategoryResult")
                        SaveOPDData(data.patientHistoryCategoryResultExistance, "patientHistoryCategoryResultExistance")

                        SaveOPDData(prescriptiondata, "jsonArray")
                        SaveOPDData(Vitalsdata, "jsonVital")




                        setGetD(1)
                        setDisable(1)
                        let allPopdata = JSON.parse(window.sessionStorage.getItem("PopUpData")) ? JSON.parse(window.sessionStorage.getItem("PopUpData")) : []
                        let temppopup = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
                        let jsons = { "UHID": temppopup, "show": 1 }
                        let setPopup = [...allPopdata, jsons]
                        window.sessionStorage.setItem("PopUpData", JSON.stringify(setPopup))

                        setShowLoader(0)
                    }
                    else {
                        setTimeout(() => {
                            setShowLoader(0)
                        }, 1500)
                    }

                    return
                }


            }
        }
        catch (e) {
            setShowToster(1)
            setMessage(e)
        }
    }

    let CheckCrNo = async () => {
        let activepatient = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
        let response = await GetCheckCrNo(activepatient)
        if (response.status === 1) {
            if (response.responseValue[0].crNo != null) {
                getdata(0, 3)
                handlePopUp(0)
            }
            else {
                handlePopUp(0)
            }
        }
    }
    const getAllEncoutersAsPerIssueID = async () => {
        const getRes = await FHIRGetEncounterByUHIDandIssueID(activeUHID, getIssueID);

        if (getRes.status === 1) {
            setEncounterList(getRes.responseValue);
            setShowImage(0)
        }
        else {
            setShowImage(1)
        }

    }


    useEffect(() => {
        try {

            let flag = 0
            let t = []
            let patientData = JSON.parse(window.sessionStorage.getItem("patientsendData"))
            let activepatient = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
            patientData && patientData.map((val, ind) => {

                if ((val[0].toString().toLowerCase().trim() === activepatient.toString().toLowerCase().trim()) && val.length > 1) {
                    flag = 1
                    t = val
                    return
                }
            })

            if (flag === 1) {
                t.map((v, i) => {
                    if (v.disable === 0) {
                        getdata(0, 1)
                        setShowPopUp(0)
                        // setShowLoader(0)
                    }
                    else if (v.disable === 1) {
                        getdata(2, 2)
                        setShowPopUp(0)
                        // setShowLoader(0)
                    }
                })
            }
            else {

                CheckCrNo()
            }
        }
        catch (e) {
            setShowToster(1)
            setMessage(e)
        }



    }, [])

    let handleUpdate = (encounterId, encounterTitle, encounterBeginDate, encounterEndDate, encounterReferredBy, encounterCoding, classificationTypeId, occurrenceId, verificationStatusId, outcomeId, encounterComments, encounterDestination, titleId) => {
        setUpdateBool(1)
        setRowId(encounterId)
        setEncounterTitle(encounterTitle);
        setEncounterBeginDate(encounterBeginDate);
        setEncounterEndDate(encounterEndDate);
        setReferredby(encounterReferredBy)
        setEncounterCoding(encounterCoding)
        setClassificationName(classificationTypeId)
        setOccurrenceId(occurrenceId);
        setVerificationStatusId(verificationStatusId);
        setOutcomeId(outcomeId);
        setEncounterComments(encounterComments);
        setEncounterDestination(encounterDestination);
        setTitleId(titleId);
    }

    useEffect(() => {
        if (showTheButton === true) {

            getAllEncoutersAsPerIssueID();
        }
    }, [showTheButton, getIssueID]);




    return (
        <>
            {/* <OPDPatientTabs handlePopUp={handlePopUp} getdata={getdata} handlepatientTab={handlepatientTab}/> */}

            {showPopUp != 1 ?
                <div className=''>
                    {/* <OPDTopVitals /> */}
                    <div className="row" >
                        <div className='col-md-9 col-sm-12 plt1'>
                            {/* <OPDPatientInputData values={getD} funh={setGetD} setFoodData={setFoodData} /> */}
                            <div className={`d-flex gap-1 boxcontainer mt-2 `} style={{ padding: "7px", overflowX: "auto" }}>
                                <OPDTOPBottom values={getD} funh={setGetD} setActiveComponent={setActiveComponent} setShowTheButton={setShowTheButton} setIssueID={setIssueID} setHeadingName={setHeadingName} />
                            </div>
                            {showTheButton && (
                                <div className={`d-flex justify-content-between align-items-center boxcontainer mt-2`} style={{ padding: "7px", overflowX: "auto" }}>
                                    <Heading text={getHeadingName} />
                                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" data-bs-toggle="modal" data-bs-target={'#' + activeComponent}>
                                        <img src={addIcon} className='icnn' alt='' />
                                        Add
                                    </button>
                                </div>
                            )}



                            {/* {
                                activeComponent ===1?<OPDProblemPopUp />:""
                            } */}
                            <div className="med-table-section" style={{ minHeight: '40vh', maxHeight: "73vh", position: 'relative' }}>
                                <table className="med-table border striped">
                                    {showImage === 1 ? (
                                        <div className='imageNoDataFound'>
                                            <img src={NoDataFound} alt="imageNoDataFound" />
                                        </div>
                                    ) : (
                                        <>
                                            <thead>
                                                <tr>
                                                    <th className="text-center" style={{ "width": "5%" }}>#</th>
                                                    <th>Title</th>
                                                    <th>Coding</th>
                                                    <th>Begin Date</th>
                                                    <th>End Date</th>
                                                    <th>Referred By</th>
                                                    <th>Comments</th>
                                                    <th>Destination</th>
                                                    <th>Classification Name</th>
                                                    <th>Occurance Name</th>
                                                    <th>Verification Name</th>
                                                    <th>Outcome Name</th>
                                                    <th style={{ "width": "10%" }} className="text-center">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getEncounterList && getEncounterList.map((list, ind) => {
                                                    const codingListItem = list.encounterCoding.split(';');
                                                    console.log("codingListItem", codingListItem)
                                                    return (
                                                        <tr className="text-center" key={list.id}>
                                                            <td className="text-center">{ind + 1}</td>
                                                            <td>{list.encounterTitle}</td>
                                                            {/* <td>{list.encounterCoding}</td> */}
                                                            <td>
                                                                <div className='codeSplit'>
                                                                    {codingListItem.map((coding, index) => (
                                                                        coding.trim() !== '' && 
                                                                        <span key={index} className="">{coding}</span>
                                                                    ))}
                                                                </div>
                                                            </td>
                                                            <td>{list.encounterBeginDate}</td>
                                                            <td>{list.encounterEndDate}</td>
                                                            <td>{list.encounterReferredBy}</td>
                                                            <td>{list.encounterComments}</td>
                                                            <td>{list.encounterDestination}</td>
                                                            <td>{list.classificationName}</td>
                                                            <td>{list.occuranceName}</td>
                                                            <td>{list.verificationName}</td>
                                                            <td>{list.outComeName}</td>
                                                            <td>
                                                                <div className="action-button">
                                                                    {getIssueID === 1 ?
                                                                        <div data-bs-toggle="modal" data-bs-title="Edit Row" data-bs-placement="bottom" data-bs-target="#problemId" title="Edit Row" onClick={() => { handleUpdate(list.encounterId, list.encounterTitle, list.encounterBeginDate, list.encounterEndDate, list.encounterReferredBy, list.encounterCoding, list.classificationTypeId, list.occurrenceId, list.verificationStatusId, list.outcomeId, list.encounterComments, list.encounterDestination, list.titleId) }}><img src={IconEdit} alt='' /></div>
                                                                        :
                                                                        getIssueID === 2 ?
                                                                            <div data-bs-toggle="modal" data-bs-title="Edit Row" data-bs-placement="bottom" data-bs-target="#allergyId" title="Edit Row" onClick={() => { handleUpdate(list.encounterId, list.encounterTitle, list.encounterBeginDate, list.encounterEndDate, list.encounterReferredBy, list.encounterCoding, list.classificationTypeId, list.occurrenceId, list.verificationStatusId, list.outcomeId, list.encounterComments, list.encounterDestination, list.titleId) }}><img src={IconEdit} alt='' /></div>
                                                                            : ''
                                                                    }

                                                                    {/* {getIssueID === 2 ?
                                                                    <div data-bs-toggle="modal" data-bs-title="Edit Row" data-bs-placement="bottom" data-bs-target="#allergy" title="Edit Row" onClick={() => { handleUpdate(list.encounterId, list.encounterTitle, list.encounterBeginDate, list.encounterEndDate, list.encounterReferredBy, list.encounterCoding, list.classificationTypeId, list.occurrenceId, list.verificationStatusId, list.outcomeId, list.encounterComments, list.encounterDestination, list.titleId) }}><img src={IconEdit} alt='' /></div>
                                                                    : ''} */}
                                                                    <div data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal"><img src={IconDelete} onClick={() => { setRowId(list.encounterId) }} alt='' /></div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </>
                                    )}
                                </table>
                            </div>



                            {/* <OPDPatientMedicationAssign values={getD} funh={setGetD} foodData={foodData} /> */}
                        </div>
                        <div className='col-md-3 col-sm-12 prt1 arabicpad'>
                            {/* <OPDPatientLabDetails values={getD} funh={setGetD} /> */}
                            <OPDInvestigationProcedure values={getD} funh={setGetD} />
                        </div>

                        <div className="modal fade" id="problemId" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                            <div className=" modal-dialog modal-dialog-scrollable modal-lg">
                                <div className="modal-content ">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">
                                            Problem
                                        </h1>
                                        <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" onClick={() => { getAllEncoutersAsPerIssueID(); }}>
                                            <i className="fa fa-times"></i>
                                        </button>
                                        {/* <button type="button" className="btn-close_ btnModalClose" aria-label="Close" onClick={() => { 
                                    getAllEncoutersAsPerIssueID();
                                    // Close the modal manually
                                    document.getElementById('problem').classList.remove('show');console.log('gggggggg')
                                }}>
                                <i className="fa fa-times"></i>
                            </button> */}

                                    </div>
                                    <div className="modal-body">
                                        <div class="tab-content" id="myTabContent">
                                            {/* --------------------------Problem Tab Section----------------------------------------------- */}
                                            <div class="tab-pane fade show active" id="problem" role="tabpanel" value="1" aria-labelledby="home-tab" tabindex="0">
                                                <OPDProblemPopUp
                                                    setShowToster={setShowToster}
                                                    updatebool={updatebool}
                                                    setUpdateBool={setUpdateBool}
                                                    getAllEncoutersAsPerIssueID={getAllEncoutersAsPerIssueID}
                                                    rowId={rowId}
                                                    encounterTitle={encounterTitle}
                                                    encounterBeginDate={encounterBeginDate}
                                                    encounterEndDate={encounterEndDate}
                                                    encounterReferredBy={referredby}
                                                    encounterCoding={encounterCoding}
                                                    classificationName={classificationName}
                                                    occurrence={occurrenceId}
                                                    verificationStatus={verificationStatusId}
                                                    outcome={outcomeId}
                                                    encounterComments={encounterComments}
                                                    encounterDestination={encounterDestination}
                                                    titleId={titleId}
                                                />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --------------------------------------------------------------Allergy PopUp Begin--------------------------------------------------- */}
                        <div className="modal fade" id="allergyId" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabe2" aria-hidden="true">
                            <div className=" modal-dialog modal-dialog-scrollable modal-lg">
                                <div className="modal-content ">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">
                                            Allergy
                                        </h1>
                                        <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" onClick={() => { getAllEncoutersAsPerIssueID() }}>
                                            <i className="fa fa-times"></i>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div class="tab-content" id="myTabContent">
                                            {/* --------------------------Problem Tab Section----------------------------------------------- */}
                                            <div class="tab-pane fade show active" id="allergy" role="tabpanel" value="1" aria-labelledby="home-tab" tabindex="0">
                                                <OPDAllergyPopUp
                                                    setShowToster={setShowToster}
                                                    updatebool={updatebool}
                                                    setUpdateBool={setUpdateBool}
                                                    getAllEncoutersAsPerIssueID={getAllEncoutersAsPerIssueID}
                                                    rowId={rowId}
                                                    encounterTitle={encounterTitle}
                                                    encounterBeginDate={encounterBeginDate}
                                                    encounterEndDate={encounterEndDate}
                                                    encounterReferredBy={referredby}
                                                    encounterCoding={encounterCoding}
                                                    classificationName={classificationName}
                                                    occurrence={occurrenceId}
                                                    verificationStatus={verificationStatusId}
                                                    outcome={outcomeId}
                                                    encounterComments={encounterComments}
                                                    encounterDestination={encounterDestination}
                                                    titleId={titleId} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* --------------------------------------------------------------Allergy PopUp End--------------------------------------------------- */}

                        {/* --------------------------------------------------------------Medication PopUp Begin--------------------------------------------------- */}
                        <div className="modal fade" id="medicationId" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabe2" aria-hidden="true">
                            <div className=" modal-dialog modal-dialog-scrollable modal-lg">
                                <div className="modal-content ">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">
                                            Medication
                                        </h1>
                                        <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" onClick={() => { getAllEncoutersAsPerIssueID() }}>
                                            <i className="fa fa-times"></i>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div class="tab-content" id="myTabContent">
                                            {/* --------------------------Problem Tab Section----------------------------------------------- */}
                                            <div class="tab-pane fade show active" id="medication" role="tabpanel" value="1" aria-labelledby="home-tab" tabindex="0">
                                                <OPDMedicationPopUp setShowToster={setShowToster} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* --------------------------------------------------------------Medication PopUp End--------------------------------------------------- */}

                        {/* --------------------------------------------------------------Device PopUp Begin--------------------------------------------------- */}
                        <div className="modal fade" id="deviceId" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabe2" aria-hidden="true">
                            <div className=" modal-dialog modal-dialog-scrollable modal-lg">
                                <div className="modal-content ">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">
                                            Device
                                        </h1>
                                        <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" onClick={() => { getAllEncoutersAsPerIssueID() }}>
                                            <i className="fa fa-times"></i>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div class="tab-content" id="myTabContent">
                                            {/* --------------------------Problem Tab Section----------------------------------------------- */}
                                            <div class="tab-pane fade show active" id="device" role="tabpanel" value="1" aria-labelledby="home-tab" tabindex="0">
                                                <OPDDevicePopUp setShowToster={setShowToster} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* --------------------------------------------------------------Device PopUp End--------------------------------------------------- */}

                        {/* --------------------------------------------------------------Surgery PopUp Begin--------------------------------------------------- */}
                        <div className="modal fade" id="surgeryId" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabe2" aria-hidden="true">
                            <div className=" modal-dialog modal-dialog-scrollable modal-lg">
                                <div className="modal-content ">
                                    <div className="modal-header">
                                        <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">
                                            Surgery
                                        </h1>
                                        <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" onClick={() => { getAllEncoutersAsPerIssueID() }}>
                                            <i className="fa fa-times"></i>
                                        </button>
                                    </div>
                                    <div className="modal-body">
                                        <div class="tab-content" id="myTabContent">
                                            {/* --------------------------Problem Tab Section----------------------------------------------- */}
                                            <div class="tab-pane fade show active" id="surgery" role="tabpanel" value="1" aria-labelledby="home-tab" tabindex="0">
                                                <OPDSurgeryPopUp setShowToster={setShowToster} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* --------------------------------------------------------------Surgery PopUp End--------------------------------------------------- */}


                    </div>
                    {/* <OPDBottomSection /> */}
                    {/* {showToster === 1 ?
                        <AlertToster message={message} handle={setShowToster} /> : ""
                    } */}
                    <Loader val={showLoader} />


                </div>
                : <ConfirmModal bool={showPopUp} close={handlePopUp} getdata={getdata} />}

            {/* --------------------------------------------------------------Problem PopUp Begin--------------------------------------------------- */}

            {/* --------------------------------------------------------------Problem PopUp End--------------------------------------------------- */}

            {showToster === 1 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Problem Saved SuccessFully !!"
                />
            ) : (
                ""
            )}
            {showToster === 2 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Allergy Saved SuccessFully !!"
                />
            ) : (
                ""
            )}
            {showToster === 3 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Medication Saved SuccessFully !!"
                />
            ) : (
                ""
            )}
            {showToster === 4 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Device Saved SuccessFully !!"
                />
            ) : (
                ""
            )}
            {showToster === 5 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Problem Deleted SuccessFully !!"
                />
            ) : (
                ""
            )}
            {showToster === 6 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Problem Updated SuccessFully !!"
                />
            ) : (
                ""
            )}


            {/*  <!------------------- Start Delete Modal ---------------------------------->  */}
            <div className="modal fade" id="deleteModal" tabIndex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true" data-bs-backdrop="static">
                <div className="modal-dialog modalDelete">
                    <div className="modal-content">

                        <div className="modal-body modelbdy text-center">
                            <div className='popDeleteIcon'><i className="fa fa-trash"></i></div>
                            <div className='popDeleteTitle mt-3'>{t("Delete?")}</div>
                            <div className='popDeleteContent'>{t("Are_you_sure_you_want_to_delete?")}</div>
                        </div>
                        <div className="modal-footer1 text-center">

                            <button type="button" className="btncancel popBtnCancel me-2" data-bs-dismiss="modal">{t("Cancel")}</button>
                            <button type="button" className="btn-delete popBtnDelete" onClick={handleDeleteRow} data-bs-dismiss="modal">{t("Delete")}</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* {/ -----------------------End Delete Modal Popup--------------------- /} */}
        </>
        // <>
        // ffdfs</>
    )
}


let ConfirmModal = (props) => {

    const { t } = useTranslation()
    document.body.dir = i18n.dir();

    return (
        <div className={`modal d-${props.bool === 10 ? 'block' : 'none'}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">{t("Modal title")}</h1>
                        {/* <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button> */}
                    </div>
                    <div className="modal-body">
                        {t("Do you want to Visit Or Revisit Patient?")}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { props.close(-1); props.getdata(2, 1); }}>{t("Yes")}</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => { props.close(-1); props.getdata(2, 0); }}>{t("No")}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}