import React, { useEffect, useState } from 'react'

import SaveOPDData from '../../../../../../Code/SaveOPDData';
import store from '../../../../../../Store';
import { getPatientData } from '../../../../../../Reduce/OPD/PatientData';
import AlertToster from '../../../../../../Component/AlertToster';
import GetPatientHistory from '../../../../../API/OPD/Prescription/GetPatientHistory';
import GetPatientVitalHistoryByPmID from '../../../../../API/OPD/Prescription/PatientHistoryOnClick/GetPatientVitalHistoryByPmID';
import GetPatientHistoryByUHID from '../../../../../API/OPD/Prescription/PatientHistoryOnClick/GetPatientHistoryByUHID';
import { useTranslation } from 'react-i18next';
import  i18n from "i18next";

export default function PatientHistory() {

    const {t} = useTranslation();
    document.body.dir = i18n.dir();

    let [patientHistoryList, setPatientHistoryList] = useState([]);
    let [medicationHistoryList, setMedicationHistoryList] = useState([]);
    let [signSymptomsList, setSignSymptomsLists] = useState([]);
    let [vitalsDetails, setVitalsDetails] = useState([])
    let [showAlertToster, setShowAlertToster] = useState(0)
    let [showAlertMessage, setShowAlertMessage] = useState("")



    let activePatient = window.sessionStorage.getItem("activePatient") ? JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid : []
    let DepartmentId = JSON.parse(window.sessionStorage.getItem("activePage")).DepartmentId


    let checkPatientHistory = async () => {

        let tstUhid = JSON.parse(window.sessionStorage.getItem("activePatient")).Uhid;


        let data = await GetPatientHistoryByUHID(tstUhid);


        if (data.status === 1) {

            setPatientHistoryList(data.responseValue.patientDetails);

        }

        else {
            console.log('not found');
        }
    }


    let getVitalByPmId = async (id) => {
        let data = await GetPatientVitalHistoryByPmID(id)
        if (data.status === 1) {

            setVitalsDetails(data.responseValue.vital);
            setMedicationHistoryList(data.responseValue.prescription);
            setSignSymptomsLists(data.responseValue.signAndSymptoms);
        }
    }

    let handleReFillData = async (pmid) => {
        let response = await GetPatientHistory(pmid)

        if (response.status === 1) {
            let data = response.responseValue;
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
                                })
                            }
                            else {
                                SaveOPDData([], "jsonVital")
                            }
                        }
                        else if (key[0] === "jsonVital") {
                            if (data.patientVitals.length != 0) {
                                console.log("vitals data", data.patientVitals)
                                Vitalsdata = [...data.patientVitals]

                            }
                        }
                        else if (key[0] === "jsonArray") {
                            if (data.allPrescription.length != 0) {
                                prescriptiondata = [...data.allPrescription]
                                // console.log("dataPrescription", data.allPrescription)
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

            store.dispatch(getPatientData(response))
        }
        else {
            setShowAlertToster(1)
            setShowAlertMessage(response.responseValue)
        }
    }
    useEffect(() => {
        checkPatientHistory()
    }, [activePatient])

    return (
        <div className="modal fade" id="deleteModal" data-bs-backdrop="static">
        <div className="modal-dialog" style={{ maxWidth: '60vw' }}>
            <div className="modal-content px-1_">
                <div className="modal-header">
                    <h1 className="modal-title fs-5 text-white" id="exampleModalLabel">{t("Patient History")}</h1>
                    <button type="button" className="btn-close_ btnModalClose" data-bs-dismiss="modal" aria-label="Close" title={t("Close Window")}><i className="bi bi-x-octagon"></i></button>
                </div>
                <div className="modal-body p-0">
                    <div className="row">
                        <div className="col-12">
                            <div className='med-table-section'>
                                <table className="med-table border striped">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th style={{ width: '8%' }}>{t("Visit Date")}</th>
                                            <th>{t("Dept")}</th>
                                            <th>{t("Consultant")}</th>
                                            <th>{t("Diagnosis")}</th>
                                            <th className='text-center'>{t("Action")}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="accordion accordionPatientRaceSection" id="accordionExample">
                                        {patientHistoryList && patientHistoryList.map((list, index) => {
                                            return (
                                                <>
                                                    <tr>
                                                        <td>{index + 1}</td>
                                                        <td>{list.visitDate}</td>
                                                        <td>{list.departmentName === '' ? <span style={{ fontSize: '14px', padding: '5px 4px' }}>{t("Not Assigned")}</span> : <span>{list.departmentName}</span>}</td>
                                                        <td>{list.consultantName === '' ? <span style={{ fontSize: '14px', padding: '5px 4px' }}>{t("Not Assigned")}</span> : <span>{list.consultantName}</span>}</td>
                                                        <td>{list.diagnosis === '' ? <span style={{ fontSize: '14px', padding: '5px 4px' }}>{t("No Diagnosis")}</span> : <span>{list.diagnosis}</span>}</td>
                                                        <td value={list.id} className='text-center'>
                                                          <div className='actt'>
                                                            <i className="fa fa-eye a1 accordion-button_ collapsed pointer" data-bs-toggle="collapse" data-bs-target={'#collapseOne' + list.pmID} aria-expanded="false" onClick={() => { getVitalByPmId(list.pmID) }}></i>
                                                            <i className='fa fa-refresh a2 pointer' onClick={() => handleReFillData(list.pmID)}></i>
                                                          </div>
                                                        </td>
                                                    </tr>
                                                    <tr className="accordion-item">
                                                        <td colSpan={7} id={"collapseOne" + list.pmID} className="accordion-collapse collapse" data-bs-parent="#accordionExample" style={{padding:'0px'}}>
                                                            <div className="accordion-body detailsbg">
                                                                <div className='vitald'>{t("Vitals")}</div>
                                                                {vitalsDetails.length === 0 ?
                                                                    <div className='vitalBoxContainer'>
                                                                        <div className='vitalBox'>{t("No Vitals Details")}</div>
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
                                                                <div className='vitald mt-3'>{t("Patient Complaints Signs & Symptoms")}</div>
                                                                {signSymptomsList.length === 0 ?
                                                                    <div className='vitalBox'><span>{t("No Complaints Signs & Symptoms Found..")}</span></div>
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
                                                                                <th>{t("Medication Details")}</th>
                                                                                <th>{t("Frequency")}</th>
                                                                                <th>{t("Unit")}</th>
                                                                                <th>{t("Strength")}</th>
                                                                                <th>{t("Duration")}</th>
                                                                            </tr>
                                                                        </thead>
                                                                        <tbody>
                                                                            {medicationHistoryList.length === 0 ? <tr>
                                                                                <td>{1}</td>
                                                                                <td>{t("NA")}</td>
                                                                                <td>{t("NA")}</td>
                                                                                <td>{t("NA")}</td>
                                                                                <td>{t("NA")}</td>
                                                                                <td>{t("NA")}</td>
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
        {
            showAlertToster === 1 ? <AlertToster handle={setShowAlertToster} message={showAlertMessage} /> : ""
        }
    </div>
    
    )
}


