import React, { useEffect, useState } from 'react'
import Height from "../../../../../assets/images/OPD/height.svg"
import Weight from "../../../../../assets/images/OPD/weight.svg"
import BloodPressure from "../../../../../assets/images/OPD/bloodpressure.svg"
import PulseRate from "../../../../../assets/images/OPD/pulse.svg"
import RespiratoryRate from "../../../../../assets/images/OPD/ChestPain.svg"
import SaveIPDData from '../../../../../Code/SaveIPDData'
import { useSelector } from 'react-redux'
// import store from '../../../../../Store'
import { useTranslation } from 'react-i18next';
import i18n from "i18next";
import OPDTOPBottom from '../../../OPD/OPDSharePage/OPDPrescription/OPDTOPBottom'
import Heading from '../../../../../Component/Heading'
import addIcon from '../../../../../assets/images/icons/icons8-plus-30.png';
import NoDataFound from '../../../../../assets/images/icons/No data-rafiki.svg'
import FHIRGetEncounterByUHIDandIssueID from '../../../../API/FHIRApi/GET/FHIRGetEncounterByUHIDandIssueID'
import OPDProblemPopUp from '../../../OPD/OPDSharePage/OPDPrescription/FHIROPDPopUp/OPDProblemPopUp'
import SuccessToster from '../../../../../Component/SuccessToster'
import OPDAllergyPopUp from '../../../OPD/OPDSharePage/OPDPrescription/FHIROPDPopUp/OPDAllergyPopUp'
import OPDMedicationPopUp from '../../../OPD/OPDSharePage/OPDPrescription/FHIROPDPopUp/OPDMedicationPopUp'
import OPDDevicePopUp from '../../../OPD/OPDSharePage/OPDPrescription/FHIROPDPopUp/OPDDevicePopUp'
import OPDSurgeryPopUp from '../../../OPD/OPDSharePage/OPDPrescription/FHIROPDPopUp/OPDSurgeryPopUp'
// import OPDInvestigationProcedure from '../../../OPD/OPDSharePage/OPDPrescription/OPDInvestigationProcedure'
import DeleteEncounter from '../../../../API/FHIREncounter/DeleteEncounter'
import IconEdit from '../../../../../assets/images/icons/IconEdit.svg'
import IconDelete from '../../../../../assets/images/icons/IconDelete.svg';
import saveButtonIcon from '../../../../../assets/images/icons/saveButton.svg'
import InsertPatientVitalForONC from '../../../../API/OPD/Vitals/InsertPatientVitalForONC'
import RedirectUrl from '../../../OPD/OPDSharePage/OPDPrescription/PopUp/RedirectUrl'


