import React from 'react'
import SuccessToster from '../../../../../Component/SuccessToster'
import { useState } from 'react'
import POSTOPDPatientPrescription from '../../../../API/OPD/Prescription/POSTOPDPatientPrescription'
import PostPatientIPDPrescription from '../../../../API/IPD/Prescription/PostPatientIPDPrescription'
import GetPatientHistoryByUHID from '../../../../API/OPD/Prescription/PatientHistoryOnClick/GetPatientHistoryByUHID'
import GetPatientVitalHistoryByPmID from '../../../../API/OPD/Prescription/PatientHistoryOnClick/GetPatientVitalHistoryByPmID'
import AlertToster from '../../../../../Component/AlertToster'

import send from '../../../../../assets/images/icons/send.svg'
import save from '../../../../../assets/images/icons/save.svg'
import ph from '../../../../../assets/images/Ventilator/ph.svg'
import NotificationLog from '../../../../API/Notification/NotificationLog'
import InsertPrescriptionNotification from '../../../../../Pharmacy/NotificationAPI/InsertPrescriptionNotification'
import IPDPatientHistory from './Popup/IPDPatientHistory';
import { useTranslation } from 'react-i18next';
import i18n from "i18next";

export default function BottomButtons(props) {

    const { t } = useTranslation();

    let [showToster, setShowtoster] = useState(0);
    let [showAlertToster, setShowAlertToster] = useState(0);
    let [showTosterMessage, setShowTosterMessage] = useState("");
    ////////// Dev - Waqar /////////////////////////////////////////
    let [patientHistoryList, setPatientHistoryList] = useState([]);
    let [medicationHistoryList, setMedicationHistoryList] = useState([]);
    let [signSymptomsList, setSignSymptomsLists] = useState([]);
    let [vitalsDetails, setVitalsDetails] = useState([])
    /////////////////////// End ///////////////////////////////////////////

    let activePatient = window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []
    let DepartmentId = JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId

    let handlesave = async () => {

        let patientdata = JSON.parse(window.sessionStorage.getItem("IPDpatientsendData"))
        let tempSendData = {}
        patientdata.map((value, index) => {
            value.map((val, ind) => {
                if (value[0] === activePatient) {
                    let key = Object.keys(val)
                    if (key[0] === "jsonArray") {

                        tempSendData["jsonArray"] = JSON.stringify(val.jsonArray)

                    }
                    else if (key[0] === "patientInvestigation") {
                        tempSendData["jsonInvestigation"] = JSON.stringify(val.patientInvestigation)

                    }
                    else if (key[0] === "jsonVital") {
                        tempSendData["jsonVital"] = JSON.stringify(val.jsonVital)

                    }
                    else if (key[0] === "jsonDiagnosis") {

                        if (tempSendData.jsonDiagnosis != undefined || tempSendData.jsonDiagnosis != null) {
                            tempSendData["jsonDiagnosis"] = [...tempSendData.jsonDiagnosis, ...val.jsonDiagnosis]

                        }
                        else {
                            tempSendData["jsonDiagnosis"] = val.jsonDiagnosis

                        }

                    }
                    else if (key[0] === "jsonFood") {
                        if (tempSendData.jsonDiagnosis != undefined || tempSendData.jsonDiagnosis != null) {
                            tempSendData["jsonDiagnosis"] = [...tempSendData.jsonDiagnosis, ...val.jsonFood]

                        }
                        else {
                            tempSendData["jsonDiagnosis"] = val.jsonFood

                        }
                    }
                    else if (key[0] === "patientExaminationResult") {
                        tempSendData["jsonExamination"] = JSON.stringify(val.patientExaminationResult)
                    }
                    else if (key[0] === "patientHistoryCategoryResult") {
                        tempSendData["jsonHistory"] = JSON.stringify(val.patientHistoryCategoryResult)
                    }
                    // else if (key[0] === "nextVisitDate") {

                    //     tempSendData["nextVisitDate"] = val.nextVisitDate


                    // }


                }
            })
        })


        let flag = 0
        let diagnoFlaf = 0
        if(Object.keys(tempSendData).length !== 0)
        {
            console.log("csdcsdcsd",tempSendData.length )
            if (tempSendData["jsonDiagnosis"].length !== 0 && tempSendData["jsonDiagnosis"][0] !== null) {
                if (tempSendData["jsonDiagnosis"][tempSendData["jsonDiagnosis"].length - 1] === null) {
                    tempSendData["jsonDiagnosis"].pop()
                }
                tempSendData["jsonDiagnosis"].map((v, i) => {
                    if (v.pdmId === 2) {
                        flag = 1
                    }
                    if (v.pdmId === 4) {
                        diagnoFlaf = 1
                    }
    
    
                })
            }
        }
       

        // get data from complaint and diagnosis
        if (document.getElementById("symptomsData").value !== "") {
            let row = { "problemId": 0, "problemName": document.getElementById("symptomsData").value, "pdmId": 2 }
            tempSendData["jsonDiagnosis"].push(row)

        }

        console.log("sdmcsdcsbds,", window.userId)

        if (document.getElementById("consultantData").value !== "") {
            let row = { "problemId": 0, "problemName": document.getElementById("consultantData").value, "pdmId": 4 }
            tempSendData["jsonDiagnosis"].push(row)
        }

        tempSendData["jsonDiagnosis"] = JSON.stringify(tempSendData["jsonDiagnosis"])
        tempSendData["userId"] = window.userId
        tempSendData["uhId"] = activePatient
        tempSendData["deptId"] = DepartmentId
        tempSendData["doctorId"] = window.userId

        // let temparray = JSON.parse(tempSendData.jsonArray)
        // JSON.parse(tempSendData.jsonArray).map((val, ind) => {
        //     if (val.id === 0 && val.drugName === "") {
        //         temparray.splice(ind, 1)
        //     }
        // })

        let freqFlag = [-1, -1]
        let durationFlag = [-1, -1]
        let temparray = JSON.parse(tempSendData.jsonArray)
        console.log("ddddddddddd", temparray)
        JSON.parse(tempSendData.jsonArray).map((val, ind) => {
            console.log("val", val)
            if (val.id === 0 && val.drugName === "") {
                temparray.splice(ind, 1)
            }
            else if (val.doseFrequency === "") {
                freqFlag = [0, ind + 1]
                return
            }
            else if (val.duration === "-1") {
                durationFlag = [0, ind + 1]
                return durationFlag
            }
            // else {
            //     if (val.drugName !== "") {
            //         if (freqFlag[0] === -1) {

            //         }
            //         freqFlag = [0, ind + 1]
            //     }
            // }

        })


        tempSendData["jsonArray"] = JSON.stringify(temparray)
        console.log(flag === 1 && diagnoFlaf === 1 && freqFlag[0] === -1 && durationFlag[0] === -1)
        console.log("dasdsadsavkvvvahdvasdasdas", tempSendData)
        // return
        if (flag === 1 && diagnoFlaf === 1 && freqFlag[0] === -1 && durationFlag[0] === -1) {
            let response = await PostPatientIPDPrescription(tempSendData)

            if (response.status === 1) {
                setShowtoster(1)
                setShowTosterMessage("Data Save Successfully!!")
                props.getData()
            }

            else {
                if (response.responseValue.toString().toLowerCase() === "Column 'vmValue' cannot be null".toString().toLowerCase()) {
                    setShowAlertToster(1)
                    setShowTosterMessage("Please Fill Vitals!!")
                }
                else {
                    setShowAlertToster(1)
                    setShowTosterMessage(response.responseValue)
                }


            }
        }
        else {
            console.log("flags", freqFlag, durationFlag)
            if (flag === 0) {
                setShowAlertToster(1)
                setShowTosterMessage(t("Please Fill Patient complaint"))
            }
            else if (diagnoFlaf === 0) {
                setShowAlertToster(1)
                setShowTosterMessage(t("Please Fill Consultant Diagnosis"))
            }
            else if (freqFlag[0] === 0 && freqFlag[1] !== -1) {
                setShowAlertToster(1)
                setShowTosterMessage(t("Please Fill Medicine Frequency At Row") + freqFlag[1])
            }
            else if (durationFlag[0] === 0 && durationFlag[1] !== -1) {
                setShowAlertToster(1)
                setShowTosterMessage(t("Please Fill Medicine Duration At Row") + durationFlag[1])
            }
            else {
                setShowAlertToster(1)
                setShowTosterMessage(t("Please Fill Patient Next Visit Date"))
            }
        }
    };


    document.body.dir = i18n.dir();


    let sendNotification = async (datas) => {
        let activeUHID = window.sessionStorage.getItem("IPDactivePatient") ? JSON.parse(window.sessionStorage.getItem("IPDactivePatient")).Uhid : []
        let patientname = JSON.parse(window.sessionStorage.getItem("IPDpatientList")).filter((val) => val.uhId.toString() === activeUHID.toString())
        let doctorName = JSON.parse(window.sessionStorage.getItem("LoginData")).name
        console.log("dsfsdfsda", doctorName)
        let data = {
            "userId": window.userId,
            "Uhid": activeUHID,
            "medicineData": datas,
            "patientName": patientname[0].patientName,
            "doctorName": doctorName
        }
        let sendData = {

            "id": 0,
            "notificationTitle": "prescribe medicine",
            "senderId": window.userId,
            // "recieverId": 331,
            "recieverId": 207,
            "prescriptionDetails": JSON.stringify(data),
            "comingFrom": "IPD",
            "status": true,
            "createdDate": "2023-09-20T11:37:18.644Z",
            "isSent": true


            // "notificationTemplateId": 0,
            // "notificationTitle": "prescribe medicine",
            // "senderId": window.userId,
            // "recieverId": 99,
            // "isSent": 0,
            // "responseValue": JSON.stringify(data),
            // "isSystemGenerated": true,
            // "status": true,
            // "methodName": "receivePrescription"
        }
        console.log("sedn data", JSON.stringify(sendData))
        let response = await InsertPrescriptionNotification(sendData)

        if (response.status === 1) {
            console.log("res", response)
            setShowtoster(1)
            setShowTosterMessage(t("Prescription sent to Pharmacy"))
        }
    }

    let handleSendPrescriptionForPharmacy = () => {
        let patientdata = JSON.parse(window.sessionStorage.getItem("IPDpatientsendData"))
        patientdata.map((value, index) => {
            value.map((val, ind) => {
                if (value[0] === activePatient) {
                    let key = Object.keys(val)
                    if (key[0] === "jsonArray") {
                        sendNotification(val.jsonArray)
                    }
                }
            })
        })
    }

    return (
        <div className={`d-flex flex-wrap align-items-center justify-content-between boxcontainer ps-2 ms-1 pe-2 me-1  mt-0 ipdbtn`}>
            <div className='d-flex flex-wrap align-items-center gap-2'>
                <select name="" id="" className='saveprintopd ps-3 pe-3'>
                    <option value="">
                        {t("DISCHARGE")}
                    </option>
                    <option >
                        {t("OPINION")}
                    </option>
                    <option >
                        {t("REVIEW")}
                    </option>
                    <option >
                        {t("DIET_ADVICE")}
                    </option>
                </select>
                <button className='saveprintopd ps-3 pe-3 btnbluehover' data-bs-toggle="modal" data-bs-title="Delete Row" data-bs-placement="bottom" data-bs-target="#deleteModal" ><img src={ph} className='icnn' /> {t("PATIENT_HISTORY")}</button>
                {/* 
                <button className='saveprintopd ps-3 pe-3' data-bs-toggle="offcanvas" style={{ width: "150px" }}>Discharge</button>
                <button className='saveprintopd ps-3 pe-3' style={{ width: "150px" }}>Opinion</button>
                <button className='saveprintopd ps-3 pe-3' style={{ width: "135px" }}>Diet Advice</button>
                <button className='saveprintopd ps-3 pe-3' style={{ width: "135px" }}>Review</button> */}
            </div>
            <div className='d-flex flex-wrap align-items-center gap-2'>
                {/* <button className='saveprintopd ps-3 pe-3' data-bs-toggle="offcanvas" style={{ width: "150px" }} >Antibiogram</button>
                <button className='saveprintopd ps-3 pe-3' style={{ width: "150px" }} >Vital History</button> */}
                {/* <button className='saveprintopd ps-3 pe-3 btn-save-fill' onClick={handlesave}><img src={save} className='icnn' />{t("SAVE_PRESCRIPTION")}</button> */}
            </div>
            <div className='d-flex flex-wrap align-items-center gap-2'>
                <button className='saveprintopd ps-3 pe-3 btn-save-fill' onClick={handlesave}><img src={save} className='icnn' alt='' />{t("SAVE_PRESCRIPTION")}</button>
                <button className='saveprintopd ps-3 pe-3 btn-save-fill' onClick={handleSendPrescriptionForPharmacy}><img src={send} className='icnn'  alt='' />{t("Send_to_Pharmacy")}</button>
            </div>


            {
                showToster === 1 ?
                    <SuccessToster handle={setShowtoster} message={showTosterMessage} /> : ""
            }
            {
                showAlertToster === 1 ? <AlertToster handle={setShowAlertToster} message={showTosterMessage} /> : ""
            }

            {/* ######################## Moodal Pop Area By WAQAR #################### */}

            {/* <div className="modal fade" id="deleteModal" data-bs-backdrop="static">
                <div className="modal-dialog" style={{ maxWidth: '60vw' }}>
                    <div className="modal-content px-1_" style={{ paddingBottom: '12px' }}>
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-white " id="exampleModalLabel"> Patient History</h1>
                            <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title='Close Window'><i className="bi bi-x-octagon"></i></button>
                        </div>
                        <div className="modal-body p-0">
                            <div className="row">
                                <div className="col-12">
                                    <div className='med-table-section'>
                                        <table className="med-table border striped">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th style={{ width: '8%' }}>Visit Date</th>
                                                    <th>Dept</th>
                                                    <th>Consultant</th>
                                                    <th>Diagnosis</th>
                                                    <th className='text-center'>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="accordion accordionPatientRaceSection" id="accordionExample">
                                                {patientHistoryList && patientHistoryList.map((list, index) => {
                                                    console.log('list : ', list)
                                                    console.log('patient history from database : ', patientHistoryList)
                                                    return (<>
                                                        <tr >
                                                            <td>{index + 1}</td>
                                                            <td>{list.visitDate}</td>


                                                            <td>{list.departmentName === '' ? <span style={{ fontSize: '14px', padding: '5px 4px' }}>Not Assigned</span> : <span>{list.departmentName}</span>}</td>

                                                            <td>{list.consultantName === '' ? <span style={{ fontSize: '14px', padding: '5px 4px' }}>Not Assigned</span> : <span>{list.consultantName}</span>}</td>

                                                            <td>{list.diagnosis === '' ? <span style={{ fontSize: '14px', padding: '5px 4px' }}>No Diagnosis</span> : <span>{list.diagnosis}</span>}</td>
                                                            <td value={list.id} className='text-center d-flex justify-content-center gap-2'>
                                                                <i className="fa fa-eye accordion-button_ collapsed pointer" data-bs-toggle="collapse" data-bs-target={'#collapseOne' + list.pmID} aria-expanded="false" style={{ color: 'rgb(0, 47, 117)' }} onClick={() => { getVitalByPmId(list.pmID) }}></i>
                                                                <i className='fa fa-refresh pointer' onClick={() => handleReFillData(list.pmID)}></i>
                                                            </td>

                                                        </tr>
                                                        <tr className="accordion-item">
                                                            <td colSpan={7} id={"collapseOne" + list.pmID} className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                                                <div className="accordion-body" style={{ backgroundColor: '#0000000a' }}>

                                                                    <div style={{ fontSize: '18px', fontWeight: '500' }}>Vitals</div>
                                                                    {vitalsDetails.length === 0 ?
                                                                        <div className='vitalBoxContainer'>

                                                                            <div className='vitalBox'><>No Vital Details</></div>
                                                                        </div> : <>
                                                                            <div className="d-flex flex-wrap gap-2 text-center ps-2">
                                                                                {vitalsDetails && vitalsDetails.map((listVitals, index) => {

                                                                                    return (
                                                                                        <div className='vitalBoxContainer'>
                                                                                            <label htmlFor="">{listVitals.vitalName}</label>
                                                                                            <div className='vitalBox'>{listVitals.vmValue} {listVitals.unit}</div>
                                                                                        </div>
                                                                                    )
                                                                                })}
                                                                            </div>
                                                                        </>}


                                                                    <div className='mt-3' style={{ fontSize: '18px', fontWeight: '500' }}>Patient Complaints Signs & Symptoms</div>
                                                                    {signSymptomsList.length === 0 ?
                                                                        <div className='vitalBox'><span>No Complaints Signs & Symptoms Found..</span></div>
                                                                        :
                                                                        <>
                                                                            {signSymptomsList && signSymptomsList.map((listSign, index) => {

                                                                                return (

                                                                                    <div className='vitalBox'>{listSign.symptoms}</div>
                                                                                )
                                                                            })}
                                                                        </>
                                                                    }


                                                                    <div className='med-table-section mt-2'>
                                                                        <table className='med-table border striped'>
                                                                            <thead>
                                                                                <tr>
                                                                                    <th>#</th>
                                                                                    <th>Medication Details</th>
                                                                                    <th>Frequency</th>
                                                                                    <th>Unit</th>
                                                                                    <th>Strength</th>
                                                                                    <th>Duration</th>

                                                                                </tr>
                                                                            </thead>

                                                                            <tbody>
                                                                                {medicationHistoryList.length === 0 ? <tr>
                                                                                    <td>{1}</td>
                                                                                    <td>NA</td>
                                                                                    <td>NA</td>
                                                                                    <td>NA</td>
                                                                                    <td>NA</td>
                                                                                    <td>NA</td>
                                                                                </tr> : <>
                                                                                    {medicationHistoryList && medicationHistoryList.map((listMed, index) => {

                                                                                        return (
                                                                                            <tr>
                                                                                                <td>{index + 1}</td>
                                                                                                <td>{listMed.drugName}</td>
                                                                                                <td>{listMed.doseFrequency}</td>
                                                                                                <td>{listMed.doseUnit}</td>
                                                                                                <td>{listMed.dosageStrength}</td>
                                                                                                <td>{listMed.duration}</td>

                                                                                            </tr>
                                                                                        )
                                                                                    })}
                                                                                </>}


                                                                            </tbody>
                                                                        </table>
                                                                    </div>
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    </>
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
            </div> */}
            <IPDPatientHistory />

            {/* /////////////////////////// END /////////////////////////////////////////////// */}




        </div>
    )
}