export default function IPDTopVitals(props) {

    const { t } = useTranslation();
    document.body.dir = i18n.dir()
    let [showToster, setShowToster] = useState(0)
    let [activeComponent, setActiveComponent] = useState('');
    let [showTheButton, setShowTheButton] = useState(false);
    let [getIssueID, setIssueID] = useState('');
    let [getD, setGetD] = useState(0);

    let [rowId, setRowId] = useState('')
    const [updatebool, setUpdateBool] = useState(0);
    const [getHeadingName, setHeadingName] = useState('');
    let [showImage, setShowImage] = useState(0);
    // let [problemData, setProblemData] = useState()
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
    const [severityId, setSeverityId] = useState('');
    const [reactionId, setReactionId] = useState('');
    const [encounterComments, setEncounterComments] = useState('');
    const [encounterDestination, setEncounterDestination] = useState('');
    const [toShowDesiredList, setToShowDesiredList] = useState(false)

    const [getEncounterList, setEncounterList] = useState([]);
    let activeUHID = window.sessionStorage.getItem("activePatient")
        ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid
        : window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : [];

    const clientID = JSON.parse(sessionStorage.getItem("LoginData")).clientId;
    const userId = JSON.parse(sessionStorage.getItem("LoginData")).userId;

    const activeDocID = window.sessionStorage.getItem('OPDPatientData') ?
        JSON.parse(window.sessionStorage.getItem('OPDPatientData'))[0].doctorId : window.sessionStorage.getItem('IPDpatientList') ? JSON.parse(window.sessionStorage.getItem('IPDpatientList'))[0].doctorId : [];

    const activeDeptID = window.sessionStorage.getItem('OPDPatientData') ?
        JSON.parse(window.sessionStorage.getItem('OPDPatientData'))[0].departmentId : window.sessionStorage.getItem('IPDpatientList') ? JSON.parse(window.sessionStorage.getItem('IPDpatientList'))[0].deptId : [];

    const [isClose, setisClose] = useState(0);

    //Handle Delete
    let handleDeleteRow = async () => {
        let obj = {
            Id: rowId
        }

        // return;
        let response = await DeleteEncounter(obj)
        if (response.status === 1) {
            setShowToster(5);
            setShowToster(9)
            setShowToster(10)
            setShowToster(12)
            setShowToster(14)
            setTimeout(() => {
                setShowToster(0);
            }, 2000)
            if (getIssueID === 1) {
                setShowToster(5);
            }
            if (getIssueID === 2) {
                setShowToster(9)
            }
            if (getIssueID === 3) {
                setShowToster(10)
            }
            if (getIssueID === 4) {
                setShowToster(12)
            }
            if (getIssueID === 5) {
                setShowToster(14)
            }
            getAllEncoutersAsPerIssueID();

        }
        else {
            setTimeout(() => {
                setShowToster(0)
            }, 2000)
        }
    }

    let [sendVitals, setSendVitals] = useState(
        [
            {
                "vmId": 56,
                "vmValue": "",
                "name": "spo2",
                "img": Height,
                "unit": "%",
                "shortname": t("SPO2"),
                "maxLimit": 100,

            },
            {
                "vmId": 4,
                "vmValue": "",
                "name": "BP_Sys",
                "img": BloodPressure,
                "unit": "mmHg",
                "shortname": t("BPS"),
                "maxLimit": 500

            },
            {
                "vmId": 6,
                "vmValue": "",
                "name": "BP_Dias",
                "img": BloodPressure,
                "unit": "mmHg",
                "shortname": t("BPD"),
                "maxLimit": 1000

            },
            {
                "vmId": 3,
                "vmValue": "",
                "name": "Pulse",
                "img": PulseRate,
                "unit": "bpm",
                "shortname": t("PR"),
                "maxLimit": 170

            },
            {
                "vmId": 7,
                "vmValue": "",
                "name": "respRate",
                "img": RespiratoryRate,
                "unit": "bpm",
                "shortname": t("RR"),
                "maxLimit": 2300

            },
            {
                "vmId": 5,
                "vmValue": "",
                "name": "Temperature",
                "img": Height,
                "unit": "°F",
                "shortname": t("Temp"),
                "maxLimit": 109

            },
            {
                "vmId": 2,
                "vmValue": "",
                "name": "Weight",
                "img": Weight,
                "unit": "kg",
                "shortname": t("Wt"),
                "maxLimit": 500

            },
            {
                "vmId": 1,
                "vmValue": "",
                "name": "Height",
                "img": Height,
                "unit": "CM",
                "shortname": t("Ht"),
                "maxLimit": 272
            }]
    );


    let handleOnchange = (e) => {
        let value = e.target.value;
        let name = e.target.name;
        let temp = [...sendVitals]

        if (value !== "" && parseFloat(value) < 0) {
            // Prevent negative values
            // You can show an error message, set the input to 0, or handle it as you prefer
            // For example, setting it to 0:
            value = "0";
        }

        if (value !== "") {
            sendVitals.map(((val, ind) => {
                if (val.vmId === parseInt(name)) {

                    if ((val.maxLimit && parseInt(value) > val.maxLimit)) {
                        document.getElementById('vitalId' + parseInt(name)).style.border = "2px solid red";
                        document.getElementById('vitalLabel' + parseInt(name)).style.color = "red";
                        //temp[ind].vmValue = parseFloat(value);
                    } else {
                        temp[ind].vmValue = parseFloat(value);
                        document.getElementById('vitalId' + parseInt(name)).style.border = "1px solid #e5e5e5";
                        document.getElementById('vitalLabel' + parseInt(name)).style.color = "#1d4999";
                    }
                }
            }))
        }
        else {
            sendVitals.map(((val, ind) => {
                if (val.vmId === parseInt(name)) {
                    temp[ind].vmValue = ""
                }
            }))
        }


        setSendVitals(temp)
        SaveIPDData(temp, "jsonVital")
    }

    let patientsendDataChange = useSelector((state) => state.IPDPatientSendData)


    let setData = () => {
        let temp = window.sessionStorage.getItem("IPDpatientsendData") ? JSON.parse(window.sessionStorage.getItem("IPDpatientsendData")) : []
        let activeUHID = window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []
        let tempVital = [...sendVitals]
        temp.map((value, index) => {
            value.map((val, ind) => {
                if (value[0] === activeUHID) {
                    let key = Object.keys(val)
                    if (key[0] === "jsonVital") {
                        if (val.jsonVital.length != 0) {
                            val.jsonVital.map((val, ind) => {
                                sendVitals.map((v, i) => {
                                    if (val.vmId === v.vmId) {
                                        tempVital[i]["vmValue"] = val.vmValue
                                    }
                                })
                            })
                            setSendVitals(tempVital)
                        }
                        else {
                            setSendVitals([
                                {
                                    "vmId": 56,
                                    "vmValue": "",
                                    "name": "spo2",
                                    "img": Height,
                                    "unit": "%",
                                    "shortname": t("SPO2")

                                },
                                {
                                    "vmId": 4,
                                    "vmValue": "",
                                    "name": "BP_Sys",
                                    "img": BloodPressure,
                                    "unit": "mmHg",
                                    "shortname": t("BPS")

                                },
                                {
                                    "vmId": 6,
                                    "vmValue": "",
                                    "name": "BP_Dias",
                                    "img": BloodPressure,
                                    "unit": "mmHg",
                                    "shortname": t("BPD")

                                },
                                {
                                    "vmId": 3,
                                    "vmValue": "",
                                    "name": "Pulse",
                                    "img": PulseRate,
                                    "unit": "bpm",
                                    "shortname": t("PR")

                                },
                                {
                                    "vmId": 7,
                                    "vmValue": "",
                                    "name": "respRate",
                                    "img": RespiratoryRate,
                                    "unit": "bpm",
                                    "shortname": t("RR")

                                },
                                {
                                    "vmId": 5,
                                    "vmValue": "",
                                    "name": "Temperature",
                                    "img": Height,
                                    "unit": "(°F)",
                                    "shortname": t("Temp")

                                },
                                {
                                    "vmId": 2,
                                    "vmValue": "",
                                    "name": "Weight",
                                    "img": Weight,
                                    "unit": "kg",
                                    "shortname": t("Wt")

                                },
                                {
                                    "vmId": 1,
                                    "vmValue": "",
                                    "name": "Height",
                                    "img": Height,
                                    "unit": "CM",
                                    "shortname": t("Ht")
                                }])
                        }
                    }
                }
            })
        })
        // SaveIPDData(tempVital, "jsonVital")

    }

    // useEffect(() => {
    //     if (props.loader === 1) {
    //         SaveIPDData(sendVitals, "jsonVital")
    //     }
    // }, [sendVitals])

    const getAllEncoutersAsPerIssueID = async () => {
        const getRes = await FHIRGetEncounterByUHIDandIssueID(activeUHID, getIssueID, props.theEncounterId);

        if (getRes.status === 1) {
            setEncounterList(getRes.responseValue);
            setShowImage(0)
        }
        else {
            setShowImage(1)
        }

    }

    let handleUpdate = (encounterId, encounterTitle, encounterBeginDate, encounterEndDate, encounterReferredBy, encounterCoding, classificationTypeId, occurrenceId, verificationStatusId, outcomeId, encounterComments, encounterDestination, titleId, severityId, reactionId) => {
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
        setSeverityId(severityId);
        setReactionId(reactionId);
    }

    const handleSaveVital = async () => {
        const saveObj = {
            deptId: activeDeptID,
            doctorId: activeDocID,
            uhid: activeUHID,
            userId: userId,
            clientId: clientID,
            jsonVital: JSON.stringify(sendVitals)
        }
        const saveRes = await InsertPatientVitalForONC(saveObj);
        if (saveRes.status === 1) {
            setShowToster(16)
            setTimeout(() => {
                setShowToster(0);
            }, 2000)
        }
        else {
            alert('Not saved')
        }
    }

    useEffect(() => {
        setData()
    }, [patientsendDataChange])

    useEffect(() => {
        if (showTheButton === true) {

            getAllEncoutersAsPerIssueID();
        }
        setData()

    }, [showTheButton, getIssueID]);
    useEffect(() => {

        getAllEncoutersAsPerIssueID();
        setData()

    }, [props.theEncounterId])

    return (
        <div className='roww'>

            {/* <div className={`col m-0 vitasopd boxcontainer`}>

                {sendVitals && sendVitals.map((val, ind) => {
                    if (val.vmId === 4) {
                        return (
                            <div className=' d-flex flex-row didd' style={{ width: "250px", border: "1px solid #E5E5E5", borderRadius: "5px", 'margin-bottom': '10px' }} >
                                <div className="did-floating-label-content pe-2 ">
                                    <input autoComplete="off" className="did-floating-input" type="number" id={'vitalId' + val.vmId} style={{ maxWidth: "108px", border: "none" }} name={val.vmId} placeholder=" " value={val.vmValue != "" ? val.vmValue : ""} onChange={handleOnchange} />
                                    <label className={`${(val.vmValue === "") || (val.vmValue === 0) ? "did-floating-label" : !Number.isNaN(val.vmValue) ? "temp-did-floating-label" : "did-floating-label"} `} id={'vitalLabel' + val.vmId}> <img src={val.img} className='pe-1' alt='' />{val.shortname} <span className='vitalUnit'>{val.unit}</span></label>
                                </div>
                                <div className='pt-2'>/&nbsp;</div>
                                <div className="did-floating-label-content pe-2 didd">
                                    <input autoComplete="off" className="did-floating-input" id={'vitalId' + 6} type="number" style={{ maxWidth: "108px", border: "none" }} name={6} placeholder=" " value={sendVitals[2].vmValue != "" ? sendVitals[2].vmValue : ""} onChange={handleOnchange} />
                                    <label className={`${(sendVitals[2].vmValue === "") || (sendVitals[2].vmValue === 0) ? "did-floating-label" : !Number.isNaN(val.vmValue) ? "temp-did-floating-label" : "did-floating-label"} `} id={'vitalLabel' + 6}> <img src={val.img} className='pe-1' alt='' />{sendVitals[2].shortname} <span className='vitalUnit'>{sendVitals[2].unit}</span></label>
                                </div>

                            </div>
                        )
                    }
                    else if (val.vmId !== 6) {
                        return (

                            <div className="did-floating-label-content pe-2 didd">
                                <input autoComplete="off" className="did-floating-input" type="number" id={'vitalId' + val.vmId} style={{ maxWidth: "108px" }} name={val.vmId} placeholder=" " value={val.vmValue != "" ? val.vmValue : ""} onChange={handleOnchange} />
                                <label className={`${(val.vmValue === "") || (val.vmValue === 0) ? "did-floating-label" : !Number.isNaN(val.vmValue) ? "temp-did-floating-label" : "did-floating-label"} `} id={'vitalLabel' + val.vmId}> <img src={val.img} className='pe-1' alt='' />{val.shortname} <span className='vitalUnit'>{val.unit}</span></label>
                            </div>
                        )
                    }
                })}

                <button type="button" className="btn btn-save btn-save-fill btn-sm did-floating-input mb-1 me-1" onClick={handleSaveVital}><img src={saveButtonIcon} className='icnn' alt="" />Save</button>
            </div> */}

            {/* <div className={`d-flex gap-1 boxcontainer mt-2 `} style={{ padding: "7px", overflowX: "auto" }}>

                
                <div>

                <OPDTOPBottom values={getD} funh={setGetD} setActiveComponent={setActiveComponent} setShowTheButton = {setShowTheButton} setIssueID = {setIssueID} setHeadingName = {setHeadingName} />
                </div>
                {showTheButton && (
                <div className={`d-flex justify-content-between align-items-center boxcontainer mt-2`} style={{ padding: "7px", overflowX: "auto" }}>
                    <Heading text={getHeadingName} />
                    <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" data-bs-toggle="modal" data-bs-target={'#'+activeComponent}>
                        <img src={addIcon} className='icnn' alt='' />
                        Add
                    </button>
                </div>
                )}
            </div> */}
            <div className='col-md-12 col-sm-12 plt1'>
                {/* <OPDPatientInputData values={getD} funh={setGetD} setFoodData={setFoodData} /> */}
                <div className={`d-flex gap-1 boxcontainer mt-2 `} style={{ padding: "7px", overflowX: "auto" }}>
                    <OPDTOPBottom values={getD} funh={setGetD} setActiveComponent={setActiveComponent} setShowTheButton={setShowTheButton} setIssueID={setIssueID} setHeadingName={setHeadingName} theEncounterId={props.theEncounterId} setToShowDesiredList={setToShowDesiredList} />
                </div>
                {showTheButton && toShowDesiredList ? (
                    <div className={`d-flex justify-content-between align-items-center boxcontainer mt-2`} style={{ padding: "7px", overflowX: "auto" }}>
                        <Heading text={getHeadingName} />
                        <button type="button" className="btn btn-save btn-save-fill btn-sm mb-1 me-1" data-bs-toggle="modal" data-bs-target={'#' + activeComponent} >
                            <img src={addIcon} className='icnn' alt='' />
                            Add
                        </button>
                    </div>
                ) : null}
                {toShowDesiredList === true ?
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
                                            <th>Severity Name</th>
                                            <th>Reaction Name</th>
                                            <th>Outcome Name</th>
                                            <th style={{ "width": "10%" }} className="text-center">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {getEncounterList && getEncounterList.map((list, ind) => {
                                            const codingListItem = list.encounterCoding ? list.encounterCoding.split(';') : [];

                                            return (
                                                <tr className="text-center" key={list.id}>
                                                    <td className="text-center">{ind + 1}</td>
                                                    <td style={{ whiteSpace: 'nowrap' }}>{list.encounterTitle}</td>
                                                    {/* <td>{list.encounterCoding}</td> */}
                                                    <RedirectUrl codingListItem={codingListItem} />
                                                    {/* <td>
                                                        <div className='codeSplit'>
                                                            {codingListItem.map((coding, index) => (
                                                                coding.trim() !== '' &&
                                                                <span key={index} className="">{coding}</span>
                                                            ))}
                                                        </div>
                                                    </td> */}
                                                    <td style={{ whiteSpace: 'nowrap' }}>{list.encounterBeginDate}</td>
                                                    <td style={{ whiteSpace: 'nowrap' }}>{list.encounterEndDate}</td>
                                                    <td>{list.encounterReferredBy}</td>
                                                    <td>{list.encounterComments}</td>
                                                    <td>{list.encounterDestination}</td>
                                                    <td>{list.classificationName}</td>
                                                    <td>{list.occuranceName}</td>
                                                    <td>{list.verificationName}</td>
                                                    <td>{list.severityName ? list.severityName : '--'}</td>
                                                    <td>{list.reactionTitle ? list.reactionTitle : '--'}</td>
                                                    <td>{list.outComeName}</td>
                                                    <td>
                                                        <div className="action-button">
                                                            {getIssueID === 1 ?
                                                                <div data-bs-toggle="modal" data-bs-title="Edit Row" data-bs-placement="bottom" data-bs-target="#problemId" title="Edit Row" onClick={() => { handleUpdate(list.encounterId, list.encounterTitle, list.encounterBeginDate, list.encounterEndDate, list.encounterReferredBy, list.encounterCoding, list.classificationTypeId, list.occurrenceId, list.verificationStatusId, list.outcomeId, list.encounterComments, list.encounterDestination, list.titleId, list.severityId, list.reactionId) }}><img src={IconEdit} alt='' /></div>
                                                                :
                                                                getIssueID === 2 ?
                                                                    <div data-bs-toggle="modal" data-bs-title="Edit Row" data-bs-placement="bottom" data-bs-target="#allergyId" title="Edit Row" onClick={() => { handleUpdate(list.encounterId, list.encounterTitle, list.encounterBeginDate, list.encounterEndDate, list.encounterReferredBy, list.encounterCoding, list.classificationTypeId, list.occurrenceId, list.verificationStatusId, list.outcomeId, list.encounterComments, list.encounterDestination, list.titleId, list.severityId, list.reactionId) }}><img src={IconEdit} alt='' /></div>
                                                                    :
                                                                    getIssueID === 3 ?
                                                                        <div data-bs-toggle="modal" data-bs-title="Edit Row" data-bs-placement="bottom" data-bs-target="#medicationId" title="Edit Row" onClick={() => { handleUpdate(list.encounterId, list.encounterTitle, list.encounterBeginDate, list.encounterEndDate, list.encounterReferredBy, list.encounterCoding, list.classificationTypeId, list.occurrenceId, list.verificationStatusId, list.outcomeId, list.encounterComments, list.encounterDestination, list.titleId, list.severityId, list.reactionId) }}><img src={IconEdit} alt='' /></div>
                                                                        : getIssueID === 4 ?
                                                                            <div data-bs-toggle="modal" data-bs-title="Edit Row" data-bs-placement="bottom" data-bs-target="#deviceId" title="Edit Row" onClick={() => { handleUpdate(list.encounterId, list.encounterTitle, list.encounterBeginDate, list.encounterEndDate, list.encounterReferredBy, list.encounterCoding, list.classificationTypeId, list.occurrenceId, list.verificationStatusId, list.outcomeId, list.encounterComments, list.encounterDestination, list.titleId, list.severityId, list.reactionId) }}><img src={IconEdit} alt='' /></div>
                                                                            : getIssueID === 5 ?
                                                                                <div data-bs-toggle="modal" data-bs-title="Edit Row" data-bs-placement="bottom" data-bs-target="#surgeryId  " title="Edit Row" onClick={() => { handleUpdate(list.encounterId, list.encounterTitle, list.encounterBeginDate, list.encounterEndDate, list.encounterReferredBy, list.encounterCoding, list.classificationTypeId, list.occurrenceId, list.verificationStatusId, list.outcomeId, list.encounterComments, list.encounterDestination, list.titleId, list.severityId, list.reactionId) }}><img src={IconEdit} alt='' /></div>
                                                                                : ''
                                                            }

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
                    : null}



                <div className="modal fade" id="problemId" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                    <div className=" modal-dialog modal-dialog-scrollable modal-lg">
                        <div className="modal-content ">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 text-white " id="staticBackdropLabel">
                                    Problem
                                </h1>
                                <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" onClick={() => { getAllEncoutersAsPerIssueID(); setisClose(1) }}>
                                    <i className="fa fa-times"></i>
                                </button>
                                {/* <button type="button" className="btn-close_ btnModalClose" aria-label="Close" onClick={() => { 
                                    getAllEncoutersAsPerIssueID();
                                    // Close the modal manually
                                    document.getElementById('problem').classList.remove('show');
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
                                            severity={severityId}
                                            reaction={reactionId}
                                            isCloseModal={isClose}
                                            fnisClose={setisClose}
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
                                <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" onClick={() => { getAllEncoutersAsPerIssueID(); setisClose(1) }}>
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
                                            titleId={titleId}
                                            severity={severityId}
                                            reaction={reactionId}
                                            isCloseModal={isClose}
                                            fnisClose={setisClose}
                                        />
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
                                <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" onClick={() => { getAllEncoutersAsPerIssueID(); setisClose(1) }}>
                                    <i className="fa fa-times"></i>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div class="tab-content" id="myTabContent">
                                    {/* --------------------------Problem Tab Section----------------------------------------------- */}
                                    <div class="tab-pane fade show active" id="medication" role="tabpanel" value="1" aria-labelledby="home-tab" tabindex="0">
                                        <OPDMedicationPopUp
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
                                            severity={severityId}
                                            reaction={reactionId}
                                            isCloseModal={isClose}
                                            fnisClose={setisClose} />
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
                                <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" onClick={() => { getAllEncoutersAsPerIssueID(); setisClose(1) }}>
                                    <i className="fa fa-times"></i>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div class="tab-content" id="myTabContent">
                                    {/* --------------------------Problem Tab Section----------------------------------------------- */}
                                    <div class="tab-pane fade show active" id="device" role="tabpanel" value="1" aria-labelledby="home-tab" tabindex="0">
                                        <OPDDevicePopUp
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
                                            severity={severityId}
                                            reaction={reactionId}
                                            encounterComments={encounterComments}
                                            encounterDestination={encounterDestination}
                                            isCloseModal={isClose}
                                            fnisClose={setisClose} />
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
                                <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" onClick={() => { getAllEncoutersAsPerIssueID(); setisClose(1) }}>
                                    <i className="fa fa-times"></i>
                                </button>
                            </div>
                            <div className="modal-body">
                                <div class="tab-content" id="myTabContent">
                                    {/* --------------------------Problem Tab Section----------------------------------------------- */}
                                    <div class="tab-pane fade show active" id="surgery" role="tabpanel" value="1" aria-labelledby="home-tab" tabindex="0">
                                        <OPDSurgeryPopUp
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
                                            severity={severityId}
                                            reaction={reactionId}
                                            isCloseModal={isClose}
                                            fnisClose={setisClose} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* --------------------------------------------------------------Surgery PopUp End--------------------------------------------------- */}

            </div>


            {showToster === 1 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Problem saved successfully !!"
                />
            ) : (
                ""
            )}
            {showToster === 2 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Allergy saved successfully !!"
                />
            ) : (
                ""
            )}
            {showToster === 3 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Medication saved successfully !!"
                />
            ) : (
                ""
            )}
            {showToster === 4 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Device saved successfully !!"
                />
            ) : (
                ""
            )}
            {showToster === 5 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Problem deleted successfully !!"
                />
            ) : (
                ""
            )}
            {showToster === 6 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Problem updated successfully !!"
                />
            ) : (
                ""
            )}
            {showToster === 7 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Allergy updated successfully !!"
                />
            ) : (
                ""
            )}
            {showToster === 8 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Medication updated successfully !!"
                />
            ) : (
                ""
            )}
            {showToster === 9 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Allergy deleted successfully !!"
                />
            ) : (
                ""
            )}
            {showToster === 10 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Medication deleted successfully !!"
                />
            ) : (
                ""
            )}
            {showToster === 11 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Device updated successfully !!"
                />
            ) : (
                ""
            )}
            {showToster === 12 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Device deleted successfully !!"
                />
            ) : (
                ""
            )}
            {showToster === 13 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Surgery updated successfully !!"
                />
            ) : (
                ""
            )}
            {showToster === 14 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Surgery deleted successfully !!"
                />
            ) : (
                ""
            )}
            {showToster === 15 ? (
                <SuccessToster
                    handle={setShowToster}
                    message="Surgery saved successfully !!"
                />
            ) : (
                ""
            )}
            {showToster === 16 ? (<SuccessToster handle={setShowToster} message="Vitals saved successfully !!" />) : ("")}

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

        </div>
    )
}

